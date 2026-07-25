import { weddingInfo } from '../config/weddingInfo'

// TODO: Kakao Developers에서 발급받은 JavaScript 키를 VITE_KAKAO_JS_KEY로 주입하고
// Kakao.Share.sendDefault 연동 (PLAN.md 2장 공유 항목, 10.2 카카오 키 필요)
export function ShareKakao() {
  const handleShare = () => {
    if (navigator.share) {
      void navigator.share({
        title: `${weddingInfo.groom.name} ♥ ${weddingInfo.bride.name} 결혼식에 초대합니다`,
        url: window.location.href,
      })
      return
    }
    void navigator.clipboard.writeText(window.location.href)
    window.alert('청첩장 링크가 복사되었습니다.')
  }

  return (
    <section className="border-t border-gold/30 px-6 py-16">
      <button
        type="button"
        onClick={handleShare}
        className="w-full rounded-lg bg-yellow-300 py-3 text-sm font-bold text-ink"
      >
        공유하기
      </button>
    </section>
  )
}
