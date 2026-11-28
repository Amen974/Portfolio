import { useSyncExternalStore } from "react"
import type { RobotState } from "../../Types"

export type RobotSlot = "hero" | "projects" | "contact" | "transition"

const initialStates: Record<RobotSlot, RobotState> = {
  hero: "waveidle",
  projects: "non",
  contact: "non",
  transition: "transition",
}

let states: Record<RobotSlot, RobotState> = { ...initialStates }
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const setRobotState = (slot: RobotSlot, state: RobotState) => {
  if (states[slot] === state) return
  states = { ...states, [slot]: state }
  listeners.forEach((listener) => listener())
}

export const useRobotState = (slot: RobotSlot) =>
  useSyncExternalStore(subscribe, () => states[slot])
