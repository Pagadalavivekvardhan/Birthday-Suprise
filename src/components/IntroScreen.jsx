import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 53) % 100}%`,
        delay: `${(i * 0.4) % 6}s`,
        dur: `${7 + (i % 5)}s`,
        size: 12 + (i % 4) * 5,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute -top-6"
          style={{ left: p.left, fontSize: p.size, animation: `fall ${p.dur} linear ${p.delay} infinite` }}
        >
          🌸
        </span>
      ))}
    </div>
  )
}

export default function IntroScreen({ onOpen, config }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onOpen, 900)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blush via-cream to-lavender px-6 text-center">
      <Petals />
      {/* floating hearts */}
      <div className="pointer-events-none absolute inset-0">
        {['10%', '85%', '20%', '75%'].map((l, i) => (
          <motion.span
            key={l}
            className="absolute text-rose/50"
            style={{ left: l, top: `${20 + i * 18}%`, fontSize: 18 + i * 6 }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
        <h1 className="title-script text-5xl sm:text-6xl md:text-7xl">{config.intro.line1}</h1>
        <p className="mt-3 font-serif text-lg text-romantic/80 sm:text-xl">{config.intro.line2}</p>

        <div className="mt-10 flex flex-col items-center">
          <motion.div
            className="glass mb-6 flex h-28 w-40 items-center justify-center rounded-2xl animate-pulse-glow sm:h-32 sm:w-48"
            animate={opening ? { rotateX: 25, y: -8, scale: 1.05 } : { y: [0, -8, 0] }}
            transition={opening ? { duration: 0.5 } : { duration: 3, repeat: Infinity }}
          >
            <AnimatePresence mode="wait">
              {!opening ? (
                <motion.div key="closed" exit={{ opacity: 0, scale: 0.8 }}>
                  <Mail className="text-deeprose" size={52} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl">
                  💖
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <button onClick={handleOpen} className="btn-romantic text-base sm:text-lg" disabled={opening}>
            {config.intro.button}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
