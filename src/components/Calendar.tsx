import { useEffect, useState } from 'react'
import { weddingInfo } from '../config/weddingInfo'
import { downloadIcs } from '../lib/generateIcs'

interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getRemaining(targetIso: string): Remaining {
  const diffMs = Math.max(0, new Date(targetIso).getTime() - Date.now())
  const totalSeconds = Math.floor(diffMs / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function CountdownTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="w-16 rounded bg-paper py-3 text-center font-serif text-2xl font-semibold tabular-nums text-green">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] tracking-widest text-ink/40">{label}</span>
    </div>
  )
}

export function Calendar() {
  const [remaining, setRemaining] = useState(() => getRemaining(weddingInfo.weddingDateTime))

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining(weddingInfo.weddingDateTime)), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-paper-dim px-9 py-20 text-center">
      <p className="mb-4 text-[11px] font-medium tracking-[0.28em] text-teal">WEDDING DAY</p>
      <p className="font-serif text-[26px] font-semibold leading-snug text-green">{weddingInfo.weddingDateLabel}</p>
      <div className="mx-auto my-7 h-px w-7 bg-gold" />
      <div className="flex justify-center gap-3">
        <CountdownTile value={remaining.days} label="DAYS" />
        <CountdownTile value={remaining.hours} label="HOUR" />
        <CountdownTile value={remaining.minutes} label="MIN" />
        <CountdownTile value={remaining.seconds} label="SEC" />
      </div>
      <button
        type="button"
        onClick={() =>
          downloadIcs({
            title: `${weddingInfo.groom.name} ♥ ${weddingInfo.bride.name} 결혼식`,
            location: weddingInfo.venueAddress,
            start: weddingInfo.weddingDateTime,
          })
        }
        className="mt-9 rounded-sm border border-green px-7 py-3 text-sm font-medium text-green"
      >
        캘린더에 저장
      </button>
    </section>
  )
}
