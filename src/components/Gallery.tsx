import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import galleryPhoto1 from '../assets/photos/gallery-1.jpg'
import galleryPhoto2 from '../assets/photos/gallery-2.jpg'
import galleryPhoto3 from '../assets/photos/gallery-3.jpg'
import galleryPhoto4 from '../assets/photos/gallery-4.jpg'
import galleryPhoto5 from '../assets/photos/gallery-5.jpg'
import galleryPhoto6 from '../assets/photos/gallery-6.webp'
import galleryPhoto7 from '../assets/photos/gallery-7.webp'
import galleryPhoto8 from '../assets/photos/gallery-8.webp'
import galleryPhoto9 from '../assets/photos/gallery-9.webp'
import galleryPhoto10 from '../assets/photos/gallery-10.webp'
import galleryPhoto11 from '../assets/photos/gallery-11.webp'
import galleryPhoto12 from '../assets/photos/gallery-12.webp'
import galleryPhoto13 from '../assets/photos/gallery-13.webp'
import galleryPhoto14 from '../assets/photos/gallery-14.webp'
import galleryPhoto15 from '../assets/photos/gallery-15.webp'
import galleryPhoto16 from '../assets/photos/gallery-16.webp'
import galleryPhoto17 from '../assets/photos/gallery-17.webp'
import galleryPhoto18 from '../assets/photos/gallery-18.webp'
import galleryPhoto19 from '../assets/photos/gallery-19.webp'
import galleryPhoto20 from '../assets/photos/gallery-20.webp'
import galleryPhoto21 from '../assets/photos/gallery-21.webp'
import galleryPhoto22 from '../assets/photos/gallery-22.webp'
import galleryPhoto23 from '../assets/photos/gallery-23.webp'
import galleryPhoto24 from '../assets/photos/gallery-24.webp'
import galleryPhoto25 from '../assets/photos/gallery-25.webp'
import { SectionHeading } from './SectionHeading'

const GALLERY_PHOTOS = [
  galleryPhoto1,
  galleryPhoto2,
  galleryPhoto3,
  galleryPhoto4,
  galleryPhoto5,
  galleryPhoto6,
  galleryPhoto7,
  galleryPhoto8,
  galleryPhoto9,
  galleryPhoto10,
  galleryPhoto11,
  galleryPhoto12,
  galleryPhoto13,
  galleryPhoto14,
  galleryPhoto15,
  galleryPhoto16,
  galleryPhoto17,
  galleryPhoto18,
  galleryPhoto19,
  galleryPhoto20,
  galleryPhoto21,
  galleryPhoto22,
  galleryPhoto23,
  galleryPhoto24,
  galleryPhoto25,
]
const SWIPE_THRESHOLD = 50

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const showPrev = () =>
    setOpenIndex((current) =>
      current === null ? current : (current - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length,
    )
  const showNext = () =>
    setOpenIndex((current) => (current === null ? current : (current + 1) % GALLERY_PHOTOS.length))

  useEffect(() => {
    if (openIndex === null) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') showPrev()
      else if (event.key === 'ArrowRight') showNext()
      else if (event.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openIndex])

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
  }
  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    if (deltaX > SWIPE_THRESHOLD) showPrev()
    else if (deltaX < -SWIPE_THRESHOLD) showNext()
    touchStartX.current = null
  }

  return (
    <section className="bg-paper px-9 py-20 text-center">
      <SectionHeading eyebrow="GALLERY" title="우리의 순간들" />
      <div
        className="grid grid-flow-col gap-1.5 overflow-x-auto snap-x snap-mandatory pb-1"
        style={{ gridTemplateRows: 'repeat(3, auto)', gridAutoColumns: 'calc((100% - 0.75rem) / 3)' }}
      >
        {GALLERY_PHOTOS.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="aspect-square w-full snap-start overflow-hidden"
          >
            <img src={photo} alt={`웨딩 사진 ${index + 1}`} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          onClick={() => setOpenIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6"
        >
          <img
            src={GALLERY_PHOTOS[openIndex]}
            alt={`웨딩 사진 ${openIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full w-full max-w-[420px] rounded object-cover"
          />
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showPrev()
            }}
            aria-label="이전 사진"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/15 text-paper"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
            aria-label="다음 사진"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/15 text-paper"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="닫기"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-paper/15 text-2xl text-paper"
          >
            &times;
          </button>
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2">
              {GALLERY_PHOTOS.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    index === openIndex ? 'bg-paper' : 'bg-paper/35'
                  }`}
                />
              ))}
            </div>
            {/* <span className="text-xs text-paper/70">
              {openIndex + 1} / {GALLERY_PHOTOS.length}
            </span> */}
          </div>
        </div>
      )}
    </section>
  )
}
