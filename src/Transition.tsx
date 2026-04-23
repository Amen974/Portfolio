import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Robot from "./components/Robot"

const Transition = ({ isStart = false, onDone }: { isStart?: boolean, onDone?: () => void }) => {
  const robot = useRef<HTMLDivElement>(null)

  const overlay = useRef<HTMLDivElement>(null)

  const playRef = useRef<(() => void) | null>(null)

  useGSAP(() => {
    if (isStart) {
      gsap.to(overlay.current, { opacity: 0.6, duration: 0.3 })
      playRef.current?.()
      gsap.to(robot.current, {
        x: 700,
        duration: 1.2,
        onComplete: () => onDone?.()
      })
    }
  }, [isStart])
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div ref={overlay} className="absolute inset-0 bg-[#0a0f1e]" style={{ opacity: 0 }} />
      <div className="fixed top-[21vw] left-[30vw]" ref={robot}>
        <Robot size={5} state='transition' animate={true} onReady={(play) => {
          playRef.current = play
          play()
        }} />
      </div>
    </div>
  )
}

export default Transition