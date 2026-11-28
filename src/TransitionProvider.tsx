import { createContext, useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

type TransitionContextType = {
  triggerTransition: (path: string) => void
  isStart: boolean
  onDone: () => void
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export const usePageTransition = () => useContext(TransitionContext)!

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isStart, setIsStart] = useState(false)
  const targetPath = useRef<string>("")
  const navigate = useNavigate()

  const triggerTransition = (path: string) => {
    targetPath.current = path
    document.body.style.overflow = 'hidden'
    setIsStart(true)
  }

  const onDone = () => {
    setIsStart(false)
    document.body.style.overflow = ''
    navigate(targetPath.current)
  }

  return (
    <TransitionContext.Provider value={{ triggerTransition, isStart, onDone }}>
      {children}
    </TransitionContext.Provider>
  )
}
