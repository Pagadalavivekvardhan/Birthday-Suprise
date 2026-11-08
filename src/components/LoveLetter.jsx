import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MailOpen } from 'lucide-react'

function TypedText({ text, active }) {
  const [n, setN] = useState(0)
  const chars = useMemo(() => Array.from(text), [text])
  useEffect(() => {
    if (!active) return
    setN(0)
    const id = setInterval(() => {
      setN((v) => {
        if (v >= chars.length) {
          clearInterval(id)
          return v
        }
        // type a few chars per tick for speed on mobile
        return Math.min(v + 3, chars.length)
      })
    }, 22)
    return () => clearInterval(id)
  }, [active, chars.length])
  return (
    <p className="whitespace-pre-wrap font-serif text-base leading-relaxed text-[#4a2c2a] sm:text-lg">
      {chars.slice(0, n).join('')}
      {active && n < chars.length && <span className="animate-pulse text-deeprose">|</span>}
    </p>
  )
}

export default function LoveLetter({ config }) {
  const [open, setOpen] = useState(false)
  return (
    <section className="section-pad romantic-gradient">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="title-script text-4xl sm:text-5xl"
        >
          My Love Letter 💌
        </motion.h3>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.button
                key="env"
                onClick={() => setOpen(true)}
                className="glass mx-auto flex w-full max-w-sm flex-col items-center rounded-3xl p-8 transition hover:shadow-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -12, rotateX: 20 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4 rounded-2xl bg-blush p-4 text-deeprose animate-pulse-glow">
                  <MailOpen size={40} strokeWidth={1.5} />
                </div>
                <span className="font-serif text-xl font-semibold text-romantic">{config.letter.toLabel}</span>
                <span className="mt-2 text-sm text-romantic/70">Tap to open</span>
              </motion.button>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55 }}
                className="mx-auto max-w-2xl rounded-sm border border-[#ead9c8] bg-[#fffdf8] p-6 text-left shadow-2xl sm:p-10"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 31px, rgba(231,84,128,0.08) 31px, rgba(231,84,128,0.08) 32px)',
                }}
              >
                <TypedText text={config.letter.body} active={open} />
                <p className="mt-6 font-script text-3xl text-deeprose">{config.letter.from}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
