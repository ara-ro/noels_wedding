import { useState } from 'react'
import { weddingInfo, type Account, type AccountGroupKey } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'
import { SectionHeading } from './SectionHeading'

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
    if (account.holder === weddingInfo.groomFamily.father) return '신랑 아버지'
    if (account.holder === weddingInfo.groomFamily.mother) return '신랑 어머니'
    return account.holder
  }
  if (account.holder === weddingInfo.brideFamily.father) return '신부 아버지'
  if (account.holder === weddingInfo.brideFamily.mother) return '신부 어머니'
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
    weddingInfo.accounts[groupKey].map((account) => ({ groupKey, account })),
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
      <p className="mb-9 text-[13px] leading-relaxed text-ink/50">
        참석이 어려우신 분들을 위해
        <br />
        계좌번호를 안내드립니다.
      </p>
      <div className="flex flex-col gap-3 text-left">
        {sideOrder.map((side, index) => (
          <AccountGroup key={side} side={side} groupKeys={groupKeysBySide[side]} defaultOpen={index === 0} />
        ))}
      </div>
    </section>
  )
}
