# SafePaws Website Agent Guide

## Stack & Versions (Non-Standard)

- **Next.js 16.2.4** + **React 19.2.4** — Read `node_modules/next/dist/docs/` if uncertain. APIs differ from standard Next.js.
- **Tailwind CSS v4** — Uses `@tailwindcss/postcss`, no `tailwind.config` file
- **shadcn/ui** — `"style": "base-nova"` with lucide icons
- **TypeScript 5** — Path alias `@/*` maps to `./src/*`

## Development Commands

```bash
npm install
npm run dev    # localhost:3000 (standard Next.js dev server)
npm run build  # Static export to `dist/` (production only)
```

**No test or lint scripts** defined — add only if needed.

## Build Configuration

- **Conditional export**: `output: 'export'` only applies in production (`NODE_ENV === 'production'`). Dev mode runs standard Next.js server with hot reload.
- **Images**: Always `unoptimized: true` (required for static export)
- **Vercel config**: `vercel.json` specifies `outputDirectory: "dist"`

## Code Conventions

- **Language**: All pages use Russian content (`lang="ru"` in layout)
- **Fonts**: Inter + Caveat with Cyrillic subsets (`subsets: ["latin", "cyrillic"]`)
- **Theming**: CSS variables in `globals.css` — `--font-inter`, `--font-caveat`, `bg-paper`, `text-ink`
- **Components**: shadcn/ui pattern in `src/components/ui/`

## Important Paths

| Alias | Maps to |
|-------|---------|
| `@/*` | `./src/*` |
| `@/components` | `./src/components` |
| `@/lib/utils` | `./src/lib/utils` |

## Critical Notes

- Always check `node_modules/next/dist/docs/` for current APIs — this is Next.js 16 with breaking changes from training data
- Tailwind v4 has no config file; styling done via CSS imports
