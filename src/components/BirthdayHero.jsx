import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 320,
        y: (Math.random() - 0.7) * 320,
        r: Math.random() * 360,
        color: ['#F4A6B8', '#E75480', '#D4A574', '#E6D7FF', '#fff', '#B22234'][i % 6],
        d: 0.4 + Math.random() * 0.6,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute block h-2 w-2 rounded-sm"
          style={{ background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.r }}
          transition={{ duration: 1.6, delay: p.d * 0.2, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function Balloons() {
  const items = [
    { c: '#F4A6B8', l: '8%', d: 0 },
    { c: '#E6D7FF', l: '18%', d: 0.4 },
    { c: '#D4A574', l: '78%', d: 0.2 },
    { c: '#E75480', l: '88%', d: 0.6 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-80px]"
          style={{ left: b.l }}
          animate={{ y: [0, -420 - i * 40], x: [0, i % 2 ? 12 : -12, 0] }}
          transition={{ duration: 10 + i, delay: b.d, repeat: Infinity, ease: 'linear' }}
        >
          <div className="h-12 w-10 rounded-full opacity-80 sm:h-14 sm:w-12" style={{ background: b.c }} />
          <div className="mx-auto h-10 w-px bg-white/60" />
        </motion.div>
      ))}
    </div>
  )
}

function Fireworks() {
  const bursts = [{ t: '15%', l: '20%' }, { t: '20%', l: '75%' }, { t: '35%', l: '50%' }]
  return (
    <div className="pointer-events-none absolute inset-0">
      {bursts.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-xl sm:text-2xl"
          style={{ top: b.t, left: b.l }}
          animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, delay: 1 + i * 0.8, repeat: Infinity, repeatDelay: 2 }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}

export default function BirthdayHero({ config }) {
  const [burstKey, setBurstKey] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setBurstKey((k) => k + 1), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-lavender/40 via-cream to-blush/50 px-5 py-16 text-center">
      <Balloons />
      <Fireworks />
      <div className="pointer-events-none absolute bottom-4 left-4 text-3xl opacity-70 sway sm:text-4xl">🌷</div>
      <div className="pointer-events-none absolute bottom-6 right-6 text-3xl opacity-70 sway sm:text-4xl" style={{ animationDelay: '1s' }}>🌹</div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <div className="relative inline-block">
          <ConfettiBurst key={burstKey} />
          <p className="font-serif text-sm uppercase tracking-[0.25em] text-romantic/70 sm:text-base">A magical day for</p>
          <h1 className="title-script mt-2 text-5xl leading-tight sm:text-6xl md:text-7xl">{config.hero.title}</h1>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-romantic sm:text-4xl md:text-5xl">{config.herName}</h2>
        </div>

        <p className="mx-auto mt-4 max-w-xl text-base text-romantic/80 sm:text-lg">{config.hero.subtitle}</p>

        {/* Animated cake with candles */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative">
            <div className="mb-[-2px] flex justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="flame mb-[-2px] text-lg" style={{ animationDelay: `${i * 0.12}s` }}>🔥</span>
                  <div className="h-6 w-1.5 rounded bg-champagne sm:h-7" />
                </div>
              ))}
            </div>
            <div className="mx-auto h-5 w-36 rounded-t-2xl bg-rose sm:w-44" />
            <div className="mx-auto h-8 w-44 rounded-b-md bg-deeprose/80 sm:w-56" />
            <div className="mx-auto h-3 w-52 rounded-b-xl bg-gold/70 sm:w-64" />
          </div>
          <p className="mt-5 rounded-full bg-white/50 px-4 py-2 font-serif text-sm text-romantic shadow">
            🎂 {config.dateOfBirth} &nbsp;•&nbsp; {config.age}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
