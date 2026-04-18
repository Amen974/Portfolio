import { useEffect, useState } from "react";
import { useCursor } from "./CursorContext";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const { type } = useCursor()

  const ClickTop = position.y + 25

  return (
    <>
      <div
        className={`fixed rounded-full border border-[#da7756] pointer-events-none z-9999 transition-opacity duration-300 ${type === 'default' && 'w-[1vw] h-[1vw]'} ${type === 'click' && 'bg-[#0a0f1e] w-[1.5vw] h-[1.5vw]'} ${type === 'link' && 'bg-[#da7756] w-[1.5vw] h-[1.5vw]'}`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {type === 'click' && <span className="fixed pointer-events-none text-xs text-white z-9999 uppercase"
        style={{
          left: position.x,
          top: ClickTop,
          transform: "translate(-50%, -50%)",
        }}>click</span>}

      {type === 'link' && <span className="fixed pointer-events-none text-xs text-white z-9999 uppercase"
        style={{
          left: position.x,
          top: ClickTop,
          transform: "translate(-50%, -50%)",
        }}>open in new tab</span>}
    </>
  );
};

export default CustomCursor;