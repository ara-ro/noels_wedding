import { useEffect, useRef, useState } from 'react'
import type { Route } from '../hooks/useHashRoute'

const TABS: { route: Route; label: string; href: string }[] = [
  { route: 'home', label: '홈', href: '#/' },
  { route: 'ceremony', label: '예식 순서', href: '#/ceremony' },
]

export function NavBar({ current }: { current: Route }) {
  const navRef = useRef<HTMLElement>(null)
  const [isOverHero, setIsOverHero] = useState(true)

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
    </nav>
  )
}
