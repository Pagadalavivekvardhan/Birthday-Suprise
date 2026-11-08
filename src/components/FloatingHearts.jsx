import { useMemo } from 'react'

export default function FloatingHearts({ count = 14, className = '' }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        delay: `${(i * 0.7) % 8}s`,
        duration: `${10 + (i % 6) * 2}s`,
        size: 12 + (i % 5) * 6,
        opacity: 0.18 + (i % 4) * 0.08,
      })),
    [count],
  )

  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`} aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: h.left,
            bottom: '-30px',
            fontSize: h.size,
            opacity: h.opacity,
            animation: `floatUp ${h.duration} linear ${h.delay} infinite`,
          }}
        >
          ♥
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: var(--op, 0.3); }
          100% { transform: translateY(-115vh) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
