import { useEffect, useState } from 'react'

export type Route = 'home' | 'ceremony'

function parseRoute(hash: string): Route {
  return hash === '#/ceremony' ? 'ceremony' : 'home'
}

/** GitHub Pages는 정적 호스팅이라 서버 라우팅 리라이트가 없음 — 해시 기반 라우팅으로 새로고침/직접 접근에서도 깨지지 않게 함. */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  return route
}
