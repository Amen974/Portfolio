import { useRef } from "react"
import { projects as fallbackProjects } from "./constent"
import { useProjects } from "../../../../hooks/useProjects"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"
import { useMediaQuery, DESKTOP } from "../../../../lib/useMediaQuery"
import { splitLetters } from "../../../../lib/splitLetters"
import Robot from "../../../../components/Robot"
import { setRobotState } from "../../../../components/robot/store"

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const section = useRef<HTMLElement | null>(null)
  const robot = useRef<HTMLDivElement | null>(null)
  const say = useRef<HTMLSpanElement | null>(null)

  useGSAP(() => {
    setRobotState("projects", "non")

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

  const isMobile = !useMediaQuery(DESKTOP)

  const robotSize = isMobile ? 15 : 5

  const { projects, loading, error } = useProjects()

  const list = error ? fallbackProjects : projects

  return (
    <section ref={section} className="relative px-4 uppercase pt-[clamp(5rem,13vw,10rem)] min-[800px]:px-[clamp(1rem,3vw,3rem)]">
      <p className="text-end text-xs min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">+ Selected Projects</p>
      <div className="absolute left-[clamp(1rem,5vw,4.5rem)] top-[clamp(2.5rem,9vw,7.5rem)] text-accent"
        ref={robot}>
        <span ref={say} className="absolute -top-2 left-[30%] text-xs text-accent min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">nice</span>
        <Robot size={robotSize} slot="projects" />
      </div>
      {loading && (
        <p role="status" className="flex items-center gap-2 pb-10 text-xs min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">
          <span aria-hidden="true" className="h-3 w-3 rounded-full border border-fg/20 border-t-accent motion-safe:animate-spin" />
          loading projects
        </p>
      )}
      {error && (
        <p role="alert" className="pb-10 text-xs text-accent min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">
          projects could not be loaded from the database, showing the built-in list
        </p>
      )}
      {!loading && !error && list.length === 0 && (
        <p className="pb-10 text-xs min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">no projects yet</p>
      )}
      {!loading && list.map((p) => (
        <div
          key={p.id}
          className="group flex flex-col pb-10 transition-opacity min-[800px]:flex-row min-[800px]:pb-[clamp(2rem,4vw,3.5rem)] min-[800px]:opacity-60 min-[800px]:hover:opacity-100 min-[800px]:duration-500 min-[800px]:[@media(hover:none)]:opacity-100"
        >
          <div className="order-1 mb-4 border-t border-accent pt-4 shadow-2xl min-[800px]:order-2 min-[800px]:mb-0 min-[800px]:flex-4 min-[800px]:border-x min-[800px]:px-4 min-[800px]:pt-4">
            <div className="aspect-[2/1] min-[800px]:h-[clamp(14rem,26vw,30rem)]">
              <img src={p.img} alt={p.title} loading="lazy" width={1920} height={980} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="order-2 flex min-[800px]:contents">
            <div className="order-1 min-w-0 flex-1 min-[800px]:order-3 min-[800px]:flex-2 min-[800px]:flex-col min-[800px]:border-t min-[800px]:border-accent min-[800px]:p-4">
              <p className="text-xs min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">year</p>
              <h3 className="mb-4 min-[800px]:mb-2 min-[800px]:text-[clamp(1.25rem,1.9vw,2rem)] min-[800px]:leading-[1.1]">{p.year}</h3>
              <p className="text-xs min-[800px]:mb-1 min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">role</p>
              <h3 className="mb-4 min-[800px]:mb-2 min-[800px]:text-[clamp(1.25rem,1.9vw,2rem)] min-[800px]:leading-[1.1]">{p.role}</h3>
              <p className="mb-1 text-xs min-[800px]:mb-0 min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">technologies</p>
              <div className="flex flex-wrap gap-2 text-xs min-[800px]:mt-1 min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">{p.technologies.map((t) => (
                <h4 key={t} className="mb-4 rounded-sm border border-accent px-2 text-accent min-[800px]:mb-0">{t}</h4>
              ))}
              </div>
              <div className="flex items-start gap-1 min-[800px]:relative min-[800px]:mt-4 min-[800px]:gap-0.5">
                <span className="text-xs min-[800px]:absolute min-[800px]:-top-1 min-[800px]:text-sm min-[800px]:opacity-0 min-[800px]:transition-opacity min-[800px]:duration-300 min-[800px]:group-hover:opacity-100 min-[800px]:[@media(hover:none)]:opacity-100">+</span>
                <p className="text-xs min-[800px]:translate-x-[-2%] min-[800px]:pl-3 min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)] min-[800px]:opacity-0 min-[800px]:transition-[opacity,translate] min-[800px]:duration-400 min-[800px]:delay-300 min-[800px]:group-hover:translate-x-0 min-[800px]:group-hover:opacity-100 min-[800px]:[@media(hover:none)]:translate-x-0 min-[800px]:[@media(hover:none)]:opacity-100">{p.p}</p>
              </div>
            </div>

            <div className="order-2 flex w-[33%] min-w-0 flex-col items-end min-[800px]:relative min-[800px]:order-1 min-[800px]:w-auto min-[800px]:flex-1 min-[800px]:items-stretch min-[800px]:border-t min-[800px]:border-accent min-[800px]:pt-4">
              <p className="w-full wrap-break-word text-xs min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]">{p.title}</p>
              <h1 className="text-2xl min-[800px]:absolute min-[800px]:-left-1 min-[800px]:top-2 min-[800px]:text-[clamp(2.5rem,5vw,4.5rem)] min-[800px]:leading-[1]">{p.number}</h1>
              <a className="group/link relative mt-2 text-xs text-accent min-[800px]:absolute min-[800px]:top-[clamp(2.5rem,7vw,5rem)] min-[800px]:mt-0 min-[800px]:w-max min-[800px]:whitespace-nowrap min-[800px]:text-[clamp(0.75rem,0.7vw,0.85rem)]"
                href={p.link}
                target="_blank"
                rel="noreferrer">
                <span className="pointer-events-none absolute left-0 top-0 z-0 hidden opacity-0 transition-opacity duration-100 min-[800px]:block min-[800px]:group-hover/link:opacity-100">+</span>
                <span className="relative inline-block min-[800px]:z-10 min-[800px]:pl-2 min-[800px]:-translate-x-2.5 min-[800px]:transition-transform min-[800px]:duration-100 min-[800px]:group-hover/link:translate-x-0">visit site</span>
                <span className="mt-1 hidden h-px w-full origin-left scale-x-0 bg-accent min-[800px]:block min-[800px]:transition-transform min-[800px]:duration-200 min-[800px]:group-hover/link:scale-x-100"></span></a>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Projects
