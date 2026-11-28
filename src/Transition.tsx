import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Robot from "./components/Robot"

const Transition = ({ onDone }: { onDone: () => void }) => {
  const overlay = useRef<HTMLDivElement>(null)
  const robot = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = robot.current
    if (!el) return

    gsap.to(overlay.current, { opacity: 0.6, duration: 0.3 })
    gsap.to(el, {
      x: document.documentElement.clientWidth - el.getBoundingClientRect().right,
      duration: 1.2,
      onComplete: onDone,
    })
  }, [])

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div ref={overlay} className="absolute inset-0 bg-ink opacity-0" />
      <div
        ref={robot}
        className="absolute left-0 top-[calc(50%-7.5vw)] text-accent min-[800px]:left-[clamp(4rem,30vw,26rem)] min-[800px]:top-[clamp(4rem,21vw,16rem)]"
      >
        <div className="min-[800px]:origin-top-left min-[800px]:scale-[0.3333]">
          <Robot size={15} slot="transition" />
        </div>
      </div>
    </div>
  )
}

export default Transition
