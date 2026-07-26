const LINES = [
  '사랑은 완전한 것이 되기를 기다리는 것이 아니라,',
  '날마다 함께 배우며 자라 가는 것입니다.',
  '서로를 있는 그대로 받아들이고,',
  '함께 걸으며 성숙해 가는 여정입니다.',
  '사랑은 그렇게 시간을 통하여 더욱 깊어집니다.',
]
const SOURCE = '프란치스코 前 교황 <사랑의 기쁨> 中'

export function LoveQuote() {
  return (
    <section className="bg-paper px-9 py-16 text-center">
      <div className="space-y-2 font-serif text-[15px] leading-loose text-ink/70">
        {LINES.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="mt-6 text-xs tracking-widest text-teal">- {SOURCE} -</p>
    </section>
  )
}
