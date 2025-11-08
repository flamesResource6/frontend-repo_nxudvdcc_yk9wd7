import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    // Fake async submit for demo
    setTimeout(() => setStatus('success'), 800);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-3xl font-bold text-white"
      >
        Get in Touch
      </motion.h2>

      <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span>Name</span>
            <input required name="name" className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Email</span>
            <input required type="email" name="email" className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm">
          <span>Message</span>
          <textarea required name="message" rows={5} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </label>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold shadow-[0_0_25px_rgba(96,165,250,0.45)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60"
        >
          {status === 'success' ? 'Sent! ✅' : status === 'loading' ? 'Sending…' : 'Get in Touch'}
        </button>

        {status === 'success' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">
            Thanks! I'll get back to you soon.
          </motion.div>
        )}
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-blue-200/80">
        <a href="mailto:hello@aryandev.dev" className="underline decoration-dotted underline-offset-4 hover:text-white">hello@aryandev.dev</a>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Github</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">Discord</a>
        </div>
      </div>
    </section>
  );
}
