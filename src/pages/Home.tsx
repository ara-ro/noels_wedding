import { lazy, Suspense } from 'react'
import { MainVisual } from '../components/MainVisual'
import { Greeting } from '../components/Greeting'
import { Family } from '../components/Family'
import { Calendar } from '../components/Calendar'
import { LocationMap } from '../components/LocationMap'
import { Gallery } from '../components/Gallery'
import { AccountInfo } from '../components/AccountInfo'
import { ShareKakao } from '../components/ShareKakao'
import { SectionHeading } from '../components/SectionHeading'

// Firebase SDK는 이 두 컴포넌트에서만 쓰이므로, 초기 번들에서 분리해
// 청첩장 본문이 먼저 뜨도록 지연 로드한다 (PLAN.md 9장 트래픽/가용성 참고).
const GuestPhotoUpload = lazy(() => import('../components/GuestPhotoUpload').then((m) => ({ default: m.GuestPhotoUpload })))
const GuestPhotoGallery = lazy(() => import('../components/GuestPhotoGallery').then((m) => ({ default: m.GuestPhotoGallery })))

export function Home() {
  return (
    <>
      <MainVisual />
      <Greeting />
      <Family />
      <Calendar />
      <LocationMap />
      <Gallery />
      <AccountInfo />

      <section className="px-6 py-16">
        <SectionHeading eyebrow="PHOTO" title="하객 사진" />
        <p className="mb-8 text-center text-sm text-ink/50">결혼식에서 찍은 사진을 함께 나눠주세요.</p>
        <Suspense fallback={<p className="text-center text-sm text-ink/40">불러오는 중...</p>}>
          <GuestPhotoUpload />
          <div className="mt-8">
            <GuestPhotoGallery />
          </div>
        </Suspense>
      </section>

      <ShareKakao />
    </>
  )
}
