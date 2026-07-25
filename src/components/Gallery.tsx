import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

export function Gallery() {
  return (
    <section className="px-6 py-16">
      <SectionHeading eyebrow="GALLERY" title="갤러리" />
      <div className="grid grid-cols-3 gap-2">
        {weddingInfo.galleryPhotos.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            alt={`웨딩 사진 ${index + 1}`}
            loading="lazy"
            className="aspect-square w-full rounded object-cover"
          />
        ))}
      </div>
    </section>
  )
}
