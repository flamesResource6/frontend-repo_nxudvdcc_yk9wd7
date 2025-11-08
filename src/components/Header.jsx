import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-x-0 top-0 z-40 ${scrolled ? 'backdrop-blur-md bg-black/40 border-b border-white/10' : 'bg-transparent'} `}
      role="navigation"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <button onClick={() => scrollTo('home')} className="text-sm font-semibold tracking-wide text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">
          Aryan Dev
        </button>
        <nav className="hidden items-center gap-6 text-sm text-blue-100/80 sm:flex">
          <button onClick={() => scrollTo('about')} className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">About</button>
          <button onClick={() => scrollTo('projects')} className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">Projects</button>
          <button onClick={() => scrollTo('gallery')} className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">AI Gallery</button>
          <button onClick={() => scrollTo('contact')} className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1.5 font-semibold text-white shadow-[0_0_18px_rgba(96,165,250,0.35)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400">Get in Touch</button>
        </nav>
      </div>
    </motion.header>
  );
}
