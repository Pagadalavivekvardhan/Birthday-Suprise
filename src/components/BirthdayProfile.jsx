import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function BirthdayProfile({ config }) {
  return (
    <section className="section-pad romantic-gradient">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-6 text-center sm:p-10"
        >
          <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white shadow-lg bg-blush sm:h-36 sm:w-36">
            <img
              src={config.profilePhoto}
              alt={config.herName}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.classList.add('text-4xl')
                e.currentTarget.parentElement.innerHTML = '🌸'
              }}
            />
          </div>
          <h3 className="title-script text-4xl sm:text-5xl">{config.fullName}</h3>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">
            <span className="rounded-full bg-white/60 px-4 py-1.5 text-romantic">Born: {config.dateOfBirth}</span>
            <span className="rounded-full bg-white/60 px-4 py-1.5 text-romantic">Age: {config.age}</span>
          </div>
          <div className="mx-auto mt-6 flex max-w-xl items-start gap-3 text-left">
            <Heart className="mt-1 shrink-0 text-deeprose" size={20} fill="currentColor" />
            <p className="font-serif text-lg italic leading-relaxed text-romantic/90">“{config.profileCaption}”</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
