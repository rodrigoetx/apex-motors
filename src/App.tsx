import { useState, useEffect, useRef } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import CarSection from './components/CarSection';
import SideNav from './components/SideNav';
import MarqueeBar from './components/MarqueeBar';

const CARS = [
  {
    id: 1,
    slug: 'apex-r1',
    name: 'APEX R1',
    tagline: 'The Genesis',
    description:
      'Born from the obsession of twelve engineers who refused limits. The R1 channels 780 horsepower through active aerodynamics that transform at the speed of thought.',
    specs: [
      { value: '780', label: 'Horsepower' },
      { value: '2.7s', label: '0–100 km/h' },
      { value: '342', label: 'Top KM/H' },
    ],
    videoSrc: '/videos/car1.mp4',
    accentColor: '#C9A84C',
  },
  {
    id: 2,
    slug: 'phantom-gt',
    name: 'PHANTOM GT',
    tagline: 'Total Mastery',
    description:
      'Grand touring redefined. The Phantom GT wraps you in hand-stitched Italian leather while 680hp sculpts the horizon. Distance is irrelevant at this altitude.',
    specs: [
      { value: '680', label: 'Horsepower' },
      { value: '3.1s', label: '0–100 km/h' },
      { value: '315', label: 'Top KM/H' },
    ],
    videoSrc: '/videos/car2.mp4',
    accentColor: '#B8C5D6',
  },
  {
    id: 3,
    slug: 'neo-zephyr',
    name: 'NEO ZEPHYR',
    tagline: 'Electric Fury',
    description:
      'All-electric. Zero compromise. The Zephyr delivers 1,020hp silently — until 200km/h when the synthetic exhaust note awakens. The future sounds like this.',
    specs: [
      { value: '1020', label: 'Horsepower' },
      { value: '1.9s', label: '0–100 km/h' },
      { value: '380', label: 'Top KM/H' },
    ],
    videoSrc: '/videos/car3.mp4',
    accentColor: '#56CFE1',
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: detect which section is in view
  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll<HTMLElement>('.snap-section');
    if (!sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach((s, i) => {
      s.dataset.index = String(i);
      observer.observe(s);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (i: number) => {
    const sections = containerRef.current?.querySelectorAll('.snap-section');
    sections?.[i]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="noise">
      <Cursor isHovered={isHovered} />
      <Navbar
        carName={CARS[activeIndex].slug.toUpperCase()}
        onHover={setIsHovered}
      />
      <SideNav
        total={CARS.length}
        activeIndex={activeIndex}
        onSelect={scrollToIndex}
        onHover={setIsHovered}
      />

      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {CARS.map((car, i) => (
          <CarSection
            key={car.id}
            car={car}
            isActive={activeIndex === i}
            onHover={setIsHovered}
          />
        ))}
      </div>

      <MarqueeBar />
    </div>
  );
}
