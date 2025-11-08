import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Simple type-in effect for subtitle
    const el = subtitleRef.current;
    if (!el) return;
    const full = el.getAttribute('data-full') || '';
    el.textContent = '';
    let i = 0;
    const id = setInterval(() => {
      el.textContent = full.slice(0, i++);
      if (i > full.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative min-h-[90vh] w-full overflow-hidden bg-black text-white">
      {/* Background Spline scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Vignette and gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_60%,rgba(0,0,0,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-r from-[#7c3aed] via-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(124,58,237,0.35)]">
            Hi, I'm Aryan Dev
          </span>
        </motion.h1>

        <p className="mt-4 text-sm uppercase tracking-[0.25em] text-blue-200/80">Creative Mind | Tech Enthusiast | Dream Builder</p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 max-w-2xl text-base text-blue-100/80"
        >
          I craft cinematic digital experiences blending design, code, and a touch of neon magic.
        </motion.p>

        <motion.p ref={subtitleRef} data-full="Exploring the edges of creativity with AI, web, and immersive interactions." className="mt-4 text-blue-200/80" />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => scrollTo('projects')}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold shadow-[0_0_25px_rgba(96,165,250,0.45)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Get in Touch
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform">
          <div className="h-10 w-[2px] overflow-hidden rounded-full bg-white/20">
            <motion.span
              initial={{ y: -16 }}
              animate={{ y: 16 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              className="block h-4 w-[2px] bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
