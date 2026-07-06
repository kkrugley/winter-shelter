# SafePaws Website

The SafePaws project website — open-source blueprints for outdoor cat shelters and water stations.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout (fonts, meta tags)
│   ├── globals.css        # Global styles + CSS variables
│   ├── solutions/         # Solutions catalog
│   │   ├── page.tsx       # All products listing
│   │   └── [slug]/        # Product detail page
│   ├── download/          # File download page
│   ├── help/              # How to help the project
│   ├── stories/           # User stories
│   │   └── add/           # Story submission form
│   └── about/             # About the project
├── components/
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   └── layout/            # Layout components
│       ├── Header.tsx     # Navigation (sticky, mobile-friendly)
│       └── Footer.tsx     # Footer
├── data/
│   └── products.ts        # Product data (shelters, hydration, feeding)
└── lib/
    └── utils.ts           # Utilities (cn for tailwind-merge)
```

## Site Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, 3 ways to help, catalog preview, how it works, stories |
| `/solutions` | Solutions catalog (category filters) |
| `/solutions/[slug]` | Product detail page with specs and files |
| `/download` | Central page for downloading all blueprints |
| `/help` | Ways to help: build, share, donate |
| `/stories` | Stories from people who built shelters |
| `/stories/add` | Story submission form |
| `/about` | About the project, mission, contacts |

## Data Architecture

### Products (`src/data/products.ts`)

Each product contains:
- **slug** — unique identifier for URL
- **name/tagline** — name and tagline
- **category** — `shelter` | `hydration` | `feeding`
- **status** — `available` | `new` | `coming-soon` | `prototype`
- **specs** — array of specifications (size, material, assembly time)
- **downloads** — downloadable files (material variants)
- **tags** — filtering and SEO

## Design System

### Colors (CSS Variables)

```css
--sp-bg: #FDFBF7        /* paper — page background */
--sp-fg: #1A1917        /* ink — main text */
--sp-muted: #6B6862     /* ink-muted — secondary text */
--sp-accent: #D97757      /* accent — buttons, links */
--sp-accent-soft: #FBE8DE /* accent-soft — card backgrounds */
--sp-border: #E8E4DF     /* border-soft — borders */
```

### Typography

- **Lora** (`--font-lora`) — heading font
- **Inter** (`--font-inter`) — body text, interface
- **Caveat** (`--font-caveat`) — handwritten headings (`font-hand`)
- Fonts include Cyrillic subsets

### CSS Classes

- `bg-paper` / `text-ink` — base colors
- `font-hand` — handwritten heading font
- `ph` — image placeholder (lo-fi wireframe style)

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server localhost:3000
npm run build            # Static export to dist/
```

## Stack

- **Next.js 16.2.4** + **React 19.2.4** — App Router
- **Tailwind CSS v4** — `@tailwindcss/postcss`, no `tailwind.config`
- **shadcn/ui** — `base-nova` style, `lucide` icons
- **Phosphor Icons** — `@phosphor-icons/react`
- **TypeScript** — paths `@/*` → `./src/*`

## Notes

- **Language**: all text-based content is defined via dictionaries in `messages/[language-code].json`
- **Static export**: `output: 'export'` in production only
- **Images**: `unoptimized: true` (required for static export)
- **Deploy**: Vercel, output directory `dist/`
