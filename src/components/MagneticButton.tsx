"use client";

import { useRef, MouseEvent } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // 0..1, how strong the magnetic pull is
  "data-cursor"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useSpring(0, { damping: 15, stiffness: 200, mass: 0.5 });
  const y = useSpring(0, { damping: 15, stiffness: 200, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      data-magnetic="true"
      data-cursor="pointer"
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
