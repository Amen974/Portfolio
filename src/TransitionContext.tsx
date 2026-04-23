import { createContext } from "react"

export type TransitionContextType = {
  triggerTransition: (path: string) => void
  isStart: boolean
  onDone: () => void
}

export const TransitionContext = createContext<TransitionContextType | null>(null)