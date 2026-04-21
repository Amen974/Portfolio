import React, { useEffect, useRef, useState } from "react"
import { useCursor } from "../../CursorContext"
import { projects } from "./constent"
import gsap from "gsap"
import Robot from "../../robot/Robot"
import { ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { setType } = useCursor()
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [linkHoverIndex, setLinkHoverIndex] = useState<number | null>(null)

  const plusAni = useRef<(HTMLSpanElement | null)[]>([])
  const pAni = useRef<(HTMLSpanElement | null)[]>([])
  const linkP = useRef<(HTMLSpanElement | null)[]>([])
  const linkPlus = useRef<(HTMLSpanElement | null)[]>([])
  const linkLine = useRef<(HTMLSpanElement | null)[]>([])

  const robot = useRef<HTMLDivElement | null>(null)
  const say = useRef<HTMLSpanElement | null>(null)

  const [isScrollAnimate, setIsScrollAnimate] = useState<boolean>(false)

  useEffect(() => {
    projects.forEach((_, i) => {
      const isHovered = hoverIndex === i

      gsap.killTweensOf([plusAni.current[i], pAni.current[i]])

      if (isHovered) {
        gsap.to(plusAni.current[i], {
          opacity: 1,
          duration: 0.3,
          onComplete: () => {
            gsap.to(pAni.current[i], {
              opacity: 1,
              xPercent: 0,
              duration: 0.4,
            })
          }
        })
      } else {
        gsap.to(plusAni.current[i], {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.to(pAni.current[i], {
              opacity: 0,
              xPercent: -2,
              duration: 0.3,
            })
          }
        })
      }
    })
  }, [hoverIndex])

  useEffect(() => {
    projects.forEach((_, i) => {
      const isHovered = linkHoverIndex === i

      gsap.killTweensOf([linkP, linkPlus.current[i], linkLine.current[i]])

      if (isHovered) {
        gsap.to(linkP.current[i], {
          x: 0,
          duration: 0.1,
        })
        gsap.to(linkPlus.current[i], {
          opacity: 1,
          duration: 0.1,
        })
        gsap.to(linkLine.current[i], {
          opacity: 1,
          width: 'auto',
          duration: 0.2,
        })
      } else {
        gsap.to(linkP.current[i], {
          x: -10,
          duration: 0.1,
        })
        gsap.to(linkPlus.current[i], {
          opacity: 0,
          duration: 0.1,
        })
        gsap.to(linkLine.current[i], {
          opacity: 0,
          width: 0,
          duration: 0.2,
        })
      }
    })
  }, [linkHoverIndex])

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
    const claudeLetrs = splitLetters(say.current!)

    gsap.to(robot.current, {
      scrollTrigger: {
        trigger: '.sectoion',
        start: "top center",
        end: "bottom top",
        onEnter: () => { setIsScrollAnimate(true) }
      },
      xPercent: 170,
      delay: 1,
      duration: 2,
      ease: 'none',
    })
    gsap.from(claudeLetrs, {
      scrollTrigger: {
        trigger: '.sectoion',
        start: "top center",
        end: "bottom top",
      }, opacity: 0, y: 5, stagger: 0.05, ease: 'power2.out', delay: 3.8,
    })
  }, [])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const robotSize = windowWidth <= 800 ? 15 : 5

  return (
    <section className="uppercase pt-[15vw] px-[3vw] relative sectoion">
      <p className="text-xs min-[800px]:text-[0.8vw] text-end">+ Selected Projects</p>
      <div className="absolute top-[8vw] min-[400px]:top-[6vw] min-[800px]:top-[12.4vw] left-[6vw]"
        ref={robot}>
        <span ref={say} className="absolute text-[2vw] min-[800px]:text-[0.8vw] text-[#da7756] top-[-0.5vw] left-[4.5vw] min-[800px]:left-[1.5vw]">nice</span>
        <Robot size={robotSize} state="Move" animate={isScrollAnimate} />
      </div>
      {projects.map((p, i) => (
        <React.Fragment key={p.id}>
          {/*Desktop*/}
          <div
            className="pb-[5vw] min-[800px]:flex opacity-60 hover:opacity-100 duration-500 hidden"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="flex flex-col pt-[1.5vw] flex-1 border-t border-[#da7756] relative">
              <p className="text-[0.8vw]">{p.title}</p>
              <h1 className="text-[5.5vw]/[5.5vw] absolute top-[2.7vw] left-[-0.4vw]">{p.number}</h1>
              <a className="text-[0.8vw] text-[#da7756] cursor-none absolute top-[8vw] w-[5.5vw]"
                href={p.link}
                target="blank" onMouseEnter={(() => { setType('link'); setLinkHoverIndex(i) })}
                onMouseLeave={(() => { setType('default'); setLinkHoverIndex(null) })}>
                <span className="mr-[0.2vw]" ref={(el) => { linkPlus.current[i] = el }}>+</span>
                <span className="absolute w-[5vw]" ref={(el) => { linkP.current[i] = el }}>visit site</span>
                <span className="h-[0.1vw] w-full block bg-[#da7756]" ref={(el) => { linkLine.current[i] = el }}></span></a>
            </div>

            <div className="px-[1.5vw] pt-[1.5vw] flex-4 border-t border-x border-[#da7756] shadow-2xl">
              <div className="h-[26vw]">
                <img src={p.img} alt={p.title} />
              </div>
            </div>

            <div className="p-[1.5vw] flex flex-col flex-2 border-t border-[#da7756]">
              <p className="text-[0.8vw]">year</p>
              <h3 className="text-[2.2vw]/[2.5vw] mb-[1vw]">{p.year}</h3>
              <p className="text-[0.8vw] mb-[0.2vw]">role</p>
              <h3 className="text-[2.2vw]/[2.2vw] mb-[1vw]">{p.role}</h3>
              <p className="text-[0.8vw]">technologies</p>
              <div className="flex text-[0.8vw] mt-[0.4vw] gap-2">{p.technologies.map((t) => (
                <h4 key={t} className="border border-[#da7756] px-[0.5vw] text-[#da7756] rounded-sm">{t}</h4>
              ))}</div>

              <div className="mt-[2vw] flex gap-0.5 relative">
                <span className="absolute top-[-0.2vw] opacity-0 text-[1vw]" ref={(el) => { plusAni.current[i] = el }}>+</span>
                <p className="text-[0.8vw] pl-[1vw] opacity-0" ref={(el) => { pAni.current[i] = el }}>{p.p}</p>
              </div>
            </div>
          </div>

          {/*Mobile*/}
          <div
            className="pb-[10vw] flex flex-col min-[800px]:hidden"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="pt-[8vw] border-t border-[#da7756] shadow-2xl mb-4">
              <img src={p.img} alt={p.title} />
            </div>

            <div className="flex">
              <div className="w-[77%]">
                <p className="text-xs">year</p>
                <h3 className="text-md mb-4">{p.year}</h3>
                <p className="text-xs">role</p>
                <h3 className="text-md mb-4">{p.role}</h3>
                <p className="text-xs mb-1">technologies</p>
                <div className="flex text-xs gap-2">{p.technologies.map((t) => (
                  <h4 key={t} className="border border-[#da7756] px-[1vw] text-[#da7756] rounded-sm mb-4">{t}</h4>
                ))}
                </div>
                <div className="flex gap-1">
                  <span className="text-xs">+</span>
                  <p className="text-xs">{p.p}</p>
                </div>
              </div>

              <div className="flex flex-col w-[33%]">
                <p className="text-xs text-end">{p.title}</p>
                <h1 className="text-2xl text-end ">{p.number}</h1>
                <a className="text-xs text-[#da7756] text-end" href={p.link} target="blank">visit site</a>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </section>
  )
}

export default Projects