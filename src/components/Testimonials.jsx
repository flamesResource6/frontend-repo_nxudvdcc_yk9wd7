import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Elena Park',
    role: 'Product Manager, NovaLabs',
    text: 'Aryan brings a rare mix of design sensitivity and engineering rigor. Our time-to-ship improved by 40%.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop',
  },
  {
    name: 'Rahul Mehta',
    role: 'CTO, PixelForge',
    text: 'Clean architecture, rock-solid APIs, and delightful UI polish. He’s my go-to for complex builds.',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop',
  },
  {
    name: 'Maya Wilson',
    role: 'Founder, CraftAI',
    text: 'The AI gallery UX is brilliant — fast, accessible, and beautiful. Could not ask for more.',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&auto=format&fit=crop',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section id="testimonials" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">What people say</h2>
          <p className="mt-2 text-blue-200/70">Kind words from collaborators and clients.</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[auto,1fr]"
          >
            <img
              src={testimonials[index].avatar}
              width={96}
              height={96}
              alt={testimonials[index].name}
              className="h-24 w-24 rounded-full object-cover ring-2 ring-white/20"
              loading="lazy"
            />
            <div>
              <Quote className="mb-3 h-6 w-6 text-blue-400" aria-hidden="true" />
              <p className="text-lg text-white/90">{testimonials[index].text}</p>
              <p className="mt-4 font-medium text-white">{testimonials[index].name}</p>
              <p className="text-sm text-blue-200/70">{testimonials[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 w-8 rounded-full transition ${i === index ? 'bg-blue-400' : 'bg-white/20 hover:bg-white/30'}`}
              />
            ))}
          </div>
          <div className="text-sm text-blue-200/70">
            {index + 1} / {testimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
}
