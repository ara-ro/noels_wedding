import { useEffect, useState } from 'react'
import { downloadIcs } from '../lib/generateIcs'

const WEDDING_DATE_TIME = '2026-11-07T12:00:00+09:00'
const VENUE_ADDRESS = '서울 종로구 창경궁로 288 혜화동성당'

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
  const [remaining, setRemaining] = useState(() => getRemaining(WEDDING_DATE_TIME))

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining(WEDDING_DATE_TIME)), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-paper-dim px-9 py-20 text-center">
      <p className="mb-4 text-[11px] font-medium tracking-[0.28em] text-teal">WEDDING DAY</p>
      <p className="font-serif text-[26px] font-semibold leading-snug text-green">
        2026년 11월 7일 토요일
        <br />
        오후 12시
      </p>
      <div className="mx-auto my-7 h-px w-7 bg-gold" />
      <div className="flex justify-center gap-3">
        <CountdownTile value={remaining.days} label="DAYS" />
        <CountdownTile value={remaining.hours} label="HOUR" />
        <CountdownTile value={remaining.minutes} label="MIN" />
        <CountdownTile value={remaining.seconds} label="SEC" />
      </div>
      {/* <button
        type="button"
        onClick={() =>
          downloadIcs({
            title: '이율재 ♥ 김정은 결혼식',
            location: VENUE_ADDRESS,
            start: WEDDING_DATE_TIME,
          })
        }
        className="mt-9 rounded-sm border border-green px-7 py-3 text-sm font-medium text-green"
      >
        캘린더에 저장
      </button> */}
    </section>
  )
}
