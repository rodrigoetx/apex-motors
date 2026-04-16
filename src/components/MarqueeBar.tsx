import { motion } from 'framer-motion';

const words = [
  'PERFORMANCE', '·', 'PRECISION', '·', 'LUXURY', '·', 'INNOVATION', '·',
  'PERFORMANCE', '·', 'PRECISION', '·', 'LUXURY', '·', 'INNOVATION', '·',
];

export default function MarqueeBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 overflow-hidden py-3 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="marquee-track font-display text-xs text-white/20 tracking-[0.3em]">
        {words.map((w, i) => (
          <span key={i} className="mx-4">{w}</span>
        ))}
        {words.map((w, i) => (
          <span key={`d-${i}`} className="mx-4">{w}</span>
        ))}
      </div>
    </div>
  );
}
