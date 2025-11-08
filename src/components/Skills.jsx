import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Cpu, Palette, Layers } from 'lucide-react';

const skills = [
  { name: 'Frontend', icon: Code2, value: 92, color: 'from-cyan-400 to-blue-500' },
  { name: 'Backend', icon: Cpu, value: 84, color: 'from-violet-400 to-fuchsia-500' },
  { name: 'Design', icon: Palette, value: 78, color: 'from-emerald-400 to-teal-500' },
  { name: 'Systems', icon: Layers, value: 88, color: 'from-amber-400 to-orange-500' },
];

function SkillCircle({ value, label, Icon, color }) {
  const prefersReducedMotion = useReducedMotion();
  const dash = Math.max(0, Math.min(100, value));

  return (
    <div className="group relative flex flex-col items-center gap-4 rounded-xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-white/10">
      <div className="relative h-28 w-28">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="none" className="stroke-white/10" strokeWidth="12" />
          <defs>
            <linearGradient id={`grad-${label}`} x1="0" x2="1">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className={`[stroke:theme(colors.cyan.400)] [filter:drop-shadow(0_0_8px_theme(colors.cyan.500/40))]`}
            style={{
              strokeDasharray: 2 * Math.PI * 42,
              strokeDashoffset: ((100 - dash) / 100) * (2 * Math.PI * 42),
              transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)',
            }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-2xl font-semibold text-white">
            {dash}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${color} text-black shadow-[0_0_20px_rgba(59,130,246,0.35)]`}>
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-lg font-medium text-white/90">{label}</p>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex items-end justify-between"
      >
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">Skills</h2>
          <p className="mt-2 text-blue-200/70">A blend of interface finesse, robust backend, and system thinking.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s) => (
          <SkillCircle key={s.name} value={s.value} label={s.name} Icon={s.icon} color={s.color} />
        ))}
      </div>
    </section>
  );
}
