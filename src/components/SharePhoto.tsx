import { SectionHeading } from "./SectionHeading";
import { Suspense } from "react";
import { lazy } from "react";

const GuestPhotoDriveGallery = lazy(() =>
  import('./GuestPhotoDriveGallery').then((m) => ({ default: m.GuestPhotoDriveGallery })),
)

const GOOGLE_FORM_URL = 'https://forms.gle/iqB4PHHsvufic4mb6'

export function SharePhoto() {
  return (
    <section className="bg-paper px-9 py-20">
        <SectionHeading eyebrow="SHARE" title="사진을 나눠주세요" />
        <p className="mb-9 text-center text-[13px] leading-relaxed text-ink/50">
          예식날 담아주신 소중한 순간을
          <br />
          신랑신부에게 전해주세요.
        </p>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noreferrer"
          className="mb-8 block w-full rounded-sm bg-green py-3 text-center text-sm font-medium text-paper"
        >
          사진 올리기
        </a>
        <Suspense fallback={<p className="text-center text-sm text-ink/40">불러오는 중...</p>}>
          <GuestPhotoDriveGallery />
        </Suspense>
      </section>
    )
}