import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, PlayCircle } from 'lucide-react'

export default function FinalSurprise({ config, onPlayMoment }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <section className="section-pad relative overflow-hidden bg-gradient-to-b from-lavender/30 via-cream to-blush/50">
      <div className="mx-auto max-w-2xl text-center">
        {!revealed ? (
          <motion.button
            onClick={() => setRevealed(true)}
            className="title-script text-4xl sm:text-5xl text-deeprose"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.98 }}
          >
            {config.final.prelude}
            <span className="mt-3 block font-sans text-sm font-normal text-romantic/70">(tap to reveal)</span>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.15, 1], opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-deeprose/10"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-deeprose/20"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
                <Heart className="text-deeprose" size={44} fill="currentColor" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="font-serif text-xl leading-relaxed text-romantic sm:text-2xl"
              >
                {config.final.message}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={onPlayMoment}
                className="btn-romantic mt-8"
              >
                <PlayCircle size={20} />
                {config.final.button}
              </motion.button>
              <p className="mt-3 text-xs text-romantic/60">
                (Adds your music file at <code>public/assets/music/our-song.mp3</code> or update <code>birthdayConfig.js</code>.)
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
