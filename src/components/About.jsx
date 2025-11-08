import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function useCounter(target = 0, duration = 1200) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const val = Math.floor(start + (target - start) * p);
      el.textContent = String(val);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return ref;
}

export default function About() {
  const yearsRef = useCounter(5);
  const projectsRef = useCounter(24);
  const techRef = useCounter(12);
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-20 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-3xl font-bold"
      >
        About Me
      </motion.h2>

      <div className="grid items-center gap-8 md:grid-cols-[240px,1fr]">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
          alt="Portrait of Aryan Dev"
          className="h-56 w-56 rounded-full object-cover ring-2 ring-purple-500/40"
        />
        <div className="space-y-4 text-blue-100/85">
          <p>
            I'm Aryan Dev — a designer-developer blending cinematic visuals with performant code. I love building immersive web experiences with AI-inspired aesthetics and delightful micro-interactions.
          </p>
          <p>
            When I'm not crafting pixels, I'm experimenting with generative models, exploring new frameworks, and sharing ideas with the community.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-3xl font-extrabold" aria-label="Years of experience"><span ref={yearsRef} />+</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-blue-300/70">Years</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-3xl font-extrabold" aria-label="Projects completed"><span ref={projectsRef} />+</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-blue-300/70">Projects</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-3xl font-extrabold" aria-label="Primary tech"><span ref={techRef} />+</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-blue-300/70">Primary Tech</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
