import { weddingInfo } from '../config/weddingInfo'

export function Footer() {
  return (
    <footer className="bg-green px-9 py-16 text-center">
      <div className="mx-auto mb-6 h-3 w-3 rotate-45 bg-gold" />
      <p className="font-serif text-lg font-medium leading-loose text-paper">
        귀한 걸음으로 축복해 주셔서
        <br />
        진심으로 감사드립니다.
      </p>
      <p className="mt-6 font-serif text-sm tracking-wide text-gold">
        {weddingInfo.groom.name} · {weddingInfo.bride.name}
      </p>
    </footer>
  )
}
