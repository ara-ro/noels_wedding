const PLACEHOLDER_COUNT = 6

export function Gallery() {
  return (
    <section className="border-t border-gold/30 px-6 py-16">
      <h2 className="mb-4 text-center text-lg font-bold text-green">갤러리</h2>
      {/* TODO: weddingInfo에 갤러리 이미지 목록 추가되면 실제 사진으로 교체 */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
          <div key={index} className="aspect-square rounded bg-paper-dim" />
        ))}
      </div>
    </section>
  )
}
