export interface Person {
  name: string
  nameEn?: string
}

export interface Account {
  bank: string
  accountNumber: string
  holder: string
}

export type AccountGroupKey = 'groom' | 'bride' | 'groomParents' | 'brideParents'

export interface WeddingInfo {
  groom: Person
  bride: Person
  /** ISO date string, e.g. '2026-11-07' */
  weddingDate: string
  weddingDateLabel: string
  venueName: string
  venueAddress: string
  venueMapUrl?: string
  greeting: string[]
  /** Upload gate code for guest photo uploads (see PLAN.md 5.3) */
  uploadCode: string
  accounts: Record<AccountGroupKey, Account[]>
}

// 찐찐이얏.pdf(종이 청첩장) 기준 실제 정보. 계좌번호는 아직 미확정 TODO.
export const weddingInfo: WeddingInfo = {
  groom: { name: '이율재' },
  bride: { name: '김정은' },
  weddingDate: '2026-11-07',
  weddingDateLabel: '2026년 11월 7일 토요일 오후 12시',
  venueName: '혜화동성당',
  venueAddress: '서울 종로구 창경궁로 288 혜화동성당',
  greeting: ['축복의 자리에 귀한 걸음 하시어', '저희의 새로운 시작을 함께해 주세요.'],
  uploadCode: '1107',
  accounts: {
    // TODO: 계좌번호 확정되는 대로 교체
    groom: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '이율재' }],
    bride: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '김정은' }],
    groomParents: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '이강원' }],
    brideParents: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '김태화' }],
  },
}
