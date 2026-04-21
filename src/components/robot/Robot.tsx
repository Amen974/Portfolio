import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import type { RobotState } from "../../Types"

interface RobotProps {
  state?: RobotState
  size?: number
  animate?: boolean
}

const Robot = ({ state = 'waveidle', size = 25, animate = false }: RobotProps) => {
  const head = useRef<SVGRectElement>(null)
  const leftEye = useRef<SVGRectElement>(null)
  const rightEye = useRef<SVGRectElement>(null)
  const leftHand = useRef<SVGRectElement>(null)
  const rightHand = useRef<SVGRectElement>(null)
  const leftLeg1 = useRef<SVGRectElement>(null)
  const leftLeg2 = useRef<SVGRectElement>(null)
  const rightLeg1 = useRef<SVGRectElement>(null)
  const rightLeg2 = useRef<SVGRectElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const [robotState, setRobotState] = useState<RobotState>(state)

  useEffect(() => {
    setRobotState(state)
  }, [state])

  const killAll = () => {
    [head, leftEye, rightEye, leftHand, rightHand, leftLeg1, leftLeg2, rightLeg1, rightLeg2].forEach(
      (ref) => gsap.killTweensOf(ref.current)
    )
  }

  const playWaveidle = () => {
    killAll()
    const tl = gsap.timeline()

    gsap.to(svgRef.current, {
      y: -10,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    tl.to(leftHand.current, { y: -40, duration: 0.3 })
      .to(leftHand.current, {
        x: 25,
        duration: 0.8,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
      }, "-=0.2")
      .to(leftHand.current, { x: 0, duration: 0.4, ease: "elastic.out(0.5, 0.3)" })
      .to(leftHand.current, { y: 0, duration: 0.3 })
      .call(() => { gsap.delayedCall(3, playWaveidle) })
  }

  const playMove = () => {
  killAll()

  const eyes = [leftEye.current, rightEye.current]
  const legs = [leftLeg1.current, leftLeg2.current, rightLeg1.current, rightLeg2.current]
  const walkLegs = gsap.timeline({ repeat: 4 })

  walkLegs
    .to([leftLeg1.current, rightLeg1.current], { height: 10, duration: 0.1 })
    .to([leftLeg2.current, rightLeg2.current], { height: 28, duration: 0.1 })
    .to([leftLeg1.current, rightLeg1.current], { height: 28, duration: 0.1 })
    .to([leftLeg2.current, rightLeg2.current], { height: 10, duration: 0.1 })

  gsap.timeline()
    .to(eyes, { x: 10, duration: 1 })
    .add(walkLegs)
    .to(legs, { height: 28, duration: 0.1 })
    .to(eyes, { y: 10, duration: 1, ease: "power2.out" },)
}

  useEffect(() => {
    if (robotState === 'waveidle') playWaveidle()
    if (robotState === 'Move' && animate === true) playMove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [robotState, animate])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (robotState === 'Move') return
        ;[leftEye, rightEye].forEach((eye) => {
          if (!eye.current) return
          const rect = eye.current.getBoundingClientRect()
          const eyeCX = rect.left + rect.width / 2
          const eyeCY = rect.top + rect.height / 2
          const angle = Math.atan2(e.clientY - eyeCY, e.clientX - eyeCX)
          const dist = 3
          gsap.to(eye.current, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            duration: 0.3,
            ease: "power2.out",
          })
        })
    }

    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [robotState])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 160"
      style={{ width: `${size}vw`, height: `${size}vw` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="50" y="20" width="100" height="80" fill="#da7756" ref={head} />
      <rect x="70" y="40" width="10" height="20" fill="white" ref={leftEye} />
      <rect x="120" y="40" width="10" height="20" fill="white" ref={rightEye} />
      <rect x="31" y="50" width="20" height="20" fill="#da7756" ref={leftHand} />
      <rect x="149" y="50" width="20" height="20" fill="#da7756" ref={rightHand} />
      <rect x="50" y="100" width="15" height="30" fill="#da7756" ref={leftLeg1} />
      <rect x="70" y="100" width="15" height="30" fill="#da7756" ref={leftLeg2} />
      <rect x="135" y="100" width="15" height="30" fill="#da7756" ref={rightLeg2} />
      <rect x="115" y="100" width="15" height="30" fill="#da7756" ref={rightLeg1} />
    </svg>
  )
}

export default Robot