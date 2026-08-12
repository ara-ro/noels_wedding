import { useEffect, useRef, useState } from 'react'
import galleryPhoto1 from '../assets/photos/gallery-1.jpg'
import galleryPhoto2 from '../assets/photos/gallery-2.jpg'
import galleryPhoto3 from '../assets/photos/gallery-3.jpg'
import galleryPhoto4 from '../assets/photos/gallery-4.jpg'
import galleryPhoto5 from '../assets/photos/gallery-5.jpg'
import { SectionHeading } from './SectionHeading'

const GALLERY_PHOTOS = [galleryPhoto1, galleryPhoto2, galleryPhoto3, galleryPhoto4, galleryPhoto5]
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
      <div className="grid grid-cols-3 gap-1.5">
        {GALLERY_PHOTOS.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="aspect-square w-full overflow-hidden"
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
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
            <span className="text-xs text-paper/70">
              {openIndex + 1} / {GALLERY_PHOTOS.length}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
