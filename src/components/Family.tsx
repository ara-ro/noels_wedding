import { weddingInfo, type FamilyInfo, type Person } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'
import { SectionHeading } from './SectionHeading'

function FamilyRow({ family, child, childLabel }: { family: FamilyInfo; child: Person; childLabel: '아들' | '딸' }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <p className="text-sm text-ink/80">
          {family.father} · {family.mother} 의
        </p>
        <p className="mt-1 text-xs text-ink/40">{family.motherBaptismalName ?? ' '}</p>
      </div>
      <div className="text-center">
        <p className="font-serif text-[15px] font-semibold text-green">
          {childLabel} {child.name}
        </p>
        <p className="mt-1 text-xs text-ink/40">{child.baptismalName ?? ' '}</p>
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
    <section className="bg-paper px-9 py-20">
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
