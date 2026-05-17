# SafePaws Website

Сайт проекта SafePaws — открытые чертежи домиков и поилок для бездомных кошек.

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Главная страница
│   ├── layout.tsx         # Корневой layout (шрифты, мета-теги)
│   ├── globals.css        # Глобальные стили + CSS-переменные
│   ├── solutions/         # Каталог решений
│   │   ├── page.tsx       # Список всех продуктов
│   │   └── [slug]/        # Детальная страница продукта
│   ├── download/          # Страница загрузки файлов
│   ├── help/              # Как помочь проекту
│   ├── stories/           # Истории пользователей
│   │   └── add/           # Форма добавления истории
│   └── about/             # О проекте
├── components/
│   ├── ui/                # shadcn/ui компоненты
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   └── layout/            # Layout-компоненты
│       ├── Header.tsx     # Навигация (sticky, mobile-friendly)
│       └── Footer.tsx     # Подвал
├── data/
│   └── products.ts        # Данные продуктов (shelters, hydration, feeding)
└── lib/
    └── utils.ts           # Утилиты (cn для tailwind-merge)
```

## Страницы сайта

| Маршрут | Описание |
|---------|----------|
| `/` | Главная — Hero, 3 пути помощи, превью каталога, как это работает, истории |
| `/solutions` | Каталог всех решений (фильтры по категориям) |
| `/solutions/[slug]` | Детальная страница продукта с характеристиками и файлами |
| `/download` | Центральная страница загрузки всех чертежей |
| `/help` | Варианты помощи: собрать, поделиться, задонатить |
| `/stories` | Истории людей, собравших домики |
| `/stories/add` | Форма отправки своей истории |
| `/about` | О проекте, миссия, контакты |

## Архитектура данных

### Продукты (`src/data/products.ts`)

Каждый продукт содержит:
- **slug** — уникальный идентификатор для URL
- **name/tagline** — название и слоган
- **category** — `shelter` | `hydration` | `feeding`
- **status** — `available` | `new` | `coming-soon` | `prototype`
- **specs** — массив характеристик (размер, материал, время сборки)
- **downloads** — файлы для скачивания (варианты материалов)
- **tags** — для фильтрации и SEO

## Дизайн-система

### Цвета (CSS-переменные)

```css
--sp-bg: #FDFBF7        /* paper — фон страницы */
--sp-fg: #1A1917        /* ink — основной текст */
--sp-muted: #6B6862     /* ink-muted — вторичный текст */
--sp-accent: #D97757      /* accent — кнопки, ссылки */
--sp-accent-soft: #FBE8DE /* accent-soft — фоны карточек */
--sp-border: #E8E4DF     /* border-soft — границы */
```

### Типографика

- **Inter** (`--font-inter`) — основной текст, интерфейс
- **Caveat** (`--font-caveat`) — рукописные заголовки (`font-hand`)
- Оба шрифта подключаются с кириллическими подмножествами

### CSS-классы

- `bg-paper` / `text-ink` — базовые цвета
- `font-hand` — рукописный шрифт для заголовков
- `ph` — placeholder для изображений (lo-fi wireframe стиль)

## Команды разработки

```bash
npm install              # Установка зависимостей
npm run dev              # Dev-сервер localhost:3000
npm run build            # Статический экспорт в dist/
```

## Стек

- **Next.js 16.2.4** + **React 19.2.4** — App Router
- **Tailwind CSS v4** — `@tailwindcss/postcss`, без `tailwind.config`
- **shadcn/ui** — стиль `base-nova`, иконки `lucide`
- **Phosphor Icons** — `@phosphor-icons/react`
- **TypeScript** — пути `@/*` → `./src/*`

## Особенности

- **Язык**: весь контент на русском (`lang="ru"`)
- **Статический экспорт**: `output: 'export'` только в production
- **Изображения**: `unoptimized: true` (требуется для static export)
- **Деплой**: Vercel, выходная директория `dist/`
