import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { SiReact, SiNextdotjs, SiTypescript, SiGsap, SiSupabase, SiNestjs, SiTailwindcss, SiHtml5, SiCss, SiJavascript, SiRust, SiVercel } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiGsap, label: "GSAP" },
  { icon: SiSupabase, label: "Supabase" },
  { icon: SiNestjs, label: "NestJS" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiHtml5, label: "HTML5" },
  { icon: SiCss, label: "CSS3" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiRust, label: "Rust" },
  { icon: SiVercel, label: "Vercel" },
];

const About = () => {
  const about = useRef<HTMLHeadingElement>(null);
  const letterM = useRef<HTMLHeadingElement>(null);
  const letterE = useRef<HTMLHeadingElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const section = useRef<HTMLElement>(null);
  const skills = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "center bottom",
        toggleActions: "play none none none",
      },
    });

    tl.from(about.current, { y: 250, duration: 0.9, ease: "power2.out" })
      .from([letterM.current, letterE.current], { y: 250, duration: 0.9, ease: "power2.out" }, "-=0.7");

    const mm = gsap.matchMedia();
    mm.add("(min-width: 800px)", () => {
      tl.to(letterM.current, { xPercent: -85, duration: 0.5, ease: "power2.out" })
        .to(letterE.current, { xPercent: 90, duration: 0.5, ease: "power2.out" }, "<");
    });

    tl.to(text.current, { opacity: 1, duration: 0.4, ease: "power1" }, "-=0.3")
      .from(skills.current, { opacity: 0 }, "<");

    return () => mm.revert();
  }, { scope: section });

  return (
    <section className="uppercase relative mt-[10vw] px-[3vw] pb-[10vw] min-[800px]:pb-[4vw]" ref={section}>
      <h1
        className="text-center font-bold leading-[0.82] text-[#da7756] text-[clamp(4rem,20vw,16rem)] min-[800px]:text-[clamp(6rem,16.25vw,18rem)]"
        ref={about}
      >
        About
      </h1>

      <div className="mt-6 grid grid-cols-2 items-center gap-x-4 gap-y-6 min-[800px]:mt-[0.5vw] min-[800px]:flex min-[800px]:items-center min-[800px]:justify-center min-[800px]:gap-x-[2vw]">
        <h1
          ref={letterM}
          aria-hidden="true"
          className="justify-self-start font-bold leading-[0.8] text-[#da7756] text-[clamp(3rem,18vw,14rem)] min-[800px]:text-[clamp(5rem,16.25vw,17rem)]"
        >
          M
        </h1>
        <p
          ref={text}
          className="order-3 col-span-2 mx-auto max-w-[34ch] text-center text-xs leading-relaxed opacity-0 min-[800px]:order-0 min-[800px]:col-span-1 min-[800px]:mx-0 min-[800px]:w-[clamp(16rem,30vw,34rem)] min-[800px]:max-w-none min-[800px]:text-[clamp(0.85rem,1vw,1.05rem)]"
        >
          Full stack developer. React and Next.js interfaces on top of NestJS
          APIs, data models, and auth. New builds or existing codebases,
          architecture through deployment.
        </p>
        <h1
          ref={letterE}
          aria-hidden="true"
          className="justify-self-end font-bold leading-[0.8] text-[#da7756] text-[clamp(3rem,18vw,14rem)] min-[800px]:text-[clamp(5rem,16.25vw,17rem)]"
        >
          E
        </h1>
      </div>

      <div className="mt-[8vw] overflow-hidden border-y border-[#da7756]/30 py-[1.2vw] min-[800px]:mt-[2vw]" ref={skills}>
        <div className="flex animate-marquee w-max">
          {[...icons, ...icons, ...icons, ...icons].map((item, i) => (
            <div key={i} className="mr-8 flex shrink-0 items-center gap-2 min-[800px]:mr-[3vw] min-[800px]:gap-[0.6vw]">
              <item.icon className="text-[#da7756] min-[800px]:h-[clamp(1rem,1.4vw,1.5rem)] min-[800px]:w-[clamp(1rem,1.4vw,1.5rem)]" />
              <span className="text-xs tracking-widest min-[800px]:text-[clamp(0.75rem,0.75vw,0.9rem)]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
