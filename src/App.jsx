import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { birthdayConfig } from './data/birthdayConfig'
import IntroScreen from './components/IntroScreen'
import BirthdayHero from './components/BirthdayHero'
import BirthdayProfile from './components/BirthdayProfile'
import FlowerGarden from './components/FlowerGarden'
import LoveTimeline from './components/LoveTimeline'
import LoveLetter from './components/LoveLetter'
import BirthdayCake from './components/BirthdayCake'
import MemoriesGallery from './components/MemoriesGallery'
import FinalSurprise from './components/FinalSurprise'
import MusicPlayer from './components/MusicPlayer'
import FloatingHearts from './components/FloatingHearts'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blush via-cream to-lavender">
      <motion.div
        className="text-5xl"
        animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        💌
      </motion.div>
      <p className="mt-4 font-script text-2xl text-deeprose">Preparing something special…</p>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [opened, setOpened] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [playRequest, setPlayRequest] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (opened) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [opened])

  if (loading) return <LoadingScreen />

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="intro" exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.7 }}>
            <IntroScreen onOpen={() => setOpened(true)} config={birthdayConfig} />
          </motion.div>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <FloatingHearts />
            <BirthdayHero config={birthdayConfig} />
            <BirthdayProfile config={birthdayConfig} />
            <FlowerGarden config={birthdayConfig} />
            <LoveTimeline config={birthdayConfig} />
            <LoveLetter config={birthdayConfig} />
            <BirthdayCake config={birthdayConfig} />
            <MemoriesGallery config={birthdayConfig} />
            <FinalSurprise config={birthdayConfig} onPlayMoment={() => setPlayRequest((n) => n + 1)} />

            <MusicPlayer config={birthdayConfig} playRequest={playRequest} />

            <AnimatePresence>
              {showTop && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-5 right-5 z-40 rounded-full bg-deeprose p-3 text-white shadow-lg hover:bg-romantic"
                  aria-label="Back to top"
                >
                  <ArrowUp size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
