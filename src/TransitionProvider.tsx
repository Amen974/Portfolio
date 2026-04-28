import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TransitionContext } from "./TransitionContext"
import { useCursor } from "./components/CursorContext"

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isStart, setIsStart] = useState(false)
  const targetPath = useRef<string>("")
  const navigate = useNavigate()
  const { setType } = useCursor()

  const triggerTransition = (path: string) => {
    targetPath.current = path
    document.body.style.overflow = 'hidden'
    setIsStart(true)
  }

  const onDone = () => {
    setIsStart(false)
    document.body.style.overflow = ''
    setType('default')
    navigate(targetPath.current)
  }

  return (
    <TransitionContext.Provider value={{ triggerTransition, isStart, onDone }}>
      {children}
    </TransitionContext.Provider>
  )
}