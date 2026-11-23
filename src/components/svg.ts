import { useSyncExternalStore } from "react"
import type { RobotState } from "../Types"

export const ACCENT = "#da7756"

export const svgSize = (size: number) => ({ width: `${size}vw`, height: `${size}vw` })

export const CLAUDE_RAYS = [
  { angle: 0, length: 90, width: 16 },
  { angle: 30, length: 64, width: 10 },
  { angle: 60, length: 80, width: 13 },
  { angle: 90, length: 58, width: 9 },
  { angle: 120, length: 86, width: 15 },
  { angle: 150, length: 66, width: 11 },
  { angle: 180, length: 90, width: 16 },
  { angle: 210, length: 64, width: 10 },
  { angle: 240, length: 80, width: 13 },
  { angle: 270, length: 58, width: 9 },
  { angle: 300, length: 86, width: 15 },
  { angle: 330, length: 66, width: 11 },
] as const

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
