import heroPhoto from '../assets/photos/hero.jpg'
import galleryPhoto1 from '../assets/photos/gallery-1.jpg'
import galleryPhoto2 from '../assets/photos/gallery-2.jpg'
import galleryPhoto3 from '../assets/photos/gallery-3.jpg'
import galleryPhoto4 from '../assets/photos/gallery-4.jpg'
import galleryPhoto5 from '../assets/photos/gallery-5.jpg'

export interface Person {
  name: string
  /** 세례명 등 (예: 노엘, 노엘라) */
  baptismalName?: string
}

export interface FamilyInfo {
  father: string
  mother: string
  /** 부모님 세례명이 있는 경우만 */
  motherBaptismalName?: string
}

export interface Account {
  bank: string
  accountNumber: string
  holder: string
}

export type AccountGroupKey = 'groom' | 'bride' | 'groomParents' | 'brideParents'

export interface CeremonyItem {
  label: string
}

export interface CeremonySection {
  title: string
  items: CeremonyItem[]
}

export interface LoveQuote {
  lines: string[]
  source: string
}

export interface TransitInfo {
  subway: string
  bus: string
  parking: string[]
}

export interface WeddingInfo {
  groom: Person
  bride: Person
  groomFamily: FamilyInfo
  brideFamily: FamilyInfo
  /** ISO datetime with timezone offset, used for the live countdown */
  weddingDateTime: string
  weddingDateLabel: string
  venueName: string
  venueAddress: string
  transitInfo: TransitInfo
  loveQuote: LoveQuote
  greeting: string[]
  /** 화환/식사 안내 등 예식 관련 공지 (PLAN.md 참고) */
  ceremonyNotice: string[]
  heroPhoto: string
  galleryPhotos: string[]
  ceremonyOrder: CeremonySection[]
  /** Upload gate code for guest photo uploads (see PLAN.md 5.3) */
  uploadCode: string
  accounts: Record<AccountGroupKey, Account[]>
}

// 찐찐이얏.pdf(종이 청첩장) 기준 실제 정보. 계좌번호는 아직 미확정 TODO.
export const weddingInfo: WeddingInfo = {
  groom: { name: '이율재', baptismalName: '노엘' },
  bride: { name: '김정은', baptismalName: '노엘라' },
  groomFamily: { father: '이강원', mother: '박승아', motherBaptismalName: '유스티나' },
  brideFamily: { father: '김태화', mother: '이회순' },
  weddingDateTime: '2026-11-07T12:00:00+09:00',
  weddingDateLabel: '2026년 11월 7일 토요일 오후 12시',
  venueName: '혜화동성당',
  venueAddress: '서울 종로구 창경궁로 288 혜화동성당',
  transitInfo: {
    subway: '[4호선] 혜화역 1번 출구 도보 5분',
    bus: '100, 102, 104, 107, 109, 140, 143, 150, 710, 272',
    parking: [
      '주차장: 동성중·고등학교 운동장(종로구 혜화동 90-7)',
      '성당 내 주차는 불가합니다. 주차장에 주차 후 성당으로 이동해 주세요.',
      '주차공간이 협소하니 가급적 대중교통 이용을 권장드립니다.',
      '청첩장 지참 시 무료주차 2시간이 제공되며, 이후에는 주차요금이 부과됩니다.',
    ],
  },
  loveQuote: {
    lines: [
      '사랑은 완전한 것이 되기를 기다리는 것이 아니라,',
      '날마다 함께 배우며 자라 가는 것입니다.',
      '서로를 있는 그대로 받아들이고,',
      '함께 걸으며 성숙해 가는 여정입니다.',
      '사랑은 그렇게 시간을 통하여 더욱 깊어집니다.',
    ],
    source: '프란치스코 前 교황 <사랑의 기쁨> 中',
  },
  greeting: ['축복의 자리에 귀한 걸음 하시어', '저희의 새로운 시작을 함께해 주세요.'],
  ceremonyNotice: ['화환은 쌀화환만 접수하며, 보내주신 쌀은 불우이웃돕기에 사용됩니다.'],
  heroPhoto,
  galleryPhotos: [galleryPhoto1, galleryPhoto2, galleryPhoto3, galleryPhoto4, galleryPhoto5],
  // TODO: 세부 순서(독서자·성가 등)는 성당/주례 신부님과 협의 후 확정
  ceremonyOrder: [
    {
      title: '시작 예식',
      items: [{ label: '혼배 안내' }, { label: '입장식' }, { label: '인사' }, { label: '본기도' }],
    },
    {
      title: '말씀 전례',
      items: [{ label: '제1독서' }, { label: '화답송' }, { label: '복음' }, { label: '강론' }],
    },
    {
      title: '혼인 예식',
      items: [{ label: '혼인 서약' }, { label: '반지 교환' }, { label: '혼인 선언' }, { label: '신랑 신부를 위한 기도' }],
    },
    {
      title: '성찬 예식',
      items: [{ label: '예물 준비' }, { label: '감사 기도' }, { label: '주님의 기도' }, { label: '평화의 인사' }, { label: '영성체' }],
    },
    {
      title: '마침 예식',
      items: [{ label: '강복' }, { label: '파견' }],
    },
  ],
  uploadCode: '1107',
  accounts: {
    // TODO: 계좌번호 확정되는 대로 교체
    groom: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '이율재' }],
    bride: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '김정은' }],
    groomParents: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '이강원' }],
    brideParents: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '김태화' }],
  },
}
