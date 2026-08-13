import { SectionHeading } from './SectionHeading'

export function SharePhotoNotice() {
  return (
    <section className="bg-paper px-9 py-20">
      <SectionHeading eyebrow="SHARE" title="사진을 나눠주세요" />
      <p className="text-center text-[13px] leading-relaxed text-ink/50">
        예식 당일 담아주신 소중한 사진은
        <br />
        카카오톡이나 인스타그램 DM이 아닌
        <br />
        이곳에서 신랑신부에게 전해주시면 돼요.
        <br />
        업로드는 예식일에 열릴 예정이니 조금만 기다려주세요.
      </p>
    </section>
  )
}
