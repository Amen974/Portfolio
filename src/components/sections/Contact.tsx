import Robot from "../robot/Robot"
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'
import { useCursor } from "../CursorContext"
import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const linkedin = useRef<HTMLAnchorElement>(null)
  const github = useRef<HTMLAnchorElement>(null)
  const envelope = useRef<HTMLAnchorElement>(null)
  const upwork = useRef<HTMLAnchorElement>(null)
  const text = useRef(null)
  const section = useRef<HTMLDivElement>(null)
  const robot = useRef<HTMLDivElement>(null)
  const { setType } = useCursor()

  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useGSAP(() => {
    const splitLetters = (el: HTMLElement | null) => {
      if (!el) return []
      const text = el.innerText
      el.innerHTML = text
        .split("")
        .map(char => `<span style="display:inline-block">${char === " " ? "&nbsp;" : char}</span>`)
        .join("")
      return el.querySelectorAll("span")
    }
    const claudeLetrs = splitLetters(text.current!)

    const links = [linkedin.current, github.current, envelope.current, upwork.current]

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "center bottom",
        toggleActions: "play none none none",
      },
      onComplete: () => {
        if (width < 800) return
        gsap.to([robot.current, ...links], {
          y: -10,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    });

    tl.from(robot.current, { scale: 0, opacity: 0, ease: "back.out(1.2)" })
      .from(claudeLetrs, { opacity: 0, y: 20, stagger: 0.03, ease: "power2.out" })
      .from(links, { opacity: 0, y: 30, stagger: 0.15, ease: "back.out(1.2)" })
  }, [])

  

  const size = width < 800 ? 35 : 25;
  return (
    <section className="uppercase mb-[10vw] min-[800px]:mb-0 relative h-[45vw]" ref={section}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" ref={robot}>
        <div className="relative flex flex-col items-center">
          <p className="absolute text-[#da7756] text-xs min-[800px]:text-[1vw] left-1/2 -translate-x-1/2 -top-[-2vw] whitespace-nowrap" ref={text}>
            LET'S WORK Together
          </p>
          <Robot state="contact" size={size} />
        </div>
      </div>

      <a
        ref={linkedin}
        href='https://www.linkedin.com/in/amen-allah-arfaoui-a4a3a7397/'
        target="blank"
        className="border border-[#da7756] px-[2vw] py-[1vw] flex items-center justify-center gap-[0.5vw] shadow-2xl rounded-sm absolute left-[13vw] top-[16.5vw] min-[800px]:left-[25vw] min-[800px]:top-[18.2vw]"
        onMouseEnter={(() => setType('link'))}
        onMouseLeave={(() => setType('default'))}
      >
        <FaLinkedin className="text-xs min-[800px]:text-[1.7vw] text-[#da7756]" />
        <span className="text-[#da7756] text-xs min-[800px]:text-[1vw]">LinkedIn</span>
      </a>

      <a
        ref={github}
        href='https://github.com/Amen974'
        target="blank"
        className="border border-[#da7756] px-[2vw] py-[1vw] flex items-center justify-center gap-[0.5vw] shadow-2xl rounded-sm absolute left-[27vw] top-[33.5vw] min-[800px]:left-[33.5vw] min-[800px]:top-[31vw]"
        onMouseEnter={(() => setType('link'))}
        onMouseLeave={(() => setType('default'))}
      >
        <FaGithub className="text-xs min-[800px]:text-[1.7vw] text-[#da7756]" />
        <span className="text-[#da7756] text-xs min-[800px]:text-[1vw]">GitHub</span>
      </a>

      <a
        ref={envelope}
        href='mailto:aamenallah593@gmail.com'
        target="blank"
        className="border border-[#da7756] px-[2vw] py-[1vw] flex items-center justify-center gap-[0.5vw] shadow-2xl rounded-sm absolute left-[59vw] top-[33.5vw] min-[800px]:left-[57vw] min-[800px]:top-[31vw]"
        onMouseEnter={(() => setType('link'))}
        onMouseLeave={(() => setType('default'))}
      >
        <FaEnvelope className="text-xs min-[800px]:text-[1.7vw] text-[#da7756]" />
        <span className="text-[#da7756] text-xs min-[800px]:text-[1vw]">Email</span>
      </a>

      <a
        ref={upwork}
        href='https://www.upwork.com/freelancers/~010740a1ca4a28c240'
        target="blank"
        className="border border-[#da7756] px-[2vw] py-[1vw] flex items-center justify-center gap-[0.5vw] shadow-2xl rounded-sm absolute left-[65vw] top-[16.5vw] min-[800px]:left-[63.5vw] min-[800px]:top-[18.2vw]"
        onMouseEnter={(() => setType('link'))}
        onMouseLeave={(() => setType('default'))}
      >
        <SiUpwork className="text-xs min-[800px]:text-[1.7vw] text-[#da7756]" />
        <span className="text-[#da7756] text-xs min-[800px]:text-[1vw]">Upwork</span>
      </a>
    </section>
  )
}

export default Contact