import { weddingInfo } from '../config/weddingInfo'

export function Gallery() {
  return (
    <section className="border-t border-gold/30 px-6 py-16">
      <h2 className="mb-4 text-center text-lg font-bold text-green">갤러리</h2>
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
