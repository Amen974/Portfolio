import { useEffect, useState } from "react";
import { useCursor } from "./CursorContext";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { type } = useCursor();
  const [hasFinePointer, setHasFinePointer] = useState(
    () => window.matchMedia('(pointer: fine)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const handler = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
      if (!e.matches) setIsVisible(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

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
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  const labelTop = position.y + 25;

  return (
    <>
      <div
        className={`fixed rounded-full border border-[#da7756] pointer-events-none z-9999 transition-opacity duration-300
          ${type === 'default' && 'w-[1vw] h-[1vw] min-w-3 min-h-3'}
          ${type === 'click' && 'bg-[#0a0f1e] w-[1.5vw] h-[1.5vw] min-w-4 min-h-4'}
          ${type === 'link' && 'bg-[#da7756] w-[1.5vw] h-[1.5vw] min-w-4 min-h-4'}`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {type === 'click' && (
        <span className="fixed pointer-events-none text-xs text-white z-9999 uppercase"
          style={{ left: position.x, top: labelTop, transform: "translate(-50%, -50%)" }}>
          click
        </span>
      )}
      {type === 'link' && (
        <span className="fixed pointer-events-none text-xs text-white z-9999 uppercase"
          style={{ left: position.x, top: labelTop, transform: "translate(-50%, -50%)" }}>
          open in new tab
        </span>
      )}
    </>
  );
};

export default CustomCursor;