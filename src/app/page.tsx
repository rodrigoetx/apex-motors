"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gauge, Zap, LayoutDashboard } from "lucide-react";
import { useRef } from "react";

import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import BespokeConfigurator from "@/components/BespokeConfigurator";

// ─────────────────────────────────────────
// Animated scroll indicator
// ─────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40"
    >
      <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-white/60"
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// Stats bar
// ─────────────────────────────────────────
function StatsBadge({
  value,
  unit,
  label,
}: {
  value: string;
  unit: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl md:text-3xl font-extralight tracking-tight text-white">
          {value}
        </span>
        <span className="text-xs text-neutral-500 uppercase tracking-wider">
          {unit}
        </span>
      </div>
      <span className="text-[10px] text-neutral-600 uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: video scrolls slower than viewport
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <main className="w-full flex flex-col bg-black overflow-hidden font-[family-name:var(--font-inter)]">
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video w/ Parallax */}
        <motion.div
          className="absolute inset-0 z-0 w-full h-full"
          style={{ y: videoY, scale: heroScale }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            src="/videos/hero-car.mp4"
          />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>

        {/* Top-left corner label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-8 left-8 z-10 flex items-center gap-3"
        >
          <div className="w-6 h-[1px] bg-white/30" />
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
            Est. 2024
          </span>
        </motion.div>

        {/* Top-right nav hints */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-8 right-8 z-10 flex items-center gap-6"
        >
          {["Models", "Bespoke", "Heritage"].map((item) => (
            <span
              key={item}
              data-cursor="pointer"
              className="text-white/30 hover:text-white/70 transition-colors duration-300 text-[10px] uppercase tracking-[0.2em] font-light"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full"
          style={{ opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-[0.5px] bg-white/30" />
            <span className="text-white/40 text-[10px] uppercase tracking-[0.35em]">
              The New Standard
            </span>
            <div className="w-8 h-[0.5px] bg-white/30" />
          </motion.div>

          {/* Main Title — TextReveal by chars */}
          <TextReveal
            text="APEX MOTORS"
            type="chars"
            delay={0.3}
            className="text-5xl md:text-7xl lg:text-[9rem] font-extralight tracking-[0.15em] text-white uppercase leading-none drop-shadow-2xl"
            as="h1"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-8 text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-md"
          >
            Precision. Performance. Perfection.
          </motion.p>

          {/* CTA Button — Magnetic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-14"
          >
            <MagneticButton
              strength={0.45}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/10 hover:border-white/35 transition-all duration-500 uppercase text-xs font-light tracking-[0.2em]"
            >
              <span>Reserve the Future</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </MagneticButton>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-20 flex items-center gap-10 md:gap-16"
          >
            <StatsBadge value="1,200" unit="hp" label="Output" />
            <div className="w-[1px] h-10 bg-white/10" />
            <StatsBadge value="1.9" unit="sec" label="0–60 mph" />
            <div className="w-[1px] h-10 bg-white/10" />
            <StatsBadge value="250" unit="mph" label="Top speed" />
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* ─── BENTO GRID ─── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 lg:px-8 py-32 flex flex-col gap-16 z-10 bg-black">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-neutral-600 uppercase tracking-[0.3em] text-[10px] mb-5"
          >
            Architecture & Soul
          </motion.p>

          <TextReveal
            text="Engineering & Experience"
            type="words"
            delay={0}
            className="text-3xl md:text-5xl font-light tracking-wider uppercase text-white"
            as="h2"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-neutral-500 font-light tracking-widest text-xs md:text-sm max-w-xl px-4 mt-6 leading-relaxed"
          >
            Every module, every curve is precisely engineered. The driver is the
            center of everything we build.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 h-auto md:h-[720px]">
          {/* Card 1 — Large Interior Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative col-span-1 md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden border border-neutral-800/60 bg-neutral-900 group h-[500px] md:h-auto"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              src="/videos/interior.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <div className="w-11 h-11 rounded-full bg-white/8 backdrop-blur-md flex items-center justify-center mb-6 border border-white/15">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl md:text-5xl font-light mb-4 tracking-wide uppercase">
                Immersive Cockpit
              </h3>
              <p className="text-neutral-400 font-light tracking-wide max-w-xl text-sm md:text-base leading-relaxed">
                A seamless blend of digital innovation and handcrafted luxury,
                centered around the driver.
              </p>
            </div>
          </motion.div>

          {/* Card 2 — Wheel Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative col-span-1 md:row-span-1 rounded-[2rem] overflow-hidden border border-neutral-800/60 bg-neutral-900 group h-[400px] md:h-auto"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              src="/videos/wheel.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="w-10 h-10 rounded-full bg-white/8 backdrop-blur-md flex items-center justify-center mb-5 border border-white/15">
                <Gauge className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-light mb-2 tracking-wide uppercase">
                Aero Mastery
              </h3>
              <p className="text-neutral-400 font-light text-sm tracking-wide">
                Forged composites drafted for zero drag.
              </p>
            </div>
          </motion.div>

          {/* Card 3 — Specs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative col-span-1 md:row-span-1 rounded-[2rem] overflow-hidden border border-neutral-800/60 bg-gradient-to-br from-neutral-900 to-black p-10 flex flex-col justify-between h-[300px] md:h-auto"
          >
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="w-10 h-10 rounded-full bg-white/8 backdrop-blur-md flex items-center justify-center border border-white/15 shadow-2xl">
              <Zap className="w-5 h-5 text-white" />
            </div>

            <div className="space-y-8 mt-8">
              <div>
                <p className="text-neutral-600 uppercase tracking-[0.2em] text-[10px] mb-2">
                  Power Output
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-extralight tracking-tight">
                    1,200
                  </p>
                  <span className="text-sm text-neutral-500 tracking-wider">
                    HP
                  </span>
                </div>
              </div>
              <div className="h-[0.5px] w-full bg-gradient-to-r from-neutral-800 to-transparent" />
              <div>
                <p className="text-neutral-600 uppercase tracking-[0.2em] text-[10px] mb-2">
                  0–60 MPH
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-extralight tracking-tight">1.9</p>
                  <span className="text-sm text-neutral-500 tracking-wider">
                    SEC
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MARQUEE DIVIDER ─── */}
      <div className="relative w-full py-10 border-y border-neutral-900 overflow-hidden bg-black">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-neutral-800 text-xs uppercase tracking-[0.4em] px-12 font-light"
            >
              Apex Motors &nbsp;·&nbsp; Bespoke Engineering &nbsp;·&nbsp;
              Hypercar Excellence &nbsp;·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── BESPOKE CONFIGURATOR ─── */}
      <BespokeConfigurator />

      {/* ─── FOOTER ─── */}
      <footer className="w-full py-16 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-white font-extralight text-sm tracking-[0.3em] uppercase">
              Apex Motors
            </span>
            <span className="text-neutral-700 text-xs tracking-widest">
              The Apex of Luxury
            </span>
          </div>

          <div className="flex items-center gap-8">
            {["Privacy", "Legal", "Contact"].map((item) => (
              <span
                key={item}
                data-cursor="pointer"
                className="text-neutral-700 hover:text-neutral-400 transition-colors duration-300 text-[10px] uppercase tracking-[0.2em]"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-neutral-800 text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Apex Motors. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
