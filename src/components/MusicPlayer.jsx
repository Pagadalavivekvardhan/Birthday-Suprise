import { useEffect, useRef, useState } from 'react'
import { Music, Pause, Volume2 } from 'lucide-react'

export default function MusicPlayer({ config, playRequest }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!playRequest) return
    const a = audioRef.current
    if (!a || error) return
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setError(true))
  }, [playRequest, error])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      try {
        await a.play()
        setPlaying(true)
        setError(false)
      } catch {
        setError(true)
      }
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <audio ref={audioRef} src={config.music.src} loop preload="none" onError={() => setError(true)} onEnded={() => setPlaying(false)} />
      <button
        onClick={toggle}
        className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-romantic shadow-lg hover:bg-white/60"
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={error ? 'Add your music file to enable playback' : config.music.label}
      >
        {playing ? <Pause size={18} /> : error ? <Music size={18} /> : <Volume2 size={18} />}
        <span className="hidden sm:inline">{error ? 'Add music' : playing ? 'Pause' : 'Music'}</span>
      </button>
    </div>
  )
}
