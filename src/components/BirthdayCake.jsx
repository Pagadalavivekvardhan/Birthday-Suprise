import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

function Burst({ show }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        e: i % 3 === 0 ? '♥' : i % 3 === 1 ? '✨' : '•',
        x: (Math.random() - 0.5) * 260,
        y: (Math.random() - 0.8) * 220,
        c: ['#E75480', '#F4A6B8', '#D4A574', '#E6D7FF', '#B22234'][i % 5],
      })),
    [],
  )
  if (!show) return null
  return (
    <div className="pointer-events-none absolute left-1/2 top-16">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute text-lg font-bold"
          style={{ color: b.c }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
          animate={{ x: b.x, y: b.y, opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          {b.e}
        </motion.span>
      ))}
    </div>
  )
}

export default function BirthdayCake({ config }) {
  const [wished, setWished] = useState(false)

  return (
    <section className="section-pad bg-gradient-to-b from-cream to-blush/40">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="title-script text-4xl sm:text-5xl"
        >
          Make a Wish 🎂
        </motion.h3>

        <div className="relative mt-10 flex flex-col items-center">
          <Burst show={wished} />
          {/* cake */}
          <div className="relative">
            <div className="mb-[-2px] flex justify-center gap-4 sm:gap-5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <AnimatePresence>
                    {!wished && (
                      <motion.span
                        exit={{ opacity: 0, y: -10, scale: 0.3 }}
                        className="flame mb-[-2px] text-base sm:text-lg"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        🔥
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {wished && <span className="mb-[-2px] h-5 text-xs text-romantic/40">~</span>}
                  <div className="h-7 w-1.5 rounded bg-gradient-to-b from-champagne to-gold sm:h-8" />
                </div>
              ))}
            </div>
            <div className="mx-auto flex h-6 w-44 items-center justify-center rounded-t-2xl bg-rose sm:w-56">
              <span className="text-xs tracking-widest text-white/80">♥ ♥ ♥</span>
            </div>
            <div className="mx-auto h-10 w-52 rounded-md bg-deeprose/75 sm:w-64" />
            <div className="mx-auto h-10 w-60 rounded-b-md bg-blush sm:w-72" />
            <div className="mx-auto h-3 w-64 rounded-b-2xl bg-gold/60 sm:w-80" />
          </div>

          <button
            onClick={() => setWished(true)}
            disabled={wished}
            className="btn-romantic mt-8 disabled:cursor-default disabled:opacity-70"
          >
            <Sparkles size={18} />
            {wished ? 'Wish Made ✨' : 'Make a Wish ✨'}
          </button>

          <AnimatePresence>
            {wished && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass mt-6 max-w-lg rounded-2xl p-5"
              >
                <p className="font-serif text-lg italic text-romantic">“{config.cakeWishMessage}”</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
