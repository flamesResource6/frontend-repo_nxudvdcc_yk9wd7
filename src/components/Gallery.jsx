import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Copy, Download } from 'lucide-react';
import galleryData from '../data/gallery.json';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <button onClick={onCopy} className="ml-2 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function Gallery() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('all');
  const [showOverlayPrompts, setShowOverlayPrompts] = useState(false);
  const [active, setActive] = useState(null);

  const tags = useMemo(() => {
    const t = new Set(['all']);
    galleryData.forEach((g) => g.tags.forEach((x) => t.add(x)));
    return Array.from(t);
  }, []);

  const filtered = useMemo(() => {
    return galleryData.filter((g) => {
      const matchesTag = tag === 'all' || g.tags.includes(tag);
      const matchesQuery = !query || g.prompt.toLowerCase().includes(query.toLowerCase());
      return matchesTag && matchesQuery;
    });
  }, [query, tag]);

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-3xl font-bold text-white">AI Images Gallery</h2>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-blue-200/80">
            <input type="checkbox" checked={showOverlayPrompts} onChange={(e) => setShowOverlayPrompts(e.target.checked)} className="accent-purple-500" />
            Show prompt overlays
          </label>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="col-span-2 flex items-center rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <Search size={18} className="mx-2 text-blue-200/80" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by prompt keywords..."
            className="w-full bg-transparent p-2 text-sm text-white placeholder-blue-300/50 focus:outline-none"
            aria-label="Search prompts"
          />
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <Filter size={18} className="mx-2 text-blue-200/80" />
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full bg-transparent p-2 text-sm text-white focus:outline-none">
            {tags.map((t) => (
              <option key={t} value={t} className="bg-black">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {filtered.map((img, idx) => (
          <motion.figure
            key={img.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.04, duration: 0.4 }}
            className="relative mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
          >
            <button onClick={() => setActive(img)} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">
              <img src={img.src} alt={img.alt} loading="lazy" className="h-auto w-full object-cover transition duration-300 ease-out hover:scale-[1.03]" />
            </button>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-blue-400/40" />
            {/* Overlay controls */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="flex flex-wrap gap-1">
                {img.tags.map((t) => (
                  <span key={t} className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 text-[10px] text-blue-200">
                    {t}
                  </span>
                ))}
              </div>
              <button onClick={() => setActive(img)} className="rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-1 text-xs font-medium text-white shadow-[0_0_18px_rgba(96,165,250,0.35)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Prompt
              </button>
            </div>
            {showOverlayPrompts && (
              <figcaption className="absolute left-0 top-0 m-2 max-w-[90%] rounded-lg border border-white/10 bg-black/60 p-2 text-xs text-blue-100/90 backdrop-blur">
                {img.prompt}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-black/85 p-5 text-white backdrop-blur-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">Prompt & Settings</h3>
                <div className="flex items-center gap-2">
                  <CopyButton text={active.prompt} />
                  {active.download && (
                    <a href={active.download} download className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-xs hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <Download size={14} /> Download
                    </a>
                  )}
                  <button onClick={() => setActive(null)} className="rounded-md border border-white/10 px-3 py-1 text-xs hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400">Close</button>
                </div>
              </div>
              <img src={active.src} alt={active.alt} className="mt-3 w-full rounded-lg" />
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-blue-100">Original Prompt</h4>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-blue-200/90">{active.prompt}</p>
                </div>
                <div className="grid gap-2 text-sm text-blue-200/90">
                  <div><span className="text-blue-300/80">Model:</span> {active.model}</div>
                  {active.seed && <div><span className="text-blue-300/80">Seed:</span> {active.seed}</div>}
                  {active.aspect && <div><span className="text-blue-300/80">Aspect:</span> {active.aspect}</div>}
                  {active.steps && <div><span className="text-blue-300/80">Steps:</span> {active.steps}</div>}
                  {active.date && <div><span className="text-blue-300/80">Date:</span> {active.date}</div>}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {active.tags.map((t) => (
                      <span key={t} className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 text-[10px] text-blue-200">{t}</span>
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-blue-300/70">License: Personal portfolio showcase. Contact for other usage.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
