import { useState, useRef, useEffect } from 'react';

const videos = [
  {
    id: 1,
    url: "https://videos.pexels.com/video-files/3760810/3760810-hd_1920_1080_24fps.mp4",
    title: "THE APEX_R1",
    subtitle: "Precision Meets Power.",
  },
  {
    id: 2,
    url: "https://videos.pexels.com/video-files/5309650/5309650-hd_1920_1080_25fps.mp4",
    title: "NEO_CLASSIC",
    subtitle: "Timeless Elegance.",
  },
  {
    id: 3,
    url: "https://videos.pexels.com/video-files/3752531/3752531-hd_1920_1080_24fps.mp4",
    title: "PHANTOM_GT",
    subtitle: "Unleash The Beast.",
  }
];

export default function App() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Video Backgrounds */}
      {videos.map((vid, i) => (
        <video
          key={vid.id}
          src={vid.url}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === activeIdx ? 'opacity-60 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ))}

      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-16">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-widest text-white cursor-pointer hover:text-gray-300 transition-colors">
            APEX
          </h1>
          <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
            {['Models', 'Technology', 'Bespoke', 'Contact'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-gray-400 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-white uppercase text-sm tracking-widest">
            Menu
          </button>
        </header>

        {/* Center Content */}
        <div className="flex flex-col md:flex-row justify-between items-end pb-8">
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="text-sm md:text-md uppercase tracking-[0.3em] text-gray-300 mb-2">
              {videos[activeIdx].subtitle}
            </h2>
            <h3 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none text-gradient">
              {videos[activeIdx].title}
            </h3>
            <button className="mt-8 self-start px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white uppercase tracking-widest text-xs transition-all duration-300">
              Discover Model
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4 mt-12 md:mt-0">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-1 transition-all duration-500 ease-out ${
                  i === activeIdx ? 'w-16 bg-white' : 'w-8 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Show video ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
