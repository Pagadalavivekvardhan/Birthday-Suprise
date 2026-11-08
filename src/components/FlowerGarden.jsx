import { motion } from 'framer-motion'

function Bloom({ emoji, delay, x, size = 'text-4xl' }) {
  return (
    <motion.div
      className={`absolute bottom-0 ${size} sway`}
      style={{ left: x, animationDelay: `${delay * 0.3}s` }}
      initial={{ scale: 0, opacity: 0, y: 30 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, type: 'spring', stiffness: 120 }}
    >
      {emoji}
    </motion.div>
  )
}

export default function FlowerGarden({ config }) {
  const blooms = [
    { e: '🌹', x: '6%', d: 0.1, s: 'text-4xl sm:text-5xl' },
    { e: '🌷', x: '16%', d: 0.25, s: 'text-3xl sm:text-4xl' },
    { e: '🌸', x: '28%', d: 0.15, s: 'text-4xl sm:text-5xl' },
    { e: '🌹', x: '40%', d: 0.35, s: 'text-3xl sm:text-4xl' },
    { e: '🌼', x: '52%', d: 0.2, s: 'text-4xl sm:text-5xl' },
    { e: '🌷', x: '64%', d: 0.4, s: 'text-3xl sm:text-4xl' },
    { e: '🌹', x: '76%', d: 0.3, s: 'text-4xl sm:text-5xl' },
    { e: '🌸', x: '88%', d: 0.45, s: 'text-3xl sm:text-4xl' },
  ]
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/30 to-lavender/30 section-pad">
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="title-script text-4xl sm:text-5xl"
        >
          A Garden for You 🌹
        </motion.h3>

        {/* garden scene */}
        <div className="relative mx-auto mt-8 h-52 overflow-hidden rounded-3xl glass sm:h-64">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-deeprose/15 to-transparent" />
          {blooms.map((b, i) => (
            <Bloom key={i} emoji={b.e} x={b.x} delay={b.d} size={b.s} />
          ))}
          {/* butterflies */}
          <motion.div
            className="absolute left-[15%] top-8 text-2xl"
            animate={{ x: [0, 40, 10, 50, 0], y: [0, -15, 5, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            🦋
          </motion.div>
          <motion.div
            className="absolute right-[18%] top-12 text-xl"
            animate={{ x: [0, -30, -5, -40, 0], y: [0, 10, -12, 6, 0] }}
            transition={{ duration: 11, repeat: Infinity, delay: 1 }}
          >
            🦋
          </motion.div>
          {/* falling petals */}
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="absolute -top-4 text-sm"
              style={{ left: `${15 + i * 18}%`, animation: `fall ${6 + i}s linear ${i * 0.8}s infinite` }}
            >
              🌸
            </span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl font-serif text-lg italic text-romantic/90 sm:text-xl"
        >
          “{config.flowerMessage}”
        </motion.p>
      </div>
    </section>
  )
}
