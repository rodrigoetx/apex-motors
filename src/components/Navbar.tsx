import { motion } from 'framer-motion';

interface NavbarProps {
  carName: string;
  onHover: (h: boolean) => void;
}

export default function Navbar({ carName, onHover }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3"
      >
        <div className="w-8 h-8 border border-[var(--gold)] flex items-center justify-center">
          <span className="font-display text-[var(--gold)] text-sm">A</span>
        </div>
        <span className="font-display text-white text-xl tracking-widest">APEX MOTORS</span>
      </motion.div>

      {/* Center: current model */}
      <motion.div
        key={carName}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        className="hidden md:block absolute left-1/2 -translate-x-1/2 text-xs font-medium tracking-[0.3em] uppercase text-white/40"
      >
        {carName}
      </motion.div>

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-8"
      >
        {['Collection', 'Engineers', 'Bespoke'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="hidden md:block text-xs font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
          >
            {item}
          </a>
        ))}
        <button
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="text-xs font-medium tracking-[0.2em] uppercase px-5 py-2.5 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all duration-300"
        >
          Reserve
        </button>
      </motion.nav>
    </header>
  );
}
