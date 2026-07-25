import type { AccountGroupKey } from './weddingInfo'

export type SenderKey = 'groom' | 'bride' | 'parent-groom' | 'parent-bride' | 'family'

export interface SenderProfile {
  key: SenderKey | 'default'
  /** Multiplier applied to the document's root font size (see hooks/useSenderProfile.tsx) */
  fontScale: number
  /** Which side's name is displayed first */
  nameOrder: ['groom', 'bride'] | ['bride', 'groom']
  /** Phrase shown under the greeting (PLAN.md 4.2 displayNames) */
  greetingLabel: string
  /** Order in which account groups are listed in AccountInfo */
  accountOrder: AccountGroupKey[]
  /** Account groups to hide entirely, if any */
  hiddenAccountGroups?: AccountGroupKey[]
}

const STANDARD_ACCOUNT_ORDER: AccountGroupKey[] = ['groom', 'bride', 'groomParents', 'brideParents']

export const DEFAULT_PROFILE: SenderProfile = {
  key: 'default',
  fontScale: 1,
  nameOrder: ['groom', 'bride'],
  greetingLabel: '',
  accountOrder: STANDARD_ACCOUNT_ORDER,
}

// TODO: 문구(greetingLabel)는 PLAN.md 4.4 결정에 따라 디자인 확정 후 재작성 예정. 구조만 우선 반영.
export const SENDER_PROFILES: Record<SenderKey, SenderProfile> = {
  groom: {
    key: 'groom',
    fontScale: 1,
    nameOrder: ['groom', 'bride'],
    greetingLabel: '',
    accountOrder: STANDARD_ACCOUNT_ORDER,
  },
  bride: {
    key: 'bride',
    fontScale: 1,
    nameOrder: ['bride', 'groom'],
    greetingLabel: '',
    accountOrder: STANDARD_ACCOUNT_ORDER,
  },
  'parent-groom': {
    key: 'parent-groom',
    fontScale: 1.2,
    nameOrder: ['groom', 'bride'],
    greetingLabel: '아들 ○○○ · 며느리 될 ○○○',
    accountOrder: ['groomParents', 'groom', 'bride', 'brideParents'],
  },
  'parent-bride': {
    key: 'parent-bride',
    fontScale: 1.2,
    nameOrder: ['bride', 'groom'],
    greetingLabel: '딸 ○○○ · 사위 될 ○○○',
    accountOrder: ['brideParents', 'bride', 'groom', 'groomParents'],
  },
  family: {
    key: 'family',
    fontScale: 1.15,
    nameOrder: ['groom', 'bride'],
    greetingLabel: '조카 ○○○ 결혼합니다',
    accountOrder: STANDARD_ACCOUNT_ORDER,
  },
}

const SENDER_KEYS = new Set<string>(Object.keys(SENDER_PROFILES))

export function resolveSenderProfile(rawKey: string | null): SenderProfile {
  if (rawKey && SENDER_KEYS.has(rawKey)) {
    return SENDER_PROFILES[rawKey as SenderKey]
  }
  return DEFAULT_PROFILE
}
