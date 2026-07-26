import { useState } from 'react'
import { weddingInfo } from '../config/weddingInfo'

// TODO: Kakao Developers에서 발급받은 JavaScript 키를 VITE_KAKAO_JS_KEY로 주입하고
// Kakao.Share.sendDefault 연동 (PLAN.md 2장 공유 항목, 10.2 카카오 키 필요)
export function ShareKakao() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleShare = () => {
    if (navigator.share) {
      void navigator.share({
        title: `${weddingInfo.groom.name} ♥ ${weddingInfo.bride.name} 결혼식에 초대합니다`,
        url: window.location.href,
      })
      return
    }
    void handleCopyLink()
  }

  return (
    <section className="flex gap-2 bg-paper px-9 pb-20">
      <button
        type="button"
        onClick={handleShare}
        className="flex-1 rounded-sm bg-[#fee500] py-3 text-sm font-medium text-ink"
      >
        공유하기
      </button>
      <button
        type="button"
        onClick={handleCopyLink}
        className="flex-1 rounded-sm border border-green py-3 text-sm font-medium text-green"
      >
        {copied ? '복사됨' : '링크 복사'}
      </button>
    </section>
  )
}
