import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Robot from "./components/Robot"

const Transition = ({ isStart = false, onDone }: { isStart?: boolean, onDone?: () => void }) => {
  const robotDesktop = useRef<HTMLDivElement>(null)
  const robotMobile = useRef<HTMLDivElement>(null)
  const overlayDesktop = useRef<HTMLDivElement>(null)
  const overlayMobile = useRef<HTMLDivElement>(null)

  const playRef = useRef<(() => void) | null>(null)

  useGSAP(() => {
    if (isStart) {
      const isMobile = window.innerWidth < 800
      const robotRef = isMobile ? robotMobile.current : robotDesktop.current
      const overlayRef = isMobile ? overlayMobile.current : overlayDesktop.current

      gsap.to(overlayRef, { opacity: 0.6, duration: 0.3 })
      playRef.current?.()
      gsap.to(robotRef, {
        x: isMobile ? 400 : 700,
        duration: 1.2,
        onComplete: () => onDone?.()
      })
    }
  }, [isStart])

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none hidden min-[800px]:block">
        <div ref={overlayDesktop} className="absolute inset-0 bg-[#0a0f1e]" style={{ opacity: 0 }} />
        <div className="fixed top-[21vw] left-[30vw]" ref={robotDesktop}>
          <Robot size={5} state='transition' animate={true} onReady={(play) => { playRef.current = play; play() }} />
        </div>
      </div>

      <div className="fixed inset-0 z-40 pointer-events-none min-[800px]:hidden">
        <div ref={overlayMobile} className="absolute inset-0 bg-[#0a0f1e]" style={{ opacity: 0 }} />
        <div className="fixed top-1/2 -translate-y-1/2" ref={robotMobile}>
          <Robot size={15} state='transition' animate={true} onReady={(play) => { playRef.current = play; play() }} />
        </div>
      </div>
    </>
  )
}

export default Transition