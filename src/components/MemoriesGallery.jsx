import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function MemoriesGallery({ config }) {
  const [active, setActive] = useState(null)

  return (
    <section className="section-pad bg-gradient-to-b from-blush/30 to-lavender/20">
      <div className="mx-auto max-w-5xl">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="title-script text-center text-4xl sm:text-5xl"
        >
          Our Memories 📸
        </motion.h3>
        <p className="mt-2 text-center text-romantic/70">Tap a photo to view it larger.</p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {config.gallery.map((item, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(item)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group glass overflow-hidden rounded-2xl text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-blush/40">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.outerHTML =
                      '<div class="flex h-full items-center justify-center p-3 text-center text-xs text-romantic/60">📷 ' +
                      item.src.replace('/assets/images/', '') +
                      '</div>'
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40 rounded-2xl" />
              </div>
              <div className="p-3">
                <p className="font-serif text-sm text-romantic sm:text-base">{item.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 text-romantic shadow"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <img src={active.src} alt={active.caption} className="max-h-[70vh] w-full object-contain bg-blush/20" />
              <p className="p-4 text-center font-serif text-romantic">{active.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
