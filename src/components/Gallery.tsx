import { useState } from 'react'
import galleryPhoto1 from '../assets/photos/gallery-1.jpg'
import galleryPhoto2 from '../assets/photos/gallery-2.jpg'
import galleryPhoto3 from '../assets/photos/gallery-3.jpg'
import galleryPhoto4 from '../assets/photos/gallery-4.jpg'
import galleryPhoto5 from '../assets/photos/gallery-5.jpg'
import { SectionHeading } from './SectionHeading'

const GALLERY_PHOTOS = [galleryPhoto1, galleryPhoto2, galleryPhoto3, galleryPhoto4, galleryPhoto5]

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
            onClick={() => setOpenIndex(null)}
            aria-label="닫기"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-paper/15 text-2xl text-paper"
          >
            &times;
          </button>
        </div>
      )}
    </section>
  )
}
