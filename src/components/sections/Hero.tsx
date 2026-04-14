import { useGSAP } from "@gsap/react"
import Claude from "../claude/Claude"
import Robot from "../robot/Robot"
import gsap from "gsap"
import { useRef } from "react"

const Hero = () => {
  const firstH1 = useRef(null)
  const span1 = useRef(null)
  const span2 = useRef(null)
  const span3 = useRef(null)
  const thirdH1 = useRef(null)
  const fourthH1 = useRef(null)
  const robot = useRef(null)
  const claude = useRef(null)
  const plus = useRef(null)
  const line = useRef(null)
  const span4 = useRef(null)
  const span5 = useRef(null)
  const hi = useRef(null)

  const robotRedy = useRef<(() => void) | null>(null)

  useGSAP(() => {
    const splitLetters = (el: HTMLElement) => {
      const text = el.innerText
      el.innerHTML = text
        .split("")
        .map(char => `<span style="display:inline-block">${char === " " ? "&nbsp;" : char}</span>`)
        .join("")
      return el.querySelectorAll("span")
    }

    const letters1 = splitLetters(span4.current!)
    const letters2 = splitLetters(span5.current!)
    const claudeLetrs = splitLetters(hi.current)

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } })

    const before = { opacity: 0, xPercent: -50 }
    const after  = { opacity: 1, xPercent: 0 }

    

    tl.fromTo(firstH1.current, before, after)
      .fromTo(span1.current,   before, after, "-=0.4")
      .fromTo(span2.current,   before, after, "-=0.4")
      .fromTo(span3.current,   before, after, "-=0.4")

      .from(robot.current, { scale: 0, opacity: 0, ease: "back.out(1.2)",}, "-=0.2")
      .call(() => robotRedy.current?.())
      .from(claudeLetrs, {opacity: 0, y: 20, stagger: 0.05, ease: 'power2.out',}, '<')

      .fromTo(thirdH1.current,  { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 }, "-=0.4")
      .fromTo(fourthH1.current, { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 }, "-=0.4")

      .from(claude.current, { scale: 0, opacity: 0, ease: "back.out(1.2)" }, "-=0.1")

      .from(plus.current, { opacity: 0, scale: 0, ease: "back.out(1.2)" })
      .from(line.current, { opacity: 0, scaleY: 0, transformOrigin: "top" }, "-=0.2")

      .from(letters1, { opacity: 0, stagger: 0.05 })
      .from(letters2, { opacity: 0, stagger: 0.05 }, "-=0.3")

      .to(claude.current, {
        rotateZ: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
        immediateRender: false,
      })

  }, [])

  return (
    <section className="h-[42vw] w-full mb-[12vw] mx-auto max-w-[94vw] relative uppercase">
      <h1 className="text-[5vw] absolute tracking-wide" ref={firstH1}>Frontend Developer</h1>
      <h1 className="text-[4vw]/[1em] text-right absolute left-[12.3vw] top-[12vw] max-w-[40vw] tracking-wide">
        <span className="inline-block" ref={span1}>specialize in </span>
        <span className="inline-block" ref={span2}>building modern </span>
        <span className="inline-block" ref={span3}>React applications</span>
      </h1>

      <p className="text-[#da7756] absolute right-[13.8vw] top-[4vw]" ref={hi}>hi im claude</p>

      <div className="absolute right-[5vw] top-[2.5vw]" ref={robot}>
        <Robot onReady={(fn) => {robotRedy.current = fn}} />
      </div>

      <h1 className="text-[4vw] text-right absolute right-0 top-[30vw] tracking-wide" ref={thirdH1}>with a focus</h1>
      <h1 className="text-[4vw]/[1em] text-right absolute right-[2vw] top-[35vw] tracking-wide" ref={fourthH1}>on performance</h1>

      <div className="absolute left-[5vw] bottom-[6vw]" ref={claude}>
        <Claude />
      </div>

      <div className="flex absolute bottom-[-3vw] md:bottom-[2vw] md:left-[5.2vw] gap-2 text-[2vw] md:text-[0.9vw]">
        <div className="flex gap-1">
          <span className="hidden md:block" ref={plus}>+</span>
          <span className="block h-full w-[0.5vw] md:w-[0.2vw] bg-[#da7756]" ref={line}></span>
        </div>
        <div className="flex flex-col">
          <span ref={span4}>React Developer</span>
          <span ref={span5}>Freelancer</span>
        </div>
      </div>
    </section>
  )
}

export default Hero