import { useState } from 'react'
import { weddingInfo, type Account, type AccountGroupKey } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'

const GROUP_LABEL: Record<AccountGroupKey, string> = {
  groom: '신랑에게',
  bride: '신부에게',
  groomParents: '신랑측 혼주',
  brideParents: '신부측 혼주',
}

function AccountRow({ bank, accountNumber, holder }: Account) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-100 px-4 py-3">
      <div>
        <p className="text-sm text-neutral-800">
          {bank} {accountNumber}
        </p>
        <p className="text-xs text-neutral-400">{holder}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
      >
        {copied ? '복사됨' : '복사'}
      </button>
    </div>
  )
}

export function AccountInfo() {
  const profile = useSenderProfile()
  const hidden = new Set(profile.hiddenAccountGroups)
  const visibleGroups = profile.accountOrder.filter((groupKey) => !hidden.has(groupKey))

  return (
    <section className="border-t border-neutral-100 px-6 py-16">
      <h2 className="mb-4 text-center text-lg font-medium text-neutral-800">마음 전하실 곳</h2>
      <div className="space-y-6">
        {visibleGroups.map((groupKey) => {
          const accounts = weddingInfo.accounts[groupKey]
          if (accounts.length === 0) return null

          return (
            <div key={groupKey}>
              <p className="mb-2 text-sm font-medium text-neutral-500">{GROUP_LABEL[groupKey]}</p>
              <div className="space-y-2">
                {accounts.map((account) => (
                  <AccountRow key={account.accountNumber} {...account} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
