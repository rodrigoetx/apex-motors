"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "chars" | "words";
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

// Split text into words and each word into chars for staggered animation
const splitIntoWords = (text: string) =>
  text.split(" ").filter((w) => w.length > 0);

const splitIntoChars = (word: string) => word.split("");

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  type = "words",
  as: Tag = "h1",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    once: true,
    margin: "-10% 0px",
  });

  const words = splitIntoWords(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: type === "chars" ? 0.03 : 0.1,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  if (type === "chars") {
    return (
      <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} aria-label={text}>
        <motion.span
          className={`${className} inline-flex flex-wrap gap-x-[0.15em]`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          aria-hidden="true"
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-flex">
              {splitIntoChars(word).map((char, ci) => (
                <span key={ci} className="overflow-hidden inline-block">
                  <motion.span
                    className="inline-block"
                    variants={itemVariants}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  // Words mode
  return (
    <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} aria-label={text}>
      <motion.span
        className={`${className} inline-flex flex-wrap gap-x-[0.3em]`}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-hidden="true"
      >
        {words.map((word, wi) => (
          <span key={wi} className="overflow-hidden inline-block">
            <motion.span className="inline-block" variants={itemVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
