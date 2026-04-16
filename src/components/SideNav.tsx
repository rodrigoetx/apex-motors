import { motion } from 'framer-motion';

interface Props {
  total: number;
  activeIndex: number;
  onSelect: (i: number) => void;
  onHover: (h: boolean) => void;
}

export default function SideNav({ total, activeIndex, onSelect, onHover }: Props) {
  return (
    <div className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="relative flex items-center justify-center"
          aria-label={`Go to car ${i + 1}`}
        >
          <div className={`nav-dot ${i === activeIndex ? 'active' : ''}`} />
          {i === activeIndex && (
            <motion.div
              layoutId="dot-ring"
              className="absolute w-4 h-4 rounded-full border border-[var(--gold)] pulse-ring"
            />
          )}
        </button>
      ))}

      {/* Progress line */}
      <div className="w-px h-16 bg-white/10 mt-2 relative">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[var(--gold)]"
          animate={{ height: `${((activeIndex + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <span className="font-display text-[var(--gold)] text-xs">
        {String(activeIndex + 1).padStart(2, '0')}
      </span>
    </div>
  );
}
