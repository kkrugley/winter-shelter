# SafePaws Website — Agent Instructions

## Project Overview

SafePaws is an open-source social project helping homeless animals. This is a **complete rebuild** of the website, not an incremental update. The goal is to shift focus from "downloading blueprints" to "helping animals".

**Current site:** Static HTML/Bootstrap at `safepaws.vercel.app`
**New site:** Next.js 14 + TypeScript + Tailwind with SSG export

---

## Development Workflow

### Strategy: Parallel Development

We build the new site **alongside** the existing one, not in-place. This ensures zero downtime and safe rollback.

```
winter-shelter/
├── website/                    # [LEGACY] Current site (DO NOT TOUCH)
│   ├── index.html
│   ├── css/
│   └── ...
├── website-new/                # [NEW] Next.js project (WORK HERE)
│   ├── app/
│   ├── components/
│   └── ...
├── CLAUDE.md                   # This file
└── ...
```

### Phase 1: Build (Current)
- Create `website-new/` directory
- Initialize Next.js project with all dependencies
- Build new components and pages
- Copy and migrate content from `website/`
- Test locally at `localhost:3000`

### Phase 2: Migrate Content
- Move downloadable files: `website/files/` → `website-new/public/files/`
- Migrate images: `website/images/` → `website-new/public/images/`
- Convert translations: `website/*/translations.js` → `website-new/lib/i18n/messages/*.json`
- Create MDX files for products and stories

### Phase 3: Deploy & Verify
- Build static export from `website-new/`
- Deploy to Vercel (separate preview URL)
- Verify all functionality works
- Update DNS/domain to point to new deployment

### Phase 4: Cleanup (After successful deploy)
- Archive `website/` to `website-old/` (backup)
- Or delete if confident
- Rename `website-new/` → `website/` (optional)

### Why This Approach?

| Approach | Risk | Our Choice |
|----------|------|------------|
| Delete & Rewrite | High - no rollback | ❌ |
| In-place Edit | Medium - breaks existing | ❌ |
| **Parallel Build** | **Low - safe fallback** | **✅** |

**Golden Rule:** Never modify files in `./website/` during development. Treat it as read-only reference.

---

## Core Philosophy

### "Help animals first, blueprints second"

Every page must answer:
1. What problem are we solving? (Homeless animals in cold weather)
2. What solutions exist? (Shelters, PurrTap, future products)
3. How can user help? (Build, share, donate, notify)

**Golden rule:** A visitor should understand they can help animals within 5 seconds of landing.

---

## Technology Stack

### Required (Free tier)

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 14 (App Router) | SSG, i18n routing, image optimization |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first, responsive |
| Components | shadcn/ui | Accessible, consistent UI |
| Icons | Lucide React | Lightweight, tree-shakeable |
| Animation | Framer Motion | Page transitions, storytelling |
| i18n | next-intl | Internationalization |
| Content | MDX + gray-matter | Product pages, stories |
| Hosting | Vercel | Static export, free tier |

### Forbidden

- ❌ Bootstrap (migrate away from current)
- ❌ jQuery or vanilla JS manipulation
- ❌ Manual HTML translation files
- ❌ Inline styles or CSS-in-JS libraries (use Tailwind only)
- ❌ Client-side routing for content (use Next.js App Router)

---

## Project Structure

```
safepaws-website/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # i18n: ru, en, be, pl
│   │   ├── page.tsx              # Home (mission-focused)
│   │   ├── layout.tsx            # Language-specific layout
│   │   ├── solutions/
│   │   │   ├── page.tsx          # Product catalog
│   │   │   └── [slug]/page.tsx   # Individual product
│   │   ├── help/
│   │   │   └── page.tsx          # Ways to help (build, share, donate)
│   │   ├── stories/
│   │   │   └── page.tsx          # Success stories + map
│   │   └── about/
│   │       └── page.tsx          # Mission, author, stats
│   ├── api/                      # Static generation helpers
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # Robots.txt
├── components/
│   ├── ui/                       # shadcn components (CLI-generated)
│   ├── layout/
│   │   ├── Header.tsx            # Navigation with language switcher
│   │   ├── Footer.tsx            # Links, social, copyright
│   │   └── LanguageSwitcher.tsx  # next-intl implementation
│   ├── sections/
│   │   ├── Hero.tsx              # Problem statement + CTA
│   │   ├── SolutionsGrid.tsx     # Product cards
│   │   ├── ProductCard.tsx       # Individual product preview
│   │   ├── StoriesSection.tsx    # Testimonials carousel
│   │   ├── ImpactStats.tsx       # Numbers (shelters built, cities)
│   │   └── CTABanner.tsx         # Call-to-action blocks
│   └── providers/
│       └── I18nProvider.tsx      # next-intl wrapper
├── content/
│   ├── products/                 # MDX files for products
│   │   ├── cozy-shelter.mdx
│   │   ├── family-shelter.mdx
│   │   ├── purrtap.mdx
│   │   └── edc-feeder.mdx        # Future product example
│   └── stories/                  # MDX success stories
│       ├── brest-barsik.mdx
│       ├── grodno-murka.mdx
│       └── minsk-vasya.mdx
├── lib/
│   ├── i18n/
│   │   ├── config.ts             # next-intl configuration
│   │   ├── messages/             # Translation JSONs
│   │   │   ├── ru.json
│   │   │   ├── en.json
│   │   │   ├── be.json
│   │   │   └── pl.json
│   │   └── routing.ts            # Locale-based routing
│   ├── products.ts               # Product data loader
│   └── utils.ts                  # Helper functions
├── public/
│   ├── files/                    # Downloadable files
│   │   ├── cozy-shelter/
│   │   │   ├── 3mm.zip
│   │   │   └── 6mm.zip
│   │   ├── family-shelter/
│   │   │   ├── 3mm.zip
│   │   │   └── 6mm.zip
│   │   └── manuals/
│   │       └── assembly-guide.pdf
│   └── images/
│       ├── products/             # Product photos
│       ├── stories/              # Real shelter photos
│       ├── banner/               # Hero images
│       └── favicon/              # All favicon variants
├── types/
│   └── index.ts                  # TypeScript interfaces
├── next.config.js                # Static export config
├── tailwind.config.ts
└── package.json
```

---

## Content Architecture

### Products (MDX Frontmatter)

Each product is an MDX file with structured frontmatter:

```yaml
---
slug: "cozy-shelter"
category: "shelter"  # shelter | hydration | portable
status: "available"  # available | coming-soon | deprecated
name:
  ru: "Уютный домик"
  en: "Cozy Shelter"
  be: "Утульны домік"
  pl: "Przytulny domek"
description:
  ru: "Тёплый дом для 1-2 котов"
  en: "Warm shelter for 1-2 cats"
capacity: "1-2 cats"
materials:
  - type: "plywood"
    thickness: "6mm"
    sheets: 2
    alternative: "3mm"
features:
  - "double-walls"
  - "l-vestibule"
  - "insulated"
downloads:
  - variant: "6mm"
    file: "/files/cozy-shelter/6mm.zip"
    size: "2.4MB"
  - variant: "3mm"
    file: "/files/cozy-shelter/3mm.zip"
    size: "2.1MB"
images:
  hero: "/images/products/cozy-hero.jpg"
  thumbnail: "/images/products/cozy-thumb.jpg"
  gallery:
    - "/images/products/cozy-1.jpg"
    - "/images/products/cozy-2.jpg"
---

# Product content here
## Why cats love it
...storytelling content...
```

### Stories (MDX Frontmatter)

```yaml
---
location:
  city: "Брест"
  city_en: "Brest"
  coordinates: [52.0976, 23.7341]
installDate: "2024-12"
residents:
  - name: "Барсик"
    type: "cat"
    description: "Рыжий кот, живёт здесь с декабря"
images:
  - "/images/stories/brest-1.jpg"
  - "/images/stories/brest-2.jpg"
---

Story content here...
```

---

## Key Implementation Rules

### 1. Internationalization (next-intl)

**Default locale:** `ru` (Russian)
**Supported locales:** `ru`, `en`, `be`, `pl`

```typescript
// app/[lang]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';

export default async function LocaleLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const messages = (await import(`@/lib/i18n/messages/${lang}.json`)).default;

  return (
    <html lang={lang}>
      <NextIntlClientProvider messages={messages} locale={lang}>
        {children}
      </NextIntlClientProvider>
    </html>
  );
}
```

**Translation keys convention:**
```json
{
  "Home": {
    "Hero": {
      "title": "Собери дом для тех, у кого его нет",
      "subtitle": "Каждый домик — это шанс на жизнь..."
    },
    "Solutions": {
      "title": "Как ты можешь помочь",
      "shelterCard": "Собрать домик",
      "purrTapCard": "Установить поилку"
    }
  },
  "Products": {
    "CozyShelter": {
      "name": "Уютный домик",
      "description": "..."
    }
  }
}
```

### 2. Static Export Configuration

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true, // Required for static export
  },
  i18n: {
    locales: ['ru', 'en', 'be', 'pl'],
    defaultLocale: 'ru',
  },
};

module.exports = nextConfig;
```

### 3. Product Data Loading

```typescript
// lib/products.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Product {
  slug: string;
  category: 'shelter' | 'hydration' | 'portable';
  status: 'available' | 'coming-soon' | 'deprecated';
  name: Record<string, string>;
  // ... other fields
}

export async function getProducts(): Promise<Product[]> {
  const productsDir = path.join(process.cwd(), 'content/products');
  const files = fs.readdirSync(productsDir);

  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const content = fs.readFileSync(path.join(productsDir, file), 'utf8');
      const { data } = matter(content);
      return data as Product;
    })
    .filter((p) => p.status !== 'deprecated');
}
```

### 4. Component Patterns

**Product Card:**
```tsx
// components/sections/ProductCard.tsx
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations('Products');

  return (
    <Card className="group overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={product.images.thumbnail}
          alt={product.name[locale]}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{product.name[locale]}</CardTitle>
        <CardDescription>{product.description[locale]}</CardDescription>
        {product.status === 'coming-soon' && (
          <span className="text-sm text-muted-foreground">
            {t('comingSoon')}
          </span>
        )}
      </CardHeader>
      {/* Actions */}
    </Card>
  );
}
```

### 5. Download Handler

```tsx
// app/[lang]/download/[...path]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const filePath = path.join(process.cwd(), 'public/files', ...params.path);

  if (!filePath.startsWith(path.join(process.cwd(), 'public/files'))) {
    return new Response('Forbidden', { status: 403 });
  }

  const file = fs.readFileSync(filePath);
  const filename = path.basename(filePath);

  return new Response(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'application/zip',
    },
  });
}
```

---

## Design System (Tailwind)

### Colors

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      // Primary - warm orange (care, warmth)
      primary: {
        DEFAULT: '#F97316',
        50: '#FFF7ED',
        100: '#FFEDD5',
        500: '#F97316',
        600: '#EA580C',
        900: '#7C2D12',
      },
      // Secondary - calm blue (trust, winter)
      secondary: {
        DEFAULT: '#3B82F6',
        50: '#EFF6FF',
        500: '#3B82F6',
        900: '#1E3A8A',
      },
      // Semantic
      success: '#22C55E',
      warning: '#EAB308',
      danger: '#EF4444',
    },
  },
}
```

### Typography

```typescript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

### Spacing (Sections)

- Section padding: `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card grid: `grid gap-6 md:grid-cols-2 lg:grid-cols-3`

---

## Migration Guide

### From Old Site

| Old Element | New Location | Notes |
|-------------|--------------|-------|
| `index.html` hero | `app/[lang]/page.tsx` + `sections/Hero.tsx` | Keep emotional copy |
| `download/index.html` | `app/[lang]/solutions/page.tsx` | Add product grid |
| `learn-more/index.html` | `content/products/*.mdx` | Split into product pages |
| `about/index.html` | `app/[lang]/about/page.tsx` | Keep personal touch |
| Translations (4 files) | `lib/i18n/messages/*.json` | Consolidate keys |
| Downloadable files | `public/files/` | Keep paths for SEO |
| Images | `public/images/` | Optimize to WebP |

### Content Migration Checklist

1. [ ] Copy all downloadable files to `public/files/`
2. [ ] Convert product descriptions to MDX
3. [ ] Migrate translations to JSON format
4. [ ] Optimize images (compress, convert to WebP)
5. [ ] Update story content with frontmatter
6. [ ] Test all download links
7. [ ] Verify i18n for all 4 languages

---

## SEO Requirements

### Meta Tags (per page)

```tsx
// app/[lang]/solutions/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const product = await getProduct(slug);

  return {
    title: product.name[lang],
    description: product.description[lang],
    openGraph: {
      title: product.name[lang],
      description: product.description[lang],
      images: [{ url: product.images.hero }],
    },
  };
}
```

### Required Meta

- Language-specific titles
- OG images (1200x630)
- Twitter cards
- Structured data (JSON-LD) for products
- Canonical URLs with hreflang

---

## Testing Requirements

### Before Commit

0. [ ] `npm run lint` passes
1. [ ] `npm run build` passes
2. [ ] Static export completes
3. [ ] All images load in `dist/` folder
4. [ ] Download links work
5. [ ] Language switching preserves route
6. [ ] Mobile view tested (dev tools)
7. [ ] Lighthouse score > 90

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Performance: > 90
- Accessibility: 100

---

## Deployment

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### Environment Variables

None required for basic build. Optional:
- `ANALYTICS_ID` - for analytics (privacy-friendly)

---

## Common Tasks

### Add New Product

1. Create `content/products/[slug].mdx` with frontmatter
2. Add translations to all 4 JSON files
3. Upload product images to `public/images/products/`
4. Add downloadable files to `public/files/[slug]/`
5. Test at `/[lang]/solutions/[slug]`

### Add New Language

1. Create `lib/i18n/messages/[lang].json`
2. Add locale to `next.config.js`
3. Update `lib/i18n/config.ts`
4. Translate all product MDX frontmatters

### Update Content

- Product details: Edit MDX files
- UI text: Edit JSON translation files
- Stories: Add MDX files to `content/stories/`

---

## Anti-Patterns (Forbidden)

1. ❌ **Don't** use `dangerouslySetInnerHTML` for user content
2. ❌ **Don't** add new vanilla JS files
3. ❌ **Don't** use `useEffect` for data loading (use Server Components)
4. ❌ **Don't** hardcode paths - use constants from `lib/config.ts`
5. ❌ **Don't** store secrets in code (use env vars)
6. ❌ **Don't** add client-side state management (use URL params)
7. ❌ **Don't** use external fonts without fallbacks

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build           # Build for production
npm run export          # Static export to `dist/`

# Code quality
npm run lint            # ESLint
npm run type-check      # TypeScript

# shadcn components
npx shadcn add button   # Add new component
npx shadcn add card
```

---

## Resources

- **Design reference:** Current site at safepaws.vercel.app
- **Assets:** Original images in `website/images/`
- **Content:** Original translations in `website/*/translations.js`
- **Product data:** Open Collective safepawsorganization

---

## Contact

Project author: Pavel Kruhlei
GitHub: kkrugley/winter-shelter

---

*Last updated: 2026-03-23*
*CLAUDE.md version: 1.0*
