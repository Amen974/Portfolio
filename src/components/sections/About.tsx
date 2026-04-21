import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { SiReact, SiTypescript, SiGsap, SiSupabase, SiTailwindcss, SiHtml5, SiCss, SiJavascript, SiVercel } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  { icon: SiReact, label: "React" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiGsap, label: "GSAP" },
  { icon: SiSupabase, label: "Supabase" },
  { icon: SiTailwindcss, label: "Tailwind" },
  { icon: SiHtml5, label: "HTML5" },
  { icon: SiCss, label: "CSS3" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiVercel, label: "Vercel" },
];

const About = () => {
  const about = useRef<HTMLHeadingElement>(null);
  const letterM = useRef<HTMLSpanElement>(null);
  const letterE = useRef<HTMLSpanElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const text2 = useRef<HTMLParagraphElement>(null);
  const section = useRef<HTMLElement>(null);
  const skills = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "center bottom",
        toggleActions: "play none none none",
      },
    });

    tl.from(about.current, { y: 250, duration: 0.9, ease: "power2.out" })
      .from([letterM.current, letterE.current], { y: 250, duration: 0.9, ease: "power2.out" }, "-=0.7")
      .to(letterM.current, { xPercent: -130, duration: 0.5, ease: "power2.out" })
      .to(letterE.current, { xPercent: 174, duration: 0.5, ease: "power2.out" }, "<")
      .to(text.current, { opacity: 1, duration: 0.4, ease: "power1" }, "-=0.3")
      .to(text2.current, { opacity: 1, duration: 0.4, ease: "power1" }, "<")
      .from(skills.current, {opacity:0}, '<');
  }, []);

  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track.current) return;
    const half = track.current.scrollWidth / 2;
    track.current.style.setProperty("--marquee-width", `-${half}px`);
  }, []);

  return (
    <section className="uppercase relative h-[45vw] px-[3vw] mb-[25vw] min-[800px]:mb-0 mt-[10vw]" ref={section}>
      <div className="overflow-hidden relative ">
        <h1 className="text-[20vw]/[20vw] min-[800px]:text-[16.25vw]/[13.5vw] font-bold text-[#da7756] text-center" ref={about}>
          About
        </h1>
      </div>

      <div className="overflow-hidden relative hidden min-[800px]:block">
        <h1 className="text-[16.25vw]/[14vw] font-bold text-[#da7756] text-center">
          <span ref={letterM} className="inline-block">M</span>
          <span ref={letterE} className="inline-block">E</span>
        </h1>
      </div>

      <p className="absolute text-[0.8vw] w-[30vw] top-[14.8vw] left-[36vw] text-center opacity-0 hidden min-[800px]:inline-block" ref={text}>
        I build fast, interactive web applications that feel alive — from
        real-time dashboards that update without a page reload, to AI-powered
        tools that respond intelligently to user input. Whether you need a
        polished product from scratch, a complex feature added to an existing
        codebase, or a performant React frontend that stands out visually, I
        handle the full picture: architecture, animation, and deployment. If
        your users interact with it, I make sure that interaction is smooth,
        fast, and memorable.
      </p>

      <p className="text-xs text-center min-[800px]:hidden mb-5 opacity-0" ref={text2}>
        I build fast, interactive React apps — real-time, AI-powered, and visually
        sharp. From scratch or existing codebase, I handle everything from architecture
        to deployment. If your users interact with it, I make it memorable.
      </p>

      <div className="overflow-hidden border-y border-[#da7756]/30 py-[1.2vw] mt-[2vw]" ref={skills}>
        <div ref={track} className="flex animate-marquee w-max">
          {[...icons, ...icons, ...icons, ...icons].map((item, i) => (
            <div key={i} className="flex items-center gap-[1vw] min-[800px]:gap-[0.6vw] shrink-0 mr-[3vw]">
              <item.icon className="text-[#da7756] min-[800px]:w-[1.4vw] min-[800px]:h-[1.4vw]" />
              <span className="text-xs min-[800px]:text-[0.75vw] tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;