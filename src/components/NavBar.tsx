import type { Route } from '../hooks/useHashRoute'

const TABS: { route: Route; label: string; href: string }[] = [
  { route: 'home', label: '메인', href: '#/' },
  { route: 'ceremony', label: '예식 순서', href: '#/ceremony' },
]

export function NavBar({ current }: { current: Route }) {
  return (
    <nav className="sticky top-0 z-10 flex border-b border-gold/30 bg-paper/95 backdrop-blur">
      {TABS.map((tab) => {
        const isActive = tab.route === current
        return (
          <a
            key={tab.route}
            href={tab.href}
            className={`flex-1 py-3 text-center text-sm transition-colors ${
              isActive ? 'font-bold text-green' : 'text-ink/50'
            }`}
          >
            {tab.label}
          </a>
        )
      })}
    </nav>
  )
}
