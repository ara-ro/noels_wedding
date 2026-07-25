import { weddingInfo, type FamilyInfo, type Person } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'
import { SectionHeading } from './SectionHeading'

function FamilyRow({ family, child, childLabel }: { family: FamilyInfo; child: Person; childLabel: '아들' | '딸' }) {
  return (
    <div className="text-center">
      <p className="text-sm text-ink/60">
        {family.father} · {family.mother}
        {family.motherBaptismalName ? ` (${family.motherBaptismalName})` : ''} 의 {childLabel}
      </p>
      <p className="mt-1 text-lg font-bold text-green">
        {child.name}
        {child.baptismalName ? <span className="ml-1 text-sm font-normal text-ink/50">({child.baptismalName})</span> : null}
      </p>
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
      <div className="space-y-8">
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
