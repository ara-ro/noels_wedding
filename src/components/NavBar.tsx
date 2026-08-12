import { useEffect, useRef, useState } from 'react'
import type { Route } from '../hooks/useHashRoute'
import bgmSrc from '../assets/bgm/noel_bgm.mp3'

const TABS: { route: Route; label: string; href: string }[] = [
  { route: 'home', label: '홈', href: '#/' },
  { route: 'ceremony', label: '예식 순서', href: '#/ceremony' },
]

const BGM_TITLE = "noel's wedding - vol.1"

export function NavBar({ current }: { current: Route }) {
  const navRef = useRef<HTMLElement>(null)
  const [isOverHero, setIsOverHero] = useState(true)
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

  useEffect(() => {
    if (current !== 'home') {
      setIsOverHero(false)
      return
    }

    const hero = document.getElementById('hero')
    if (!hero) return

    const navHeight = navRef.current?.offsetHeight ?? 0
    const observer = new IntersectionObserver(
      ([entry]) => setIsOverHero(entry.isIntersecting),
      { rootMargin: `-${navHeight}px 0px 0px 0px`, threshold: 0 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [current])

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-10 mx-auto flex max-w-[460px] backdrop-blur shadow-sm"
    >
      {TABS.map((tab) => {
        const isActive = tab.route === current
        return (
          <a
            key={tab.route}
            href={tab.href}
            className={`flex-1 py-3.5 text-center text-sm transition-colors ${
              isActive ? 'font-semibold' : ''
            } ${isOverHero ? 'text-paper' : isActive ? 'text-green' : 'text-ink/45'}`}
          >
            {tab.label}
          </a>
        )
      })}
      <div className="absolute right-0 top-full flex items-center gap-1.5 rounded-b-md bg-ink/80 px-2 py-1 text-paper backdrop-blur">
        <audio ref={audioRef} src={bgmSrc} loop />
        <button
          type="button"
          onClick={toggleBgm}
          aria-label={bgmPlaying ? '배경음악 정지' : '배경음악 재생'}
          className="flex h-4 w-4 shrink-0 items-center justify-center"
        >
          {bgmPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="w-24 overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap text-[10px] tracking-wide">
            <span className="pr-8">{BGM_TITLE}</span>
            <span className="pr-8">{BGM_TITLE}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
