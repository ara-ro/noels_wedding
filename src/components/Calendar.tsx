import { useEffect, useState } from 'react'
// import { downloadIcs } from '../lib/generateIcs'

const WEDDING_DATE_TIME = '2026-11-07T12:00:00+09:00'
const WEDDING_DAY = '2026-11-07'
// const VENUE_ADDRESS = '서울 종로구 창경궁로 288 혜화동성당'

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

function getKoreaDateString(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function CountdownTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] tracking-widest text-ink/40">{label}</span>
      <span className="w-10 h-10 flex items-center justify-center rounded bg-paper text-center font-serif text-md font-semibold tabular-nums text-green">
        {String(value).padStart(2, '0')}
      </span>
    </div>
  )
}

export function Calendar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const todayKorea = getKoreaDateString(now)
  const isWeddingDay = todayKorea === WEDDING_DAY
  const isAfterWeddingDay = todayKorea > WEDDING_DAY
  const remaining = getRemaining(WEDDING_DATE_TIME)

  return (
    <section className="bg-paper-dim px-9 py-20 text-center">
      <p className="mb-4 text-[11px] font-medium tracking-[0.28em] text-teal">WEDDING DAY</p>
      <p className="font-serif text-[18px] font-semibold leading-snug text-green">
        2026년 11월 7일 (토) 12:00
      </p>
      <div className="mx-auto my-7 h-px w-7 bg-gold" />
      {isAfterWeddingDay ? (
        <p className="font-serif text-xl font-semibold text-green">축하해주셔서 감사합니다.</p>
      ) : isWeddingDay ? (
        <p className="font-serif text-xl font-semibold text-green">오늘 결혼식이에요!</p>
      ) : (
        <div className='flex flex-col items-center gap-6'>
          <div className="mx-auto w-full max-w-xs">
            {/* <div className="mb-2 font-serif text-sm font-semibold text-green">2026년 11월</div> */}
            <div className="grid grid-cols-7 gap-y-2 text-center">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <span key={day} className="text-[11px] font-medium text-ink/40">
                  {day}
                </span>
              ))}
              {Array.from({ length: 37 }, (_, i) => {
                const dayNumber = i - 6
                if (dayNumber < 1 || dayNumber > 30) {
                  return <span key={i} />
                }
                const isWeddingDate = dayNumber === 7
                return (
                  <span
                    key={i}
                    className={
                      isWeddingDate
                        ? 'mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-green font-serif text-sm font-semibold text-paper'
                        : 'flex h-7 items-center justify-center font-serif text-sm text-green'
                    }
                  >
                    {dayNumber}
                  </span>
                )
              })}
            </div>
          </div>
          {/* <div className="flex justify-center gap-3">
            <CountdownTile value={remaining.days} label="DAYS" />
            <CountdownTile value={remaining.hours} label="HOUR" />
            <CountdownTile value={remaining.minutes} label="MIN" />
            <CountdownTile value={remaining.seconds} label="SEC" />
          </div> */}
        </div>

      )}
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
