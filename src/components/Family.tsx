import { weddingInfo, type FamilyInfo, type Person } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'
import { SectionHeading } from './SectionHeading'

function FamilyRow({ family, child, childLabel }: { family: FamilyInfo; child: Person; childLabel: '아들' | '딸' }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <p className="text-ink">
          {family.father} · {family.mother} 의
        </p>
        <p className="mt-1 text-xs text-ink/40">{family.motherBaptismalName ?? ' '}</p>
      </div>
      <div className="text-center">
        <p className="text-green">
          {childLabel} <span className="font-bold">{child.name}</span>
        </p>
        <p className="mt-1 text-xs text-ink/40">{child.baptismalName ?? ' '}</p>
      </div>
    </div>
  )
}

export function Family() {
  const profile = useSenderProfile()
  const isGroomFirst = profile.nameOrder[0] === 'groom'

  const groomRow = <FamilyRow family={weddingInfo.groomFamily} child={weddingInfo.groom} childLabel="아들" />
  const brideRow = <FamilyRow family={weddingInfo.brideFamily} child={weddingInfo.bride} childLabel="딸" />

  return (
    <section className="px-6 py-16">
      <SectionHeading eyebrow="FAMILY" title="가족 소개" />
      <div className="space-y-6">
        {isGroomFirst ? (
          <>
            {groomRow}
            {brideRow}
          </>
        ) : (
          <>
            {brideRow}
            {groomRow}
          </>
        )}
      </div>
    </section>
  )
}
