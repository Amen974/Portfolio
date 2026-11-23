import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { ACCENT, svgSize, useRobotState, type RobotSlot } from "./svg"

gsap.registerPlugin(useGSAP)

interface RobotProps {
  slot?: RobotSlot
  size?: number
}

const Robot = ({ slot = "hero", size = 25 }: RobotProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const leftEye = useRef<SVGRectElement>(null)
  const rightEye = useRef<SVGRectElement>(null)
  const leftHand = useRef<SVGRectElement>(null)
  const leftLeg1 = useRef<SVGRectElement>(null)
  const leftLeg2 = useRef<SVGRectElement>(null)
  const rightLeg1 = useRef<SVGRectElement>(null)
  const rightLeg2 = useRef<SVGRectElement>(null)

  const robotState = useRobotState(slot)
  const animation = { scope: svgRef, dependencies: [robotState], revertOnUpdate: true }

  useGSAP(() => {
    const eyes = [leftEye.current, rightEye.current]
    const frontLegs = [leftLeg1.current, rightLeg1.current]
    const backLegs = [leftLeg2.current, rightLeg2.current]

    const walkCycle = (repeat: number) =>
      gsap.timeline({ repeat })
        .to(frontLegs, { height: 10, duration: 0.1 })
        .to(backLegs, { height: 28, duration: 0.1 })
        .to(frontLegs, { height: 28, duration: 0.1 })
        .to(backLegs, { height: 10, duration: 0.1 })

    if (robotState === "waveidle") {
      gsap.to(svgRef.current, {
        y: -10,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.timeline({ repeat: -1, repeatDelay: 3 })
        .to(leftHand.current, { y: -40, duration: 0.3 })
        .to(leftHand.current, {
          x: 25,
          duration: 0.8,
          repeat: 3,
          yoyo: true,
          ease: "power1.inOut",
        }, "-=0.2")
        .to(leftHand.current, { x: 0, duration: 0.4, ease: "elastic.out(0.5, 0.3)" })
        .to(leftHand.current, { y: 0, duration: 0.3 })
    }

    if (robotState === "Move") {
      gsap.timeline()
        .to(eyes, { x: 10, duration: 1 })
        .add(walkCycle(4))
        .to([...frontLegs, ...backLegs], { height: 28, duration: 0.1 })
        .to(eyes, { y: 10, duration: 1, ease: "power2.out" })
    }

    if (robotState === "transition") {
      gsap.to(eyes, { x: 10, duration: 0 })
      walkCycle(-1)
    }
  }, animation)

  useGSAP(() => {
    if (robotState === "Move" || robotState === "transition") return

    const onMove = (event: MouseEvent) => {
      [leftEye.current, rightEye.current].forEach((eye) => {
        if (!eye) return
        const rect = eye.getBoundingClientRect()
        const angle = Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2))
        gsap.to(eye, {
          x: Math.cos(angle) * 3,
          y: Math.sin(angle) * 3,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    }

    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, animation)

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 160"
      style={svgSize(size)}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="50" y="20" width="100" height="80" fill={ACCENT} />
      <rect ref={leftEye} x="70" y="40" width="10" height="20" fill="white" />
      <rect ref={rightEye} x="120" y="40" width="10" height="20" fill="white" />
      <rect ref={leftHand} x="31" y="50" width="20" height="20" fill={ACCENT} />
      <rect x="149" y="50" width="20" height="20" fill={ACCENT} />
      <rect ref={leftLeg1} x="50" y="100" width="15" height="30" fill={ACCENT} />
      <rect ref={leftLeg2} x="70" y="100" width="15" height="30" fill={ACCENT} />
      <rect ref={rightLeg1} x="115" y="100" width="15" height="30" fill={ACCENT} />
      <rect ref={rightLeg2} x="135" y="100" width="15" height="30" fill={ACCENT} />
    </svg>
  )
}

export default Robot
