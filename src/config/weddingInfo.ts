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

// TODO: PLAN.md 10.2 체크리스트 항목 확정되는 대로 아래 값을 실제 정보로 교체하세요.
export const weddingInfo: WeddingInfo = {
  groom: { name: '신랑 이름' },
  bride: { name: '신부 이름' },
  weddingDate: '2026-11-07',
  weddingDateLabel: '2026년 11월 7일 토요일 오후 2시',
  venueName: '예식장 이름',
  venueAddress: '예식장 주소',
  greeting: [
    '두 사람이 하나가 되어',
    '새로운 시작을 함께합니다.',
    '귀한 걸음 하시어 축복해주시면',
    '더없는 기쁨으로 간직하겠습니다.',
  ],
  uploadCode: '1107',
  accounts: {
    groom: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '신랑 이름' }],
    bride: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '신부 이름' }],
    groomParents: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '신랑 아버지' }],
    brideParents: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '신부 아버지' }],
  },
}
