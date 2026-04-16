import { useEffect, useRef } from 'react';

interface Props {
  isHovered: boolean;
}

export default function Cursor({ isHovered }: Props) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        // Slightly delayed follow for ring
        setTimeout(() => {
          if (ringRef.current) {
            ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          }
        }, 60);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${isHovered ? 'hovered' : ''}`} />
    </>
  );
}
