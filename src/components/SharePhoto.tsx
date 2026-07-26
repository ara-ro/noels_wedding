import { SectionHeading } from "./SectionHeading";
import { Suspense } from "react";
import { lazy } from "react";

const GuestPhotoUpload = lazy(() => import('./GuestPhotoUpload').then((m) => ({ default: m.GuestPhotoUpload })))
const GuestPhotoGallery = lazy(() => import('./GuestPhotoGallery').then((m) => ({ default: m.GuestPhotoGallery })))

export function SharePhoto() {
  return (
    <section className="bg-paper px-9 py-20">
        <SectionHeading eyebrow="SHARE" title="사진을 나눠주세요" />
        <p className="mb-9 text-center text-[13px] leading-relaxed text-ink/50">
          예식날 담아주신 소중한 순간을
          <br />
          신랑신부에게 전해주세요.
        </p>
        <Suspense fallback={<p className="text-center text-sm text-ink/40">불러오는 중...</p>}>
          <GuestPhotoUpload />
          <div className="mt-8">
            <GuestPhotoGallery />
          </div>
        </Suspense>
      </section>
    )
}