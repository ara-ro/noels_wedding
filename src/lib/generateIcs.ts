interface IcsEventInput {
  title: string
  location: string
  start: string
  durationHours?: number
}

function formatUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

/** 캘린더 앱(구글/애플/아웃룩 등)에서 공통으로 여는 .ics 파일을 클라이언트에서 생성해 다운로드한다. */
export function downloadIcs({ title, location, start, durationHours = 2 }: IcsEventInput) {
  const startDate = new Date(start)
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//noels-wedding//KO',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@noels-wedding`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(startDate)}`,
    `DTEND:${formatUtc(endDate)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'wedding.ics'
  link.click()
  URL.revokeObjectURL(url)
}
