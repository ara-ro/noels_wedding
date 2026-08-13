
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
import { SharePhotoNotice } from '../components/SharePhotoNotice'
import { Footer } from '../components/Footer'


export function Home() {
  const today = new Date()
  return (
    <>
      <MainVisual />
      {
        today >= new Date('2026-01-07 00:00:00') ? <SharePhoto />
        : <SharePhotoNotice />
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
