import { weddingInfo, type FamilyInfo, type Person } from '../config/weddingInfo'
import { useSenderProfile } from '../hooks/useSenderProfile'

function FamilyRow({ family, child, childLabel }: { family: FamilyInfo; child: Person; childLabel: '아들' | '딸' }) {
  return (
    <div className="text-center">
      <p className="text-ink">
        {family.father} · {family.mother}
        {family.motherBaptismalName ? ` (${family.motherBaptismalName})` : ''} 의 {childLabel}{' '}
        <span className="font-bold text-green">{child.name}</span>
        {child.baptismalName ? ` (${child.baptismalName})` : ''}
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
    <section className="border-t border-gold/30 px-6 py-16">
      <div className="space-y-4">
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
