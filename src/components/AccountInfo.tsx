import { useState } from 'react'
import type { AccountGroupKey } from '../config/senderProfiles'
import { useSenderProfile } from '../hooks/useSenderProfile'
import { SectionHeading } from './SectionHeading'

interface Account {
  bank: string
  accountNumber: string
  holder: string
}

const GROOM_FAMILY = { father: '이강원', mother: '박승아' }
const BRIDE_FAMILY = { father: '김태화', mother: '이회순' }

// TODO: 계좌번호 확정되는 대로 교체
const ACCOUNTS: Record<AccountGroupKey, Account[]> = {
  groom: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '이율재' }],
  bride: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '김정은' }],
  groomParents: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '이강원' }],
  brideParents: [{ bank: '은행명', accountNumber: '000-0000-0000', holder: '김태화' }],
}

type Side = 'groom' | 'bride'

const SIDE_LABEL: Record<Side, string> = {
  groom: '신랑측',
  bride: '신부측',
}

const SIDE_OF_GROUP: Record<AccountGroupKey, Side> = {
  groom: 'groom',
  groomParents: 'groom',
  bride: 'bride',
  brideParents: 'bride',
}

function relationLabel(groupKey: AccountGroupKey, account: Account): string {
  if (groupKey === 'groom') return `신랑 · ${account.holder}`
  if (groupKey === 'bride') return `신부 · ${account.holder}`
  if (groupKey === 'groomParents') {
    if (account.holder === GROOM_FAMILY.father) return '신랑 아버지'
    if (account.holder === GROOM_FAMILY.mother) return '신랑 어머니'
    return account.holder
  }
  if (account.holder === BRIDE_FAMILY.father) return '신부 아버지'
  if (account.holder === BRIDE_FAMILY.mother) return '신부 어머니'
  return account.holder
}

function AccountRow({ groupKey, account }: { groupKey: AccountGroupKey; account: Account }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between gap-3 border-t border-paper-dim pt-3.5 first:border-t-0 first:pt-0">
      <div>
        <p className="mb-0.5 text-[13px] text-ink/50">{relationLabel(groupKey, account)}</p>
        <p className="text-[13px] font-medium text-ink">
          {account.bank} {account.accountNumber}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-sm border border-gold px-3.5 py-2 text-xs text-green"
      >
        {copied ? '복사됨' : '복사'}
      </button>
    </div>
  )
}

function AccountGroup({
  side,
  groupKeys,
  defaultOpen,
}: {
  side: Side
  groupKeys: AccountGroupKey[]
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const rows = groupKeys.flatMap((groupKey) =>
    ACCOUNTS[groupKey].map((account) => ({ groupKey, account })),
  )
  if (rows.length === 0) return null

  return (
    <div className="overflow-hidden rounded bg-paper">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <span className="text-sm font-semibold text-ink">{SIDE_LABEL[side]}</span>
        <span className={`text-teal transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="flex flex-col gap-3.5 px-5 pb-5">
          {rows.map(({ groupKey, account }) => (
            <AccountRow key={`${groupKey}-${account.accountNumber}-${account.holder}`} groupKey={groupKey} account={account} />
          ))}
        </div>
      )}
    </div>
  )
}

export function AccountInfo() {
  const profile = useSenderProfile()
  const hidden = new Set(profile.hiddenAccountGroups)

  const sideOrder: Side[] = []
  for (const groupKey of profile.accountOrder) {
    const side = SIDE_OF_GROUP[groupKey]
    if (!sideOrder.includes(side)) sideOrder.push(side)
  }

  const groupKeysBySide: Record<Side, AccountGroupKey[]> = {
    groom: (['groom', 'groomParents'] as AccountGroupKey[]).filter((key) => !hidden.has(key)),
    bride: (['bride', 'brideParents'] as AccountGroupKey[]).filter((key) => !hidden.has(key)),
  }

  return (
    <section className="bg-paper-dim px-9 py-20 text-center">
      <SectionHeading eyebrow="GIFT" title="마음 전하실 곳" />
      <div className="flex flex-col gap-3 text-left">
        {sideOrder.map((side, index) => (
          <AccountGroup key={side} side={side} groupKeys={groupKeysBySide[side]} defaultOpen={index === 0} />
        ))}
      </div>
    </section>
  )
}
