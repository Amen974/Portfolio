import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TransitionContext } from "./TransitionContext"

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isStart, setIsStart] = useState(false)
  const targetPath = useRef<string>("")
  const navigate = useNavigate()

  const triggerTransition = (path: string) => {
    targetPath.current = path
    setIsStart(true)
  }

  const onDone = () => {
    setIsStart(false)
    navigate(targetPath.current)
  }

  return (
    <TransitionContext.Provider value={{ triggerTransition, isStart, onDone }}>
      {children}
    </TransitionContext.Provider>
  )
}