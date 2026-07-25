import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { resolveSenderProfile, type SenderProfile } from '../config/senderProfiles'

const SenderProfileContext = createContext<SenderProfile | null>(null)

export function SenderProfileProvider({ children }: { children: ReactNode }) {
  const profile = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return resolveSenderProfile(params.get('to'))
  }, [])

  // rem 단위는 <html> 루트 font-size 기준이라, 프로필별 가독성 확대(fontScale)는
  // 루트 font-size를 조정해야 Tailwind 텍스트 크기 전반에 반영됨.
  useEffect(() => {
    document.documentElement.style.fontSize = `${profile.fontScale * 100}%`
    return () => {
      document.documentElement.style.fontSize = ''
    }
  }, [profile.fontScale])

  return <SenderProfileContext.Provider value={profile}>{children}</SenderProfileContext.Provider>
}

export function useSenderProfile(): SenderProfile {
  const profile = useContext(SenderProfileContext)
  if (!profile) {
    throw new Error('useSenderProfile은 SenderProfileProvider 내부에서만 사용할 수 있습니다.')
  }
  return profile
}
