// action types for CTA buttons
export type QuizAction =
  | { type: 'link';     href: string }             // внутренняя страница (Next.js Link)
  | { type: 'external'; href: string }             // внешняя ссылка, открывается в новой вкладке
  | { type: 'copy';     href: string }             // копирует window.location.origin + href

export interface QuizCta    { label: string; action: QuizAction }
export interface QuizOpt    { label: string; path: string }
export interface QuizStep   { q: string; opts: QuizOpt[] }
export interface QuizResult { title: string; body: string; cta: [QuizCta, QuizCta] }

export const STEPS: QuizStep[] = [
  {
    q: 'Что у тебя есть?',
    opts: [
      { label: 'Руки и инструмент',         path: 'hands' },
      { label: 'Немного времени',            path: 'time'  },
      { label: 'Готов поддержать финансово', path: 'money' },
      { label: 'Голос в соцсетях',           path: 'voice' },
    ],
  },
  {
    q: 'Сколько животных рядом с тобой?',
    opts: [
      { label: '1–2 кошки',     path: 'cozy'    },
      { label: '4–5 кошек',     path: 'family'  },
      { label: 'Целая колония', path: 'purrtap' },
      { label: 'Не знаю точно', path: 'unknown' },
    ],
  },
  {
    q: 'Когда хочешь начать?',
    opts: [
      { label: 'Уже на этих выходных', path: 'now'   },
      { label: 'В течение 1–2 недель', path: 'soon'  },
      { label: 'Пока просто смотрю',   path: 'later' },
    ],
  },
]

// Результат определяется комбинацией ответа 1 (ресурс) и ответа 2 (размер колонии).
// Ключ: `${ответ_1}_${ответ_2}`
//
// Матрица комбинаций:
//
//             cozy                  family                purrtap               unknown
// hands  │ Cozy Shelter        │ Family Shelter       │ PurrTap              │ Cozy (универсальный) │
// time   │ Хакспейс + Cozy     │ Хакспейс + Family    │ PurrTap за прогулку  │ Помочь волонтёру     │
// money  │ Оплатить Cozy       │ Оплатить Family      │ Набор PurrTap        │ Открытый донат       │
// voice  │ Поделиться Cozy     │ Рассказать Family    │ PurrTap ролик        │ Рассказать о SafePaws│

export const RESULTS: Record<string, QuizResult> = {
  hands_cozy: {
    title: 'Cozy Shelter · фанера 6 мм',
    body:  'Для 1–2 кошек. Сборка за вечер. DXF + PDF с разметкой.',
    cta: [
      { label: 'Скачать чертёж',  action: { type: 'link',     href: '/solutions/cozy'    } },
      { label: 'Найти CNC рядом', action: { type: 'external', href: 'https://hackerspaces.ru' } },
    ],
  },
  hands_family: {
    title: 'Family Shelter · фанера 6 мм',
    body:  'Для небольшой стаи. Двухсекционный домик с общей крышей.',
    cta: [
      { label: 'Скачать чертёж',  action: { type: 'link',     href: '/solutions/family'  } },
      { label: 'Найти CNC рядом', action: { type: 'external', href: 'https://hackerspaces.ru' } },
    ],
  },
  hands_purrtap: {
    title: 'PurrTap · поилка для двора',
    body:  'Минимум инструмента, максимум помощи. Ставится за час.',
    cta: [
      { label: 'Открыть инструкцию', action: { type: 'link', href: '/solutions/purrtap' } },
      { label: 'Заказать набор',      action: { type: 'link', href: '/help'              } },
    ],
  },
  hands_unknown: {
    title: 'Cozy Shelter · универсальный',
    body:  'Самый простой вход. Подойдёт под большинство дворов.',
    cta: [
      { label: 'Скачать чертёж',   action: { type: 'link', href: '/solutions/cozy' } },
      { label: 'Как выбрать место', action: { type: 'link', href: '/help'           } },
    ],
  },

  time_cozy: {
    title: 'Собери на хакспейсе',
    body:  'Принеси фанеру — CNC сделает детали за час. Соберёшь сам.',
    cta: [
      { label: 'Найти хакспейс', action: { type: 'external', href: 'https://hackerspaces.ru' } },
      { label: 'Открыть Cozy',   action: { type: 'link',     href: '/solutions/cozy'         } },
    ],
  },
  time_family: {
    title: 'Family Shelter на хакспейсе',
    body:  'Попроси CNC, дальше — лобзик и шуруповёрт.',
    cta: [
      { label: 'Найти хакспейс',  action: { type: 'external', href: 'https://hackerspaces.ru' } },
      { label: 'Открыть Family',  action: { type: 'link',     href: '/solutions/family'       } },
    ],
  },
  time_purrtap: {
    title: 'PurrTap за одну прогулку',
    body:  'Принести воду, поставить — 30 минут времени.',
    cta: [
      { label: 'Инструкция', action: { type: 'link', href: '/solutions/purrtap' } },
      { label: 'Найти двор', action: { type: 'link', href: '/help'              } },
    ],
  },
  time_unknown: {
    title: 'Помочь волонтёру',
    body:  'Подключись к сборке чужого домика — команды ищут руки.',
    cta: [
      { label: 'Найти сборку', action: { type: 'link', href: '/help'    } },
      { label: 'Истории',      action: { type: 'link', href: '/stories' } },
    ],
  },

  money_cozy: {
    title: 'Оплати один Cozy Shelter',
    body:  'Фанера + крепёж = ~35 €. Волонтёр соберёт и установит.',
    cta: [
      { label: 'Поддержать', action: { type: 'link', href: '/help'    } },
      { label: 'Истории',    action: { type: 'link', href: '/stories' } },
    ],
  },
  money_family: {
    title: 'Оплати Family Shelter',
    body:  'Материалы ~70 €. Накормим стаю зимой.',
    cta: [
      { label: 'Поддержать', action: { type: 'link', href: '/help'    } },
      { label: 'Истории',    action: { type: 'link', href: '/stories' } },
    ],
  },
  money_purrtap: {
    title: 'Набор PurrTap',
    body:  'Поилка + расходники ~20 €. Ставь с волонтёрами.',
    cta: [
      { label: 'Поддержать', action: { type: 'link', href: '/help'    } },
      { label: 'Истории',    action: { type: 'link', href: '/stories' } },
    ],
  },
  money_unknown: {
    title: 'Открытый донат',
    body:  'Направим туда, где острее: материалы или логистика.',
    cta: [
      { label: 'Поддержать',     action: { type: 'link', href: '/help'  } },
      { label: 'Отчёт расходов', action: { type: 'link', href: '/about' } },
    ],
  },

  voice_cozy: {
    title: 'Поделиться Cozy',
    body:  'Готовый пост с чертежом. 1 клик — сосед узнает.',
    cta: [
      { label: 'Скопировать ссылку', action: { type: 'copy', href: '/solutions/cozy' } },
      { label: 'Открыть страницу',   action: { type: 'link', href: '/solutions/cozy' } },
    ],
  },
  voice_family: {
    title: 'Рассказать про Family',
    body:  'Ссылка + история «5 кошек пережили зиму».',
    cta: [
      { label: 'Скопировать ссылку', action: { type: 'copy', href: '/solutions/family' } },
      { label: 'Прочитать историю',  action: { type: 'link', href: '/stories'          } },
    ],
  },
  voice_purrtap: {
    title: 'PurrTap — самое простое',
    body:  'Ролик «как поставить за 30 минут».',
    cta: [
      { label: 'Открыть страницу',   action: { type: 'link', href: '/solutions/purrtap' } },
      { label: 'Скопировать ссылку', action: { type: 'copy', href: '/solutions/purrtap' } },
    ],
  },
  voice_unknown: {
    title: 'Рассказать о SafePaws',
    body:  'Общее описание + 3 истории. Расшарь одному человеку.',
    cta: [
      { label: 'Открыть сайт',       action: { type: 'link', href: '/about' } },
      { label: 'Скопировать ссылку', action: { type: 'copy', href: '/'      } },
    ],
  },
}
