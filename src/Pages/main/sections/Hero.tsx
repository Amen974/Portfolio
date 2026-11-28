import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import Robot from "../../../components/Robot"
import { splitLetters } from "../../../lib/splitLetters"
import { usePageTransition } from "../../../TransitionProvider"

const Hero = () => {
  const firstH1 = useRef(null)
  const span1 = useRef(null)
  const span2 = useRef(null)
  const span3 = useRef(null)
  const thirdH1 = useRef(null)
  const fourthH1 = useRef(null)
  const robot = useRef<HTMLDivElement>(null)
  const plus = useRef(null)
  const line = useRef(null)
  const span4 = useRef(null)
  const span5 = useRef(null)

  useGSAP(() => {
    const letters1 = splitLetters(span4.current!)
    const letters2 = splitLetters(span5.current!)

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } })

    const before = { opacity: 0, xPercent: -50 }
    const after = { opacity: 1, xPercent: 0 }



    tl.fromTo(firstH1.current, before, after)
      .fromTo(span1.current, before, after, "-=0.4")
      .fromTo(span2.current, before, after, "-=0.4")
      .fromTo(span3.current, before, after, "-=0.4")

      .from(robot.current, { scale: 0, opacity: 0, ease: "back.out(1.2)", }, "-=0.2")

      .fromTo(thirdH1.current, { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 }, "-=0.4")
      .fromTo(fourthH1.current, { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 }, "-=0.4")

      .from(plus.current, { opacity: 0, scale: 0, ease: "back.out(1.2)" })
      .from(line.current, { opacity: 0, scaleY: 0, transformOrigin: "top" }, "-=0.2")

      .from(letters1, { opacity: 0, stagger: 0.05 })
      .from(letters2, { opacity: 0, stagger: 0.05 }, "-=0.3")

  }, [])

  const { triggerTransition } = usePageTransition()

  const openChat = {
    onClick: () => {
      void import('../../Chat')
      triggerTransition('/Chat')
    }
  }

  return (

    <section className='mx-auto mb-16 w-full max-w-[min(94vw,96rem)] uppercase min-[800px]:mb-24'>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-[clamp(1.5rem,0.9rem_+_3vw,3.75rem)] leading-[0.95] tracking-wide" ref={firstH1}>Full Stack Developer</h1>
        <div className="shrink-0 text-accent" ref={robot} {...openChat}>
          <Robot />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-end gap-2 text-right min-[800px]:mt-8">
        <h1 className="max-w-[26ch] text-[clamp(1.35rem,0.7rem_+_2.6vw,3.375rem)] leading-[1.05] tracking-wide">
          <span className="inline-block" ref={span1}>specialize in </span>
          <span className="inline-block" ref={span2}>building modern </span>
          <span className="inline-block" ref={span3}>web applications</span>
        </h1>

        <h1 className="text-[clamp(1.35rem,0.7rem_+_2.6vw,3.375rem)] leading-[1.05] tracking-wide" ref={thirdH1}>with a focus</h1>
        <h1 className="text-[clamp(1.35rem,0.7rem_+_2.6vw,3.375rem)] leading-[1.05] tracking-wide" ref={fourthH1}>on performance</h1>
      </div>

      <div className="mt-10 flex justify-end min-[800px]:mt-10">
        <div className="flex items-stretch gap-2 text-[clamp(0.75rem,0.6rem_+_0.5vw,1rem)]">
          <div className="flex items-stretch gap-1">
            <span className="hidden min-[800px]:block" ref={plus}>+</span>
            <span className="block w-[3px] self-stretch bg-accent" ref={line}></span>
          </div>
          <div className="flex flex-col">
            <span ref={span4}>TypeScript & Rust</span>
            <span ref={span5}>Open to work</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 