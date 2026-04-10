"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring — low damping for that luxurious trailing lag
  const springX = useSpring(mouseX, { damping: 22, stiffness: 250, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 22, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements for cursor state change
    const handleElementHover = () => {
      document.querySelectorAll(
        'a, button, [data-cursor="pointer"], [data-magnetic]'
      ).forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    // Detect CSS cursor: pointer elements
    const handleMove = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el as Element);
        const isPtrElement =
          style.cursor === "pointer" ||
          (el as HTMLElement).dataset?.cursor === "pointer";
        setIsPointer(isPtrElement);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    handleElementHover();

    // Re-attach on DOM mutations (dynamic content)
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  const isExpanded = isHovering || isPointer;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Inner dot */}
      <motion.div
        animate={{
          width: isExpanded ? 44 : 12,
          height: isExpanded ? 44 : 12,
          backgroundColor: isExpanded ? "transparent" : "white",
          border: isExpanded ? "1.5px solid white" : "1.5px solid transparent",
        }}
        transition={{ type: "spring", damping: 18, stiffness: 300 }}
        style={{
          borderRadius: "50%",
          mixBlendMode: "difference",
        }}
      />
    </motion.div>
  );
}
