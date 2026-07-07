// action types for CTA buttons
export type QuizAction =
  | { type: 'link';     href: string }             // внутренняя страница (Next.js Link)
  | { type: 'external'; href: string }             // внешняя ссылка, открывается в новой вкладке
  | { type: 'copy';     href: string }             // копирует window.location.origin + href

export interface QuizCta    { label: string; action: QuizAction }
export interface QuizOpt    { label: string; path: string }
export interface QuizResult { title: string; body: string; cta: QuizCta[] }
export interface QuizBranch { q: string; opts: QuizOpt[]; results: Record<string, QuizResult> }

const TELEGRAM_CHANNEL = 'https://t.me/safepaws_help'

// Шаг 1: выбор ресурса. Каждый ответ ведёт в свою ветку — у неё свой вопрос 2,
// свои варианты и свои результаты, никак не пересекающиеся с другими ветками.
export const STEP1: { q: string; opts: QuizOpt[] } = {
  q: 'Что у тебя есть?',
  opts: [
    { label: 'Руки и инструмент',         path: 'hands-and-tools' },
    { label: 'Немного времени',            path: 'time'  },
    { label: 'Финансы', path: 'money' },
    { label: 'Голос в соцсетях',           path: 'voice' },
  ],
}

export const BRANCHES: Record<string, QuizBranch> = {
  'hands-and-tools': {
    q: 'Сколько животных рядом с тобой?',
    opts: [
      { label: '1–2 кошки',     path: 'cozy'    },
      { label: '4–5 кошек',     path: 'family'  },
      { label: 'Целая колония', path: 'purrtap' },
      { label: 'Не знаю точно', path: 'idk'     },
    ],
    results: {
      cozy: {
        title: 'Cozy Shelter',
        body:  'Наше самое компактное и на данный момент бюджетное решение! Позволяет с комфортом разместить несколько кошек! Укрытие защищает хвостатых от ветра, мороза и хищников!',
        cta: [
          { label: 'Скачать чертёж',         action: { type: 'link', href: '/solutions/cozy-shelter'   } },
          { label: 'Найти мастерскую рядом', action: { type: 'link', href: '/solutions/find-workshop/' } },
        ],
      },
      family: {
        title: 'Family Shelter',
        body:  'Увеличенный домик в котором с комфортом разместится целая кошачья семья!',
        cta: [
          { label: 'Скачать чертёж',         action: { type: 'link', href: '/solutions/family-shelter' } },
          { label: 'Найти мастерскую рядом', action: { type: 'link', href: '/solutions/find-workshop/' } },
        ],
      },
      purrtap: {
        title: 'PurrTap - поилка для двора',
        body:  'Минимум инструмента, максимум помощи. Лёгкая замена воды - открутил пустую бутылку, прикрутил новую полную!',
        cta: [
          { label: 'Скачать файлы',          action: { type: 'link', href: '/solutions/purrtap'        } },
          { label: 'Найти мастерскую рядом', action: { type: 'link', href: '/solutions/find-workshop/' } },
        ],
      },
      idk: {
        title: 'Начнём с простого, но полезного!',
        body:  'Самое бюджетное, простое, но далеко не последнее по значимости решение в нашем каталоге! Давайте начнем с него, а дальше будет видно!',
        cta: [
          { label: 'Скачать чертёж',         action: { type: 'link', href: '/solutions/purrtap'        } },
          { label: 'Найти мастерскую рядом', action: { type: 'link', href: '/solutions/find-workshop/' } },
        ],
      },
    },
  },

  time: {
    q: 'Варианты как вы можете нам помочь',
    opts: [
      { label: 'Знаю мастерские рядом!',        path: 'add-workshop'   },
      { label: 'У меня есть идеи!',             path: 'add-idea'       },
      { label: 'Есть навыки программирования!', path: 'help-w-project' },
    ],
    results: {
      'add-workshop': {
        title: 'Добавьте мастерскую в наш каталог!',
        body:  'Если вы знаете мастерскую в своем городе, которая занимается лазерной резкой или 3д печатью - добавьте ее в наш каталог, это поможет другим волонтерам',
        cta: [
          { label: 'Добавить мастерскую',           action: { type: 'link', href: '/solutions/find-workshop/add' } },
          { label: 'Посмотреть каталог мастерских', action: { type: 'link', href: '/solutions/find-workshop'     } },
        ],
      },
      'add-idea': {
        title: 'Предложите свою идею для помощи хвостатым!',
        body:  'Предложите свою идею - мы обязательно рассмотрим ее и постараемся реализовать!',
        cta: [
          { label: 'Предложить идею!', action: { type: 'link', href: '/solutions/add' } },
        ],
      },
      'help-w-project': {
        title: 'Помогите нам с нашим сайтом!',
        body:  'Исходники нашего сайта так же находятся на гитхабе, как и исходники всех наших продуктов! Вы можете помочь нам улучшить сайт, сделать его стабильнее, надежнее и быстрее!',
        cta: [
          { label: 'Github', action: { type: 'external', href: 'https://github.com/kkrugley/safepaws' } },
        ],
      },
    },
  },

  money: {
    q: 'Как вам удобнее нас поддержать?',
    opts: [
      { label: 'Разовый донат, когда есть возможность',       path: 'one-time'     },
      { label: 'Готов(а) подписаться на ежемесячный донат',   path: 'subscription' },
      { label: 'Хочу задонатить именно на установку домика',  path: 'buy'          },
      { label: 'Хочу обсудить партнёрство или крупный вклад', path: 'corporative'  },
    ],
    results: {
      'one-time': {
        title: 'Разовая поддержка',
        body:  'Внесите разовый платёж любым удобным способом. Как только наберётся сумма на домик - мы сразу установим его там, где живут кошки. Также можете просто скопировать ссылку и поделиться с друзьями!',
        cta: [
          { label: 'Поддержать',         action: { type: 'link', href: '?donate=open' } },
          { label: 'Скопировать ссылку', action: { type: 'copy', href: ''              } },
        ],
      },
      subscription: {
        title: 'Регулярная поддержка',
        body:  'Станьте нашим постоянным патроном на OpenCollective, Ko-fi, Buy Me a Coffee или Boosty — кнопка ниже откроет окошко со всеми ссылками!',
        cta: [
          { label: 'Поддержать',            action: { type: 'link', href: '?donate=open' } },
          { label: 'Все способы поддержать', action: { type: 'link', href: '/help'        } },
        ],
      },
      buy: {
        title: 'Материалы вместо денег',
        body:  'Оплатите изготовление домика или другого продукта из каталога - мы отправим его вам или передадим в один из волонтёрских центров.',
        cta: [
          { label: 'Связаться с нами', action: { type: 'link', href: '?mail-form=open' } },
          { label: 'Каталог',          action: { type: 'link', href: '/solutions'      } },
        ],
      },
      corporative: {
        title: 'Корпоративная/крупная поддержка',
        body:  'Готовы поддержать проект крупной суммой или обсудить партнёрство? Напишите нам напрямую - расскажем, как это оформить.',
        cta: [
          { label: 'Связаться с нами', action: { type: 'link', href: '?mail-form=open'  } },
          { label: 'Отчёт расходов',   action: { type: 'link', href: '/help/spendings' } },
        ],
      },
    },
  },

  voice: {
    q: 'Как именно вы готовы рассказывать о проекте?',
    opts: [
      { label: 'Расскажу друзьям и подпишусь на канал в тг',                          path: 'friends' },
      { label: 'Есть страница/блог, могу репостнуть или упомянуть проект',            path: 'blog'    },
      { label: 'Готов(а) писать посты, снимать видео или вести соцсети для SafePaws',  path: 'author'  },
    ],
    results: {
      friends: {
        title: 'Расскажите о нас! Даже 1 новый вовлеченный человек стоит многого!',
        body:  'Можете скопировать ссылку на наш сайт просто нажав на кнопку ниже!',
        cta: [
          { label: 'Скопировать ссылку',   action: { type: 'copy',     href: '?share'          } },
          { label: 'Подписаться на канал', action: { type: 'external', href: TELEGRAM_CHANNEL } },
        ],
      },
      blog: {
        title: 'Поделитесь ссылкой на нас в своем блоге, или репостните один из наших постов в тг или инстаграме',
        body:  'Скопируйте ссылку и вставьте в свой блог, а лучше возьмите готовые материалы для поста - фото, примеры текстов, всё есть на странице ниже!',
        cta: [
          { label: 'Скопировать ссылку',       action: { type: 'copy',     href: '?share'         } },
          { label: 'Материалы для публикаций', action: { type: 'link',     href: '/help/press'     } },
          { label: 'Подписаться на канал',      action: { type: 'external', href: TELEGRAM_CHANNEL } },
        ],
      },
      author: {
        title: 'Снимите видео о нашем проекте, или напишите пост со ссылкой на нас',
        body:  'Хотите снять видео о нас или готовите пост? Пишите в Telegram-канал или через форму на сайте - обсудим детали, расскажем подробности! Все нужные материалы уже лежат на отдельной странице',
        cta: [
          { label: 'Отправить емейл',          action: { type: 'link',     href: '?mail-form=open' } },
          { label: 'Материалы для публикаций', action: { type: 'link',     href: '/help/press'     } },
          { label: 'Подписаться на канал',      action: { type: 'external', href: TELEGRAM_CHANNEL } },
        ],
      },
    },
  },
}
