import { weddingInfo } from '../config/weddingInfo'
import { SectionHeading } from './SectionHeading'

export function Gallery() {
  return (
    <section className="px-6 py-16">
      <SectionHeading eyebrow="GALLERY" title="갤러리" />
      <div className="columns-2 gap-2">
        {weddingInfo.galleryPhotos.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            alt={`웨딩 사진 ${index + 1}`}
            loading="lazy"
            className="mb-2 w-full rounded object-cover"
          />
        ))}
      </div>
    </section>
  )
}
