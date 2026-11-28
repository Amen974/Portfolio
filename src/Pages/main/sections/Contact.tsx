import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'
import { useRef } from "react"
import { useMediaQuery, DESKTOP } from "../../../lib/useMediaQuery"
import { splitLetters } from "../../../lib/splitLetters"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Robot from '../../../components/Robot'
import { usePageTransition } from '../../../TransitionProvider'

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amen-allah-arfaoui-a4a3a7397/', Icon: FaLinkedin },
  { label: 'GitHub', href: 'https://github.com/Amen974', Icon: FaGithub },
  { label: 'Email', href: 'mailto:aamenallah593@gmail.com', Icon: FaEnvelope },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~010740a1ca4a28c240', Icon: SiUpwork },
]

const Contact = () => {
  const text = useRef<HTMLParagraphElement>(null)
  const section = useRef<HTMLElement>(null)
  const robot = useRef<HTMLButtonElement>(null)
  const { triggerTransition } = usePageTransition()

  const isMobile = !useMediaQuery(DESKTOP)

  useGSAP(() => {
    const letters = splitLetters(text.current)
    const linkEls = gsap.utils.toArray<HTMLAnchorElement>("a", section.current)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "center bottom",
        toggleActions: "play none none none",
      },
    })

    tl.from(robot.current, { scale: 0, opacity: 0, ease: "back.out(1.2)" })
      .from(letters, { opacity: 0, y: 20, stagger: 0.03, ease: "power2.out" })
      .from(linkEls, { opacity: 0, y: 30, stagger: 0.15, ease: "back.out(1.2)" })

    const mm = gsap.matchMedia()
    mm.add("(min-width: 800px) and (prefers-reduced-motion: no-preference)", () => {
      tl.to([robot.current, ...linkEls], {
        y: -10,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    return () => mm.revert()
  }, { scope: section })

  const size = isMobile ? 35 : 25;

  return (
    <section className="uppercase pb-20 min-[800px]:pb-[clamp(3rem,8vw,6rem)]" ref={section}>
      <div className="flex flex-col items-center gap-5 px-4 min-[800px]:gap-6 min-[800px]:px-[clamp(1rem,3vw,3rem)]">
        <div className="flex flex-col items-center gap-4 min-[800px]:gap-6">
          <p
            className="whitespace-nowrap text-center text-xs tracking-widest text-accent min-[800px]:text-[clamp(0.8rem,1vw,1rem)]"
            ref={text}
          >
            LET'S WORK Together
          </p>
          <button
            type="button"
            aria-label="Open chat"
            className="block text-accent"
            ref={robot}
            onClick={() => triggerTransition('/Chat')}
          >
            <Robot slot="contact" size={size} />
          </button>
        </div>

        <div className="grid w-full max-w-xl grid-cols-2 gap-3 min-[800px]:flex min-[800px]:w-auto min-[800px]:max-w-none min-[800px]:gap-4">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-sm border border-accent px-4 py-3 shadow-2xl min-[800px]:gap-2 min-[800px]:px-6 min-[800px]:py-4"
            >
              <Icon className="text-base text-accent min-[800px]:text-[clamp(1.1rem,1.7vw,1.6rem)]" />
              <span className="text-sm uppercase text-accent min-[800px]:text-[clamp(0.9rem,1.1vw,1.1rem)]">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
