import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';

function TiltCard({ children }) {
  const [style, setStyle] = useState({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)' });
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -8; // tilt X
    const ry = (px - 0.5) * 8; // tilt Y
    setStyle({ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)` });
  };
  const reset = () => setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)' });
  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-[1px] backdrop-blur-sm transition-shadow hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]"
      style={style}
    >
      <div className="rounded-2xl bg-black/50 p-4">
        {/* reflection */}
        <div className="pointer-events-none absolute inset-x-0 -top-1 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {children}
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);
  const projects = useMemo(() => projectsData, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-3xl font-bold text-white"
      >
        Featured Projects
      </motion.h2>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {projects.map((p, idx) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            className="mb-6 break-inside-avoid"
          >
            <button
              onClick={() => setActive(p)}
              className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <TiltCard>
                <img
                  src={p.thumbnail}
                  alt={p.title + ' thumbnail'}
                  className="h-auto w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-blue-200/80">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 text-xs text-blue-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </button>
          </motion.article>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-black/80 p-6 text-white backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold">{active.title}</h3>
              <button onClick={() => setActive(null)} className="rounded-md border border-white/10 px-3 py-1 text-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400">
                Close
              </button>
            </div>
            <img src={active.images?.[0] || active.thumbnail} alt={active.title + ' large preview'} className="mt-4 w-full rounded-xl" />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold">Problem</h4>
                <p className="mt-1 text-blue-200/80">{active.caseStudy?.problem}</p>
              </div>
              <div>
                <h4 className="font-semibold">Solution</h4>
                <p className="mt-1 text-blue-200/80">{active.caseStudy?.solution}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Role</h4>
              <p className="mt-1 text-blue-200/80">{active.caseStudy?.role}</p>
            </div>
            {active.link && (
              <a href={active.link} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold shadow-[0_0_25px_rgba(96,165,250,0.35)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400">
                View Demo
              </a>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
