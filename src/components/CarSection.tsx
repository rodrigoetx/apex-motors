import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface Car {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  specs: { value: string; label: string }[];
  videoSrc: string;
  accentColor: string;
}

interface Props {
  car: Car;
  isActive: boolean;
  onHover: (h: boolean) => void;
}

const textReveal = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.9, delay: i * 0.075, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function CarSection({ car, isActive, onHover }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isActive) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isActive]);

  return (
    <section className="snap-section">
      {/* Video background */}
      <video
        ref={videoRef}
        src={car.videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="video-bg"
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 z-10 overlay-left" />
      <div className="absolute inset-0 z-10 overlay-bottom" />

      {/* Large ghost car number */}
      <div className="car-number font-display">{String(car.id).padStart(2, '0')}</div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-20 pb-16 md:pb-20 max-w-4xl">
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={car.id}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              className="flex flex-col gap-6"
            >
              {/* Tag + Line */}
              <div className="flex items-center gap-4">
                <span className="hr-gold" />
                <motion.span
                  custom={0}
                  variants={textReveal}
                  className="text-[var(--gold)] text-xs font-medium tracking-[0.4em] uppercase"
                >
                  {car.tagline}
                </motion.span>
              </div>

              {/* Model Name */}
              <div className="overflow-hidden">
                <motion.h2
                  custom={1}
                  variants={textReveal}
                  className="font-display text-7xl md:text-[10rem] leading-none text-white"
                >
                  {car.name.split(' ')[0]}
                </motion.h2>
              </div>
              <div className="overflow-hidden -mt-6">
                <motion.h2
                  custom={2}
                  variants={textReveal}
                  className="font-display text-5xl md:text-8xl leading-none text-white/20"
                >
                  {car.name.split(' ').slice(1).join(' ')}
                </motion.h2>
              </div>

              {/* Description */}
              <div className="overflow-hidden max-w-lg">
                <motion.p
                  custom={3}
                  variants={textReveal}
                  className="text-sm text-white/50 leading-relaxed font-light"
                >
                  {car.description}
                </motion.p>
              </div>

              {/* Specs */}
              <motion.div
                custom={4}
                variants={textReveal}
                className="flex gap-10 mt-2"
              >
                {car.specs.map((spec) => (
                  <div key={spec.label} className="spec-item">
                    <span className="spec-value">{spec.value}</span>
                    <span className="spec-label">{spec.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                custom={5}
                variants={textReveal}
                className="flex gap-4 mt-2"
              >
                <button
                  className="btn-primary"
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                >
                  Configure Yours
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="btn-outline"
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: price tag */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key={`price-${car.id}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 right-8 md:right-20 z-20 text-right"
          >
            <div className="text-xs tracking-[0.3em] uppercase text-white/30 mb-1">Starting at</div>
            <div className="font-display text-3xl text-white/80" style={{ color: car.accentColor }}>
              {car.id === 1 ? '€ 289,000' : car.id === 2 ? '€ 349,000' : '€ 412,000'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
