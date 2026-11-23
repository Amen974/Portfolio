import { useRef } from "react"
import { projects } from "./constent"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"
import { useMediaQuery } from "react-responsive"
import { useCursor } from "../../../../components/CursorContext"
import Robot from "../../../../components/Robot"
import { setRobotState } from "../../../../components/svg"

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { setType } = useCursor()

  const section = useRef<HTMLElement | null>(null)
  const robot = useRef<HTMLDivElement | null>(null)
  const say = useRef<HTMLSpanElement | null>(null)

  useGSAP(() => {
    setRobotState("projects", "non")

    const splitLetters = (el: HTMLElement | null) => {
      if (!el) return []
      const text = el.innerText
      el.innerHTML = text
        .split("")
        .map(char => `<span style="display:inline-block">${char === " " ? "&nbsp;" : char}</span>`)
        .join("")
      return el.querySelectorAll("span")
    }
    const claudeLetrs = splitLetters(say.current)

    gsap.to(robot.current, {
      scrollTrigger: {
        trigger: section.current,
        start: "top center",
        end: "bottom top",
        onEnter: () => setRobotState("projects", "Move")
      },
      xPercent: 170,
      delay: 1,
      duration: 2,
      ease: 'none',
    })
    gsap.from(claudeLetrs, {
      scrollTrigger: {
        trigger: section.current,
        start: "top center",
        end: "bottom top",
      }, opacity: 0, y: 5, stagger: 0.05, ease: 'power2.out', delay: 3.8,
    })
  }, { scope: section })

  const isMobile = useMediaQuery({ maxWidth: 800 })

  const robotSize = isMobile ? 15 : 5

  return (
    <section ref={section} className="uppercase pt-[15vw] px-[3vw] relative">
      <p className="text-xs min-[800px]:text-[0.8vw] text-end">+ Selected Projects</p>
      <div className="absolute top-[8vw] min-[400px]:top-[6vw] min-[800px]:top-[12.4vw] left-[6vw]"
        ref={robot}>
        <span ref={say} className="absolute text-[2vw] min-[800px]:text-[0.8vw] text-[#da7756] top-[-0.5vw] left-[4.5vw] min-[800px]:left-[1.5vw]">nice</span>
        <Robot size={robotSize} slot="projects" />
      </div>
      {projects.map((p) => (
        <div
          key={p.id}
          className="group flex flex-col pb-[10vw] transition-opacity min-[800px]:flex-row min-[800px]:pb-[5vw] min-[800px]:opacity-60 min-[800px]:hover:opacity-100 min-[800px]:duration-500"
        >
          <div className="order-1 mb-4 border-t border-[#da7756] pt-[8vw] shadow-2xl min-[800px]:order-2 min-[800px]:mb-0 min-[800px]:flex-4 min-[800px]:border-x min-[800px]:px-[1.5vw] min-[800px]:pt-[1.5vw]">
            <div className="min-[800px]:h-[26vw]">
              <img src={p.img} alt={p.title} />
            </div>
          </div>

          <div className="order-2 flex min-[800px]:contents">
            <div className="order-1 min-w-0 flex-1 min-[800px]:order-3 min-[800px]:flex-2 min-[800px]:flex-col min-[800px]:border-t min-[800px]:border-[#da7756] min-[800px]:p-[1.5vw]">
              <p className="text-xs min-[800px]:text-[0.8vw]">year</p>
              <h3 className="mb-4 min-[800px]:mb-[1vw] min-[800px]:text-[2.2vw]/[2.5vw]">{p.year}</h3>
              <p className="text-xs min-[800px]:mb-[0.2vw] min-[800px]:text-[0.8vw]">role</p>
              <h3 className="mb-4 min-[800px]:mb-[1vw] min-[800px]:text-[2.2vw]/[2.2vw]">{p.role}</h3>
              <p className="mb-1 text-xs min-[800px]:mb-0 min-[800px]:text-[0.8vw]">technologies</p>
              <div className="flex flex-wrap gap-2 text-xs min-[800px]:mt-[0.4vw] min-[800px]:text-[0.8vw]">{p.technologies.map((t) => (
                <h4 key={t} className="mb-4 rounded-sm border border-[#da7756] px-[1vw] text-[#da7756] min-[800px]:mb-0 min-[800px]:px-[0.5vw]">{t}</h4>
              ))}
              </div>
              <div className="flex items-start gap-1 min-[800px]:relative min-[800px]:mt-[2vw] min-[800px]:gap-0.5">
                <span className="text-xs min-[800px]:absolute min-[800px]:top-[-0.2vw] min-[800px]:text-[1vw] min-[800px]:opacity-0 min-[800px]:transition-opacity min-[800px]:duration-300 min-[800px]:group-hover:opacity-100">+</span>
                <p className="text-xs min-[800px]:translate-x-[-2%] min-[800px]:pl-[1vw] min-[800px]:text-[0.8vw] min-[800px]:opacity-0 min-[800px]:transition-[opacity,translate] min-[800px]:duration-400 min-[800px]:delay-300 min-[800px]:group-hover:translate-x-0 min-[800px]:group-hover:opacity-100">{p.p}</p>
              </div>
            </div>

            <div className="order-2 flex w-[33%] min-w-0 flex-col items-end min-[800px]:relative min-[800px]:order-1 min-[800px]:w-auto min-[800px]:flex-1 min-[800px]:items-stretch min-[800px]:border-t min-[800px]:border-[#da7756] min-[800px]:pt-[1.5vw]">
              <p className="w-full wrap-break-word text-xs min-[800px]:text-[0.8vw]">{p.title}</p>
              <h1 className="text-2xl min-[800px]:absolute min-[800px]:top-[2.7vw] min-[800px]:left-[-0.4vw] min-[800px]:text-[5.5vw]/[5.5vw]">{p.number}</h1>
              <a className="group/link mt-2 text-xs text-[#da7756] min-[800px]:absolute min-[800px]:top-[8vw] min-[800px]:mt-0 min-[800px]:w-[5.5vw] min-[800px]:text-[0.8vw]"
                href={p.link}
                target="blank"
                onMouseEnter={() => setType('link')}
                onMouseLeave={() => setType('default')}>
                <span className="mr-[0.2vw] hidden min-[800px]:inline min-[800px]:opacity-0 min-[800px]:transition-opacity min-[800px]:duration-100 min-[800px]:group-hover/link:opacity-100">+</span>
                <span className="inline-block min-[800px]:-translate-x-2.5 min-[800px]:transition-transform min-[800px]:duration-100 min-[800px]:group-hover/link:translate-x-0">visit site</span>
                <span className="mt-1 hidden h-[0.1vw] w-full origin-left scale-x-0 bg-[#da7756] min-[800px]:block min-[800px]:transition-transform min-[800px]:duration-200 min-[800px]:group-hover/link:scale-x-100"></span></a>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Projects
