import { useContext } from "react"
import { TransitionContext } from "./TransitionContext"

export const usePageTransition = () => useContext(TransitionContext)!