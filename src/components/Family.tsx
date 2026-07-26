import { useSenderProfile } from '../hooks/useSenderProfile'
import { SectionHeading } from './SectionHeading'

interface FamilyInfo {
  father: string
  mother: string
  motherBaptismalName?: string
}

interface Person {
  name: string
  baptismalName?: string
}

function FamilyRow({ family, child, childLabel }: { family: FamilyInfo; child: Person; childLabel: '아들' | '딸' }) {
  return (
    <>
      <p>{family.father}</p>
      <p className=''>·</p>
      <div className="flex flex-col items-start">
        <p>{family.mother}</p>
        <p className="text-xs text-ink/40">{family.motherBaptismalName ?? ' '}</p>
      </div>
      <div>
        <p className="">
          의 {childLabel}
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <p>{child.name}</p>
        <p className="text-xs text-ink/40">{child.baptismalName ?? ' '}</p>
      </div>
    </>
  )
}

export function Family() {
  const profile = useSenderProfile()
  const isGroomFirst = profile.nameOrder[0] === 'groom'

  const groomRow = (
    <FamilyRow
      family={{ father: '이강원', mother: '박승아', motherBaptismalName: '유스티나' }}
      child={{ name: '이율재', baptismalName: '노엘' }}
      childLabel="아들"
    />
  )
  const brideRow = (
    <FamilyRow
      family={{ father: '김태화', mother: '이회순' }}
      child={{ name: '김정은', baptismalName: '노엘라' }}
      childLabel="딸"
    />
  )

  return (
    <section className="bg-paper px-9 py-20">
      <SectionHeading eyebrow="FAMILY" title="가족 소개" />
      <div
        className="mx-auto grid w-fit gap-x-2 gap-y-6 font-serif"
        style={{ gridTemplateColumns: 'auto auto auto auto auto' }}
      >
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
