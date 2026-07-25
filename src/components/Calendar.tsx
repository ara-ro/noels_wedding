import { useEffect, useState } from 'react'
import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

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
    <div className="flex flex-col items-center gap-1">
      <span className="w-16 rounded-lg bg-paper-dim py-3 text-center text-2xl font-bold tabular-nums text-green">
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
    <section className="px-6 py-16 text-center">
      <SectionHeading eyebrow="CALENDAR" title="예식 날짜" />
      <p className="mb-8 text-sm text-ink/50">{weddingInfo.weddingDateLabel}</p>
      <div className="flex justify-center gap-3">
        <CountdownTile value={remaining.days} label="DAYS" />
        <CountdownTile value={remaining.hours} label="HOUR" />
        <CountdownTile value={remaining.minutes} label="MIN" />
        <CountdownTile value={remaining.seconds} label="SEC" />
      </div>
    </section>
  )
}
