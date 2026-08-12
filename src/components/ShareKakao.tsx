import { useEffect, useRef, useState } from 'react'
import bgmSrc from '../assets/bgm/noel_bgm.mp3'

// TODO: Kakao Developers에서 발급받은 JavaScript 키를 VITE_KAKAO_JS_KEY로 주입하고
// Kakao.Share.sendDefault 연동 (PLAN.md 2장 공유 항목, 10.2 카카오 키 필요)
export function ShareKakao() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [bgmPlaying, setBgmPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 모바일 브라우저는 사용자 상호작용 없는 오디오 자동재생을 차단하므로,
  // 우선 자동재생을 시도하고 막히면 첫 탭/클릭 시점에 재생한다.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio
      .play()
      .then(() => setBgmPlaying(true))
      .catch(() => {
        const playOnFirstInteraction = () => {
          audio
            .play()
            .then(() => setBgmPlaying(true))
            .catch(() => {})
        }
        document.addEventListener('click', playOnFirstInteraction, { once: true })
        document.addEventListener('touchstart', playOnFirstInteraction, { once: true })
        return () => {
          document.removeEventListener('click', playOnFirstInteraction)
          document.removeEventListener('touchstart', playOnFirstInteraction)
        }
      })
  }, [])

  const toggleBgm = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      void audio.play()
      setBgmPlaying(true)
    } else {
      audio.pause()
      setBgmPlaying(false)
    }
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleShare = () => {
    if (navigator.share) {
      void navigator.share({
        title: '이율재 ♥ 김정은 결혼식에 초대합니다',
        url: window.location.href,
      })
      return
    }
    void handleCopyLink()
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 mx-auto max-w-[460px]">
      <div className="flex flex-col items-end gap-3 pr-6">
        <audio ref={audioRef} src={bgmSrc} loop />
        <button
          type="button"
          onClick={handleShare}
          aria-label="공유하기"
          className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fee500] text-ink shadow-lg transition-all duration-200 ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="링크 복사"
          className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-green bg-paper text-green shadow-lg transition-all duration-200 ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={toggleBgm}
          aria-label={bgmPlaying ? '배경음악 정지' : '배경음악 재생'}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/30 backdrop-blur text-gray-700 shadow-lg transition-transform active:scale-95"
        >
          {bgmPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? '닫기' : '더보기'}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/30 backdrop-blur text-gray-700 shadow-lg transition-transform active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className={`h-6 w-6 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
