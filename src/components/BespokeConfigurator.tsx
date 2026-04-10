"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

interface ColorConfig {
  id: string;
  name: string;
  subtitle: string;
  swatch: string; // CSS color for the swatch circle
  overlayColor: string; // CSS color for the mix-blend-mode overlay
  overlayOpacity: number;
  filter: string; // CSS filter on the video
  accent: string; // border/text accent color
}

const COLORS: ColorConfig[] = [
  {
    id: "graphite",
    name: "Graphite Stealth",
    subtitle: "The absence of light, embodied.",
    swatch: "#2a2a2a",
    overlayColor: "rgba(10, 10, 10, 0.55)",
    overlayOpacity: 0.55,
    filter: "grayscale(100%) brightness(0.55) contrast(1.1)",
    accent: "#777",
  },
  {
    id: "crimson",
    name: "Crimson Flare",
    subtitle: "Controlled fury, rendered in scarlet.",
    swatch: "#6b0f1a",
    overlayColor: "rgba(100, 5, 15, 0.5)",
    overlayOpacity: 0.5,
    filter: "grayscale(40%) sepia(80%) hue-rotate(300deg) saturate(3) brightness(0.65)",
    accent: "#8B1A2A",
  },
  {
    id: "arctic",
    name: "Arctic Pearl",
    subtitle: "Glacial serenity in metallic white.",
    swatch: "#d8dde0",
    overlayColor: "rgba(210, 220, 230, 0.25)",
    overlayOpacity: 0.25,
    filter: "grayscale(20%) brightness(1.25) contrast(0.88) saturate(0.6)",
    accent: "#aab",
  },
];

export default function BespokeConfigurator() {
  const [selected, setSelected] = useState<ColorConfig>(COLORS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (color: ColorConfig) => {
    if (color.id === selected.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelected(color);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section className="relative w-full bg-black border-t border-neutral-900 overflow-hidden py-24">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-neutral-600 uppercase tracking-[0.3em] text-xs mb-4">
              Personalization
            </p>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-wider uppercase text-white leading-none">
              Apex Bespoke
            </h2>
          </div>
          <p className="hidden md:block text-neutral-500 font-light text-sm max-w-xs text-right leading-relaxed">
            Select your exterior finish. Each hue is a statement of intent,
            hand-curated for discerning taste.
          </p>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-neutral-800 via-neutral-700 to-transparent mt-10" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
        {/* Car Visual — Left/Top (3/5 width) */}
        <div className="lg:col-span-3 relative rounded-2xl overflow-hidden h-[300px] md:h-[480px] bg-neutral-950">
          {/* Video element — paused, acts as image */}
          <video
            src="/videos/hero-car.mp4"
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: selected.filter,
              transition: "filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Color overlay using mix-blend-mode */}
          <AnimatePresence>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: selected.overlayOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: selected.overlayColor,
                mixBlendMode: "multiply",
              }}
            />
          </AnimatePresence>

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Selected color label */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <motion.div
              key={selected.id + "-label"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] mb-1">
                Selected Finish
              </p>
              <p className="text-white font-light text-lg tracking-wider uppercase">
                {selected.name}
              </p>
            </motion.div>
            <motion.div
              key={selected.id + "-swatch-sm"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-8 h-8 rounded-full border border-white/20 shadow-2xl"
              style={{ backgroundColor: selected.swatch }}
            />
          </div>
        </div>

        {/* Panel — Right (2/5 width) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-neutral-600 uppercase tracking-[0.25em] text-[10px] mb-2">
            Exterior Colours — 3 Exclusive
          </p>

          {COLORS.map((color, idx) => (
            <motion.button
              key={color.id}
              onClick={() => handleSelect(color)}
              data-cursor="pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
              className={`relative w-full flex items-center gap-5 p-5 rounded-xl border transition-all duration-500 text-left group
                ${
                  selected.id === color.id
                    ? "border-white/20 bg-white/5"
                    : "border-neutral-900 hover:border-neutral-700 hover:bg-white/[0.02]"
                }`}
            >
              {/* Swatch */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full border-2 transition-all duration-500 shadow-lg"
                  style={{
                    backgroundColor: color.swatch,
                    borderColor:
                      selected.id === color.id
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.1)",
                    boxShadow:
                      selected.id === color.id
                        ? `0 0 20px ${color.swatch}88`
                        : "none",
                  }}
                />
                {selected.id === color.id && (
                  <motion.div
                    layoutId="active-ring"
                    className="absolute -inset-1.5 rounded-full border border-white/30"
                  />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-light tracking-wider uppercase transition-colors duration-300 ${
                    selected.id === color.id ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {color.name}
                </p>
                <p className="text-neutral-600 text-xs mt-0.5 tracking-wide font-light truncate">
                  {color.subtitle}
                </p>
              </div>

              {/* Active indicator */}
              {selected.id === color.id && (
                <motion.div
                  layoutId="active-dot"
                  className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"
                />
              )}
            </motion.button>
          ))}

          {/* CTA */}
          <div className="mt-6 pt-6 border-t border-neutral-900">
            <MagneticButton
              className="w-full py-4 px-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white text-xs uppercase tracking-[0.2em] font-light hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              strength={0.2}
            >
              Request This Configuration
            </MagneticButton>
            <p className="text-neutral-700 text-xs text-center mt-4 tracking-wide">
              Bespoke orders require 6–9 month lead time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
