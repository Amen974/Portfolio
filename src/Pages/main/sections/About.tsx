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
    <section className="uppercase relative mt-[clamp(3rem,10vw,8rem)] px-4 pb-[clamp(3rem,10vw,8rem)] min-[800px]:px-[clamp(1rem,3vw,3rem)] min-[800px]:pb-16" ref={section}>
      <h1
        className="text-center font-bold leading-[0.82] text-accent text-[clamp(4rem,20vw,16rem)] min-[800px]:text-[clamp(6rem,16.25vw,18rem)]"
        ref={about}
      >
        About
      </h1>

      <div className="mt-6 flex flex-col items-center gap-y-6 min-[800px]:mt-2 min-[800px]:flex-row min-[800px]:justify-center min-[800px]:gap-x-8">
        <h1
          ref={letterM}
          aria-hidden="true"
          className="hidden font-bold leading-[0.8] min-[800px]:block min-[800px]:w-[1em] min-[800px]:text-center min-[800px]:text-[clamp(5rem,16.25vw,17rem)]"
        >
          <span className="text-accent inline-block">M</span>
        </h1>
        <p
          ref={text}
          className="mx-auto max-w-[34ch] text-center text-xs leading-relaxed opacity-0 min-[800px]:mx-0 min-[800px]:w-[clamp(16rem,30vw,34rem)] min-[800px]:max-w-none min-[800px]:text-[clamp(0.85rem,1vw,1.05rem)]"
        >
          Full stack developer. React and Next.js interfaces on top of NestJS
          APIs, data models, and auth. New builds or existing codebases,
          architecture through deployment.
        </p>
        <h1
          ref={letterE}
          aria-hidden="true"
          className="hidden font-bold leading-[0.8] min-[800px]:block min-[800px]:w-[1em] min-[800px]:text-center min-[800px]:text-[clamp(5rem,16.25vw,17rem)]"
        >
          <span className="text-accent inline-block">E</span>
        </h1>
      </div>

      <div className="mt-[clamp(2.5rem,8vw,6rem)] overflow-hidden border-y border-accent/30 py-3 min-[800px]:mt-8" ref={skills}>
        <div className="flex animate-marquee w-max">
          {[...icons, ...icons, ...icons, ...icons].map((item, i) => (
            <div key={i} className="mr-8 flex shrink-0 items-center gap-2 min-[800px]:mr-8 min-[800px]:gap-2">
              <item.icon className="text-accent min-[800px]:h-[clamp(1rem,1.4vw,1.5rem)] min-[800px]:w-[clamp(1rem,1.4vw,1.5rem)]" />
              <span className="text-xs tracking-widest min-[800px]:text-[clamp(0.75rem,0.75vw,0.9rem)]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
