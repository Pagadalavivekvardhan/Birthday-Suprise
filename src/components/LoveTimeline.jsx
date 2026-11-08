import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function LoveTimeline({ config }) {
  return (
    <section className="section-pad bg-gradient-to-b from-lavender/20 to-cream">
      <div className="mx-auto max-w-4xl">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="title-script text-center text-4xl sm:text-5xl"
        >
          Our Love Story ❤️
        </motion.h3>

        <div className="relative mt-10">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-rose/40 sm:left-1/2" />
          {config.timeline.map((item, i) => {
            const left = i % 2 === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: left ? -24 : 24, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className={`relative mb-8 flex sm:mb-10 ${left ? 'sm:justify-start' : 'sm:justify-end'}`}
              >
                <span className="absolute left-4 top-5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-deeprose text-white shadow sm:left-1/2">
                  <Heart size={14} fill="currentColor" />
                </span>
                <div className={`ml-12 w-full sm:ml-0 sm:w-[calc(50%-2rem)] ${!left ? 'sm:mr-0' : ''}`}>
                  <div className="glass rounded-2xl p-4 sm:p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-deeprose/70">{item.date}</p>
                    <h4 className="mt-1 font-serif text-xl font-semibold text-romantic">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-romantic/85 sm:text-base">{item.text}</p>
                    <div className="mt-3 overflow-hidden rounded-xl bg-blush/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-36 w-full object-cover sm:h-40 aspect-square"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.outerHTML =
                            '<div class="flex h-36 items-center justify-center text-sm text-romantic/60 sm:h-40">📷 Add photo: ' +
                            item.image.replace('/assets/images/', '') +
                            '</div>'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
