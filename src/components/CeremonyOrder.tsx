import { SectionHeading } from './SectionHeading'

const NAMES = {
  groom: { name: '이율재' },
  bride: { name: '김정은' },
}

const WEDDING_DATE_LABEL = '2026년 11월 7일 토요일'
const WEDDING_TIME_LABEL = '오후 12시'
const VENUE_NAME = '혜화동성당'

type Turn = {
  text: string
  response?: boolean
}

type Exchange = {
  speaker?: string[]
  turns: Turn[]
}

type Item = {
  title?: string
  exchanges: Exchange[]
}

type Section = {
  title: string
  items: Item[]
}

const CEREMONY_SECTIONS: Section[] = [
  {
    title: '시작 예식',
    items: [
      {
        title: '입장식',
        exchanges: [
          {
            speaker: ['성가대', '입장성가'],
            turns: [{ text: '신랑 입장 후, 신부가 아버지의 손을 잡고 입장하여 신랑에게 인도됩니다.' }],
          },
        ],
      },
      {
        title: '인사',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '성부와 성자와 성령의 이름으로.' },
              { text: '아멘.', response: true },
            ],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '주 예수 그리스도의 은총과 하느님의 사랑과 성령의 친교가 여러분 모두와 함께.' },
              { text: '또한 사제의 영과 함께.', response: true },
            ],
          },
        ],
      },
      {
        title: '본기도',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              {
                text: '오늘 이 혼인 잔치를 통하여 저희에게 큰 기쁨을 주시는 주님, 신랑 신부에게 은총을 내리시어 서로 성실한 사랑으로 일생 함께하며 그리스도의 사랑을 증언하는 가정을 이루게 하소서.',
              },
              { text: '아멘.', response: true },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '말씀 전례',
    items: [
      {
        title: '제1독서(모두 앉습니다)',
        exchanges: [
          {
            speaker: ['독서자', '다같이'],
            turns: [
              {
                text: '사랑하는 여러분, 하느님은 사랑이십니다. 사랑 안에 머무르는 사람은 하느님 안에 머무르고 하느님께서도 그 사람 안에 머무르십니다. … 이는 주님의 말씀입니다.',
              },
              { text: '하느님, 감사합니다.', response: true },
            ],
          },
        ],
      },
      {
        title: '화답송',
        exchanges: [
          {
            speaker: ['성가대', '다같이'],
            turns: [{ text: '주님 크신 사랑 온 세상에 가득하여라.' }],
          },
        ],
      },
      {
        title: '복음환호송 · 복음',
        exchanges: [
          {
            speaker: ['다같이'],
            turns: [{ text: '알렐루야, 알렐루야.' }],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '주님께서 여러분과 함께.' },
              { text: '또한 사제의 영과 함께.', response: true },
              { text: '요한이 전한 거룩한 복음입니다.' },
              { text: '주님 영광 받으소서.', response: true },
            ],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '… 이는 주님의 말씀입니다.' },
              { text: '그리스도님 찬미합니다.', response: true },
            ],
          },
        ],
      },
      {
        title: '강론',
        exchanges: [
          {
            speaker: ['†주례사제'],
            turns: [{ text: '두 사람의 혼인과 오늘 말씀의 의미를 전합니다.' }],
          },
        ],
      },
    ],
  },
  {
    title: '혼인 예식',
    items: [
      {
        title: '증인 두 분 등단 · 혼인 서약',
        exchanges: [
          {
            speaker: ['†주례사제', '신랑 · 신부'],
            turns: [
              {
                text: '신랑 신부는 지금부터 혼인 서약을 하려고 합니다. 지금까지 어떤 강요도 없이 자유로이, 정성을 다하고 진실한 사랑으로 이 혼인을 하려고 이 자리에 나온 것입니까?',
              },
              { text: '예.', response: true },
            ],
          },
          {
            speaker: ['†주례사제', '신랑 · 신부'],
            turns: [
              { text: '부부로서 일생 동안 서로 사랑하고 존경하겠습니까?' },
              { text: '예.', response: true },
            ],
          },
          {
            speaker: ['†주례사제', '신랑 · 신부'],
            turns: [
              { text: '하느님께서 자녀를 주시면 기꺼이 받아 그리스도의 가르침에 따라 잘 양육하겠습니까?' },
              { text: '예.', response: true },
            ],
          },
          {
            speaker: ['신랑'],
            turns: [
              { text: '저는 신부를 아내로 맞아들여, 검든지 희든지 살아 있는 동안 항상 사랑하고 존경하며 성실할 것을 약속합니다.' },
            ],
          },
          {
            speaker: ['신부'],
            turns: [
              { text: '저는 신랑을 남편으로 맞아들여, 검든지 희든지 살아 있는 동안 항상 사랑하고 존경하며 성실할 것을 약속합니다.' },
            ],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              {
                text: '주님께서는 두 분이 교회 앞에서 고백한 서약을 확고히 하시고 복을 가득히 내려 주시기 바랍니다. 하느님께서 짝지어 주신 것을 사람이 갈라놓지 못합니다.',
              },
              { text: '아멘.', response: true },
            ],
          },
        ],
      },
      {
        title: '반지 축복과 교환',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '주님, 이 반지에 강복하시어 이를 끼는 두 사람이 서로 진실한 사랑을 지키게 하소서.' },
              { text: '아멘.', response: true },
            ],
          },
          {
            speaker: ['신랑'],
            turns: [{ text: '이 반지를 받아 나의 아내로서 지니시고, 성부와 성자와 성령의 이름으로 이 예물을 드립니다.' }],
          },
          {
            speaker: ['신부'],
            turns: [{ text: '이 반지를 받아 나의 남편으로서 지니시고, 성부와 성자와 성령의 이름으로 이 예물을 드립니다.' }],
          },
        ],
      },
      {
        title: '신랑 신부를 위한 기도',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '주님, 오늘 혼인한 두 사람에게 은총을 내리시어 한마음 한몸을 이루어 일생 동안 서로 신의를 지키게 하소서.' },
              { text: '아멘.', response: true },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '성찬 예식',
    items: [
      {
        title: '예물 준비(모두 앉습니다)',
        exchanges: [
          {
            speaker: ['†주례사제'],
            turns: [{ text: '일어서서 저희가 바치는 이 제사가 … 기도합시다.' }],
          },
          {
            speaker: ['성가대', '다같이'],
            turns: [
              { text: '주님의 이름에는 찬미와 영광이요 저희와 온 교회에는 도움이 되게 하소서.' },
              { text: '주님께서 손수 이 제사를 받아주소서.', response: true },
            ],
          },
        ],
      },
      {
        title: '감사 기도',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '주님께서 여러분과 함께.' },
              { text: '또한 사제의 영과 함께.', response: true },
              { text: '마음을 드높이.' },
              { text: '주님께 올립니다.', response: true },
              { text: '우리 주 하느님께 감사합시다.' },
              { text: '마땅하고 옳은 일입니다.', response: true },
            ],
          },
          {
            speaker: ['다같이'],
            turns: [
              { text: '거룩하시도다, 거룩하시도다, 거룩하시도다, 온 누리의 주 하느님. 하늘과 땅에 가득 찬 그 영광, 높은 데서 호산나.' },
            ],
          },
        ],
      },
      {
        title: '주님의 기도',
        exchanges: [
          {
            speaker: ['다같이'],
            turns: [
              {
                text: '하늘에 계신 우리 아버지, 아버지의 이름이 거룩히 빛나시며 아버지의 나라가 오시며 아버지의 뜻이 하늘에서와 같이 땅에서도 이루어지소서. 오늘 저희에게 일용할 양식을 주시고 저희에게 죄지은 이를 저희가 용서하오니 저희 죄를 용서하시고 저희를 유혹에 빠지지 않게 하시고 악에서 구하소서.',
              },
            ],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '주님, 저희를 모든 악에서 구하시고 저희 시대에 평화를 주소서.' },
              { text: '나라와 권능과 영광이 영원히 아버지의 것이옵니다.', response: true },
            ],
          },
        ],
      },
      {
        title: '평화의 인사',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '주님의 평화가 항상 여러분과 함께.' },
              { text: '또한 사제의 영과 함께.', response: true },
            ],
          },
          {
            speaker: ['해설자'],
            turns: [{ text: '평화를 빕니다 하며 서로 인사를 나누십시오.' }],
          },
        ],
      },
      {
        title: '영성체',
        exchanges: [
          {
            speaker: ['다같이'],
            turns: [
              { text: '하느님의 어린 양, 세상의 죄를 없애시는 주님, 저희에게 자비를 베푸소서. (2회)' },
              { text: '하느님의 어린 양, 세상의 죄를 없애시는 주님, 저희에게 평화를 주소서.' },
            ],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '보라, 하느님의 어린 양. 세상의 죄를 없애시는 주님. 이 성찬에 초대받은 이는 복되도다.' },
              { text: '주님, 제 안에 모시기에 합당치 않사오나 한 말씀만 하소서. 제 영혼이 곧 나으리이다.', response: true },
            ],
          },
        ],
      },
      {
        title: '영성체 후 기도',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '주님, 오늘 저희가 함께 받아 모신 이 성사로 신랑 신부의 혼인을 굳게 지켜 주시고 저희 모두에게 힘이 되게 하소서.' },
              { text: '아멘.', response: true },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '마침 예식',
    items: [
      {
        title: '혼인 강복(모두 일어섭니다)',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '전능하신 천주 성부께서는 은총으로 두 분의 마음을 이어 주셨으니, 자녀를 낳아 기르는 복도 함께 주소서.' },
              { text: '아멘.', response: true },
            ],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '외아들의 수난과 부활로 사람을 구원하신 성자께서는 기쁠 때나 슬플 때나 두 분에게 강복하여 주소서.' },
              { text: '아멘.', response: true },
            ],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '사랑의 원천이신 성령께서는 두 분의 마음속에 사랑을 부어 주시어 언제나 이웃에게 그 사랑을 나누어 줄 수 있게 하소서.' },
              { text: '아멘.', response: true },
            ],
          },
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '전능하신 천주 성부와 성자와 성령께서는 강복하소서.' },
              { text: '아멘.', response: true },
            ],
          },
        ],
      },
      {
        title: '파견',
        exchanges: [
          {
            speaker: ['†주례사제', '다같이'],
            turns: [
              { text: '미사가 끝났으니 가서 복음을 전합시다.' },
              { text: '하느님, 감사합니다.', response: true },
            ],
          },
          {
            speaker: ['성가대', '신랑 · 신부'],
            turns: [{ text: '인사 · 축가 · 행진' }],
          },
        ],
      },
    ],
  },
]

export function CeremonyOrder() {
  return (
    <section className="bg-paper px-9 py-20 text-center">
      <p className="mb-4 text-lg text-gold">✝</p>
      <SectionHeading eyebrow="ORDER OF NUPTIAL MASS" title="혼배미사 식순" />
      <p className="mb-1 font-serif text-base font-medium text-ink/70">
        {NAMES.groom.name} · {NAMES.bride.name}
      </p>
      <p className="text-[13px] leading-relaxed text-ink/50">
        {WEDDING_DATE_LABEL} {WEDDING_TIME_LABEL}
        <br />
        {VENUE_NAME}
      </p>
      <div className="mx-auto my-8 h-px w-10 bg-gold/40" />
      <p className="mb-10 text-[13px] leading-relaxed text-ink/40">
        세부 순서는 당일 사정에 따라
        <br />
        달라질 수 있습니다.
      </p>

      <div className="text-left">
        {CEREMONY_SECTIONS.map((section) => (
          <div key={section.title} className="mb-10 last:mb-0">
            <p className="mb-5 font-serif text-[15px] font-semibold text-green">[ {section.title} ]</p>
            <div className="flex flex-col gap-5">
              {section.items.map((item, itemIndex) => (
                <div
                  key={item.title ?? itemIndex}
                  className="flex flex-col gap-3 border-t border-ink/10 pt-5 first:border-t-0 first:pt-0"
                >
                  {item.title && <p className="text-[14px] font-semibold text-ink">{item.title}</p>}
                  {item.exchanges.map((exchange, exchangeIndex) => (
                    <div key={exchangeIndex} className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        {exchange.turns.map((turn, turnIndex) =>
                          turn.response ? (
                            <p key={turnIndex} className="flex items-baseline gap-1.5 text-[13px] text-ink/75">
                              <span className="h-1.5 w-1.5 flex-shrink-0 translate-y-[-1px] rounded-full bg-green" />
                              {turn.text}
                            </p>
                          ) : (
                            <p key={turnIndex} className="text-[13px] leading-relaxed text-ink/75">
                              {turn.text}
                            </p>
                          ),
                        )}
                      </div>
                      {exchange.speaker && (
                        <div className="flex-shrink-0 text-right text-[11px] leading-tight text-ink/35">
                          {exchange.speaker.map((label) => (
                            <p key={label}>{label}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gold/30 pt-10">
        <p className="text-[13px] leading-relaxed text-ink/50">
          귀한 걸음으로 저희 두 사람의 첫 시작을 축복해 주셔서 감사합니다.
          <br />
          변함없는 사랑으로 살아가겠습니다.
        </p>
        <p className="mt-4 font-serif text-base font-semibold text-green">
          {NAMES.groom.name} · {NAMES.bride.name} 드림
        </p>
      </div>
    </section>
  )
}
