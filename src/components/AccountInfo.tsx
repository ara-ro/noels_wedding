import { useState, type ReactNode } from 'react'
import type { AccountGroupKey } from '../config/senderProfiles'
import { useSenderProfile } from '../hooks/useSenderProfile'
import { SectionHeading } from './SectionHeading'

interface AccountRowData {
  key: string
  label: ReactNode
  bank: string
  accountNumber: string
}

// TODO: 계좌번호 확정되는 대로 교체
// 라벨/이름은 하드코딩. 문구만 바꿀 땐 이 값들만 수정하면 됨.
const ACCOUNTS: Record<AccountGroupKey, AccountRowData[]> = {
  groom: [{ key: 'groom', label: '이율재', bank: '은행명', accountNumber: '000-0000-0000' }],
  groomParents: [
    { key: 'groom-father', label: '아버지 이강원', bank: '우리은행 ', accountNumber: '843-07-025225' },
    { key: 'groom-mother', label: '어머니 박승아', bank: '하나은행', accountNumber: '429-910070-38107' },
  ],
  bride: [{ key: 'bride', label: '김정은', bank: '신한은행', accountNumber: '110-628-998438' }],
  brideParents: [
    {
      key: 'bride-parents',
      label: (
        <>
          아버지 김태화 · 어머니 이회순
        </>
      ),
      bank: '신한은행',
      accountNumber: '110-058-436060',
    },
  ],
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

function AccountRow({ row }: { row: AccountRowData }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(row.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between gap-3 border-t border-paper-dim pt-3.5 first:border-t-0 first:pt-0">
      <div>
        <p className="mb-0.5 text-[13px] text-ink/50">{row.label}</p>
        <p className="text-[13px] font-medium text-ink">
          {row.bank} {row.accountNumber}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-sm border border-gold px-3.5 py-2 text-xs text-green min-w-[70px]"
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
  const [open, setOpen] = useState(false)
  const rows = groupKeys.flatMap((groupKey) => ACCOUNTS[groupKey])
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
          {rows.map((row) => (
            <AccountRow key={row.key} row={row} />
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
      <SectionHeading eyebrow={<div className="h-3 w-3 rotate-45 bg-gold" />} title="마음 전하실 곳" />
      <div className="flex flex-col gap-3 text-left">
        {sideOrder.map((side, index) => (
          <AccountGroup key={side} side={side} groupKeys={groupKeysBySide[side]} defaultOpen={index === 0} />
        ))}
      </div>
    </section>
  )
}
