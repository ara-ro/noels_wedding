
import { MainVisual } from '../components/MainVisual'
import { LoveQuote } from '../components/LoveQuote'
import { Greeting } from '../components/Greeting'
import { Family } from '../components/Family'
import { Calendar } from '../components/Calendar'
import { LocationMap } from '../components/LocationMap'
import { CeremonyNotice } from '../components/CeremonyNotice'
import { Gallery } from '../components/Gallery'
import { AccountInfo } from '../components/AccountInfo'
import { ShareKakao } from '../components/ShareKakao'
import { SharePhoto } from '../components/SharePhoto'
import { Footer } from '../components/Footer'
// Firebase SDK는 이 두 컴포넌트에서만 쓰이므로, 초기 번들에서 분리해
// 청첩장 본문이 먼저 뜨도록 지연 로드한다 (PLAN.md 9장 트래픽/가용성 참고).


export function Home() {
  const today = new Date()
  return (
    <>
      <MainVisual />
      {
        today >= new Date('2026-11-07 12:20:00') ? <SharePhoto /> : null
        // today >= new Date('2026-07-25 12:20:00') ? <SharePhoto /> : null
      }
      <LoveQuote />
      <Greeting />
      <Family />
      <Calendar />
      <CeremonyNotice />
      <LocationMap />
      <Gallery />
      <AccountInfo />

      

      <ShareKakao />
      <Footer />
    </>
  )
}
