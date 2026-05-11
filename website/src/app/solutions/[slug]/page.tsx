import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProduct } from "@/data/products";
import { DownloadButton } from "@/components/DownloadButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

const productStories: Record<string, { city: string; quote: string; author: string; date: string }[]> = {
  "cozy-shelter": [
    { city: "Брест", quote: "«Поставили 2 домика»", author: "Паша", date: "11.24" },
    { city: "Варшава", quote: "«Первый опыт сборки»", author: "Катя", date: "01.25" },
    { city: "Минск", quote: "«Домик в подъезде»", author: "Аня", date: "02.25" },
  ],
  "family-shelter": [
    { city: "Гродно", quote: "«Семейная сборка»", author: "Козловские", date: "01.25" },
    { city: "Вильнюс", quote: "«Три домика у парка»", author: "Indrė", date: "12.24" },
    { city: "Минск", quote: "«5 котят пережили зиму»", author: "Лена", date: "04.26" },
  ],
  "purrtap": [
    { city: "Гродно", quote: "«−18°C — не замёрзла»", author: "Настя", date: "01.25" },
    { city: "Гомель", quote: "«За 20 минут»", author: "Коля", date: "03.25" },
    { city: "Варшава", quote: "«Поилка у подъезда»", author: "Марта", date: "02.26" },
  ],
};

const whyChoose: Record<string, { title: string; desc: string }[]> = {
  "cozy-shelter": [
    { title: "✓ В подъезде / на балконе", desc: "Компактный, помещается за дверью." },
    { title: "✓ Первый раз", desc: "Простая сборка, мало деталей." },
    { title: "✓ 1–2 кота рядом", desc: "Больше — бери Family." },
  ],
  "family-shelter": [
    { title: "✓ Колония в 4–5 котов", desc: "Отдельные отсеки для каждого." },
    { title: "✓ Во дворе / у подъезда", desc: "Просторно, легко чистить." },
    { title: "✓ Есть CNC-доступ", desc: "Рекомендуем CNC для точных деталей." },
  ],
  "purrtap": [
    { title: "✓ Нет инструментов", desc: "Только нож и дрель." },
    { title: "✓ Нужна вода, не укрытие", desc: "Просто и быстро — 20 минут." },
    { title: "✓ Маленький бюджет", desc: "Из подручных материалов." },
  ],
};

const assemblySteps = [
  { n: 1, title: "Скачай архив", desc: "DXF + PDF инструкция." },
  { n: 2, title: "Вырежи детали", desc: "Лобзиком или на CNC." },
  { n: 3, title: "Собери в коробку", desc: "Саморезы + клей ПВА." },
  { n: 4, title: "Установи и оформи", desc: "Помести во двор. Расскажи о результате." },
];

const faqs: Record<string, { q: string; a: string }[]> = {
  "cozy-shelter": [
    { q: "Какую фанеру лучше взять — 3 или 6 мм?", a: "6 мм прочнее и теплее. 3 мм — если режешь на маломощном лазере." },
    { q: "Нужна ли пропитка?", a: "Да, любой водоотталкивающей. Подробности в PDF-инструкции." },
    { q: "Коты реально заходят?", a: "Да, см. истории выше. Важно разместить там, где они уже привыкли." },
  ],
  "family-shelter": [
    { q: "Можно без CNC?", a: "Да, но CNC значительно упростит раскрой сложных деталей." },
    { q: "Сколько котов помещается?", a: "4–5 комфортно. До 6–7 — возможно в мороз." },
    { q: "Нужна ли пропитка?", a: "Обязательно — 6 мм фанера впитывает влагу. Любой водоотталкивающий лак." },
  ],
  "purrtap": [
    { q: "Замерзает ли зимой?", a: "Зависит от температуры. До −15 °С работает, ниже — нужен подогрев." },
    { q: "Какую бутылку использовать?", a: "ПЭТ 1.5–2 л. Тёмная лучше — меньше водорослей." },
    { q: "Как часто пополнять?", a: "Раз в 2–3 дня летом, раз в день при морозе." },
  ],
};

const materialCalc: Record<string, { label: string; value: string }[]> = {
  "cozy-shelter": [
    { label: "лист фанеры", value: "1 лист 1525×1525" },
    { label: "саморезы", value: "~ 24 шт" },
    { label: "крепёж", value: "клей ПВА" },
    { label: "доп.", value: "утеплитель (опц.)" },
  ],
  "family-shelter": [
    { label: "лист фанеры", value: "2 листа 1525×1525" },
    { label: "саморезы", value: "~ 48 шт" },
    { label: "крепёж", value: "клей ПВА + уголки" },
    { label: "покрытие", value: "лак водоотталк." },
  ],
  "purrtap": [
    { label: "бутылка", value: "ПЭТ 1.5–2 л" },
    { label: "крепление", value: "хомут + дрель" },
    { label: "поверхность", value: "стена / столб" },
    { label: "время", value: "20 минут" },
  ],
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const currentIndex = products.findIndex((p) => p.slug === slug);
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  const stories = productStories[slug] ?? [];
  const why = whyChoose[slug] ?? [];
  const faq = faqs[slug] ?? [];
  const calc = materialCalc[slug] ?? product.specs;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="font-mono text-xs text-ink-muted mb-8">
        <Link href="/" className="hover:text-accent">главная</Link>
        {" / "}
        <Link href="/solutions" className="hover:text-accent">решения</Link>
        {" / "}
        <span className="text-accent">{product.name.toLowerCase()}</span>
      </div>

      {/* Hero row */}
      <div className="grid lg:grid-cols-2 gap-10 items-start mb-14">
        {/* Gallery */}
        <div>
          <div className="ph min-h-[340px] mb-3">
            {product.name} · главное фото / 3D
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["1", "2", "3", "схема"].map((n) => (
              <div key={n} className="ph min-h-[70px] text-sm">{n}</div>
            ))}
          </div>
        </div>

        {/* Info + Actions */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <StatusBadge status={product.status} />
            <span className="px-2 py-0.5 rounded-full border border-border-soft text-xs text-ink-muted">
              {product.category === "shelter" ? "укрытие" : product.category === "hydration" ? "поение" : "кормление"}
            </span>
            <span className="px-2 py-0.5 rounded-full border border-border-soft text-xs text-ink-muted">open source</span>
          </div>

          <h1 className="heading-display mb-2">{product.name}</h1>
          <p className="heading-card text-xl mb-4" style={{ color: "var(--sp-accent)" }}>
            {product.tagline}
          </p>
          <p className="text-sm text-ink-muted leading-relaxed mb-6">{product.description}</p>

          {/* Specs 2×2 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {product.specs.map(({ label, value }) => (
              <div key={label} className="border border-border-soft rounded-lg p-3">
                <span className="font-mono text-xs text-ink-muted block mb-1">{label}</span>
                <strong className="text-sm text-ink">{value}</strong>
              </div>
            ))}
          </div>

          {/* Download panel */}
          {product.downloads.length > 0 ? (
            <div className="bg-accent-soft border border-accent/20 rounded-xl p-5">
              <span className="font-mono text-xs text-ink-muted block mb-3">выбери материал:</span>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.downloads.map((d) => (
                  <span
                    key={d.variant}
                    className={`px-3 py-1 rounded-full border text-xs cursor-pointer ${
                      d.recommended ? "border-accent bg-accent text-white" : "border-border-soft text-ink-muted hover:border-accent/40"
                    }`}
                  >
                    {d.label}{d.recommended ? " · рекомендовано" : ""}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {product.downloads.filter((d) => d.recommended).map((d) => (
                  <DownloadButton
                    key={d.variant}
                    href={d.file}
                    productSlug={slug}
                  />
                ))}
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-paper transition-colors"
                >
                  посмотреть пример инструкции
                </Link>
              </div>
              <p className="text-xs text-ink-muted mt-3">{product.downloads[0]?.size} · CC BY 4.0</p>
            </div>
          ) : (
            <div className="bg-[#F5F1EB] border border-border-soft rounded-xl p-5 text-center">
              <p className="heading-card text-xl text-ink-muted mb-2">Скоро в каталоге</p>
              <p className="text-sm text-ink-muted">Следи за обновлениями в Telegram</p>
            </div>
          )}

          {/* Secondary actions */}
          {nextProduct && (
            <div className="flex gap-2 mt-4">
              <Link
                href={`/solutions/${nextProduct.slug}`}
                className="px-4 py-1.5 rounded-lg border border-border-soft text-xs text-ink hover:border-accent/40 hover:text-accent transition-colors"
              >
                Сравнить с {nextProduct.name} →
              </Link>
              <button className="px-4 py-1.5 rounded-lg border border-border-soft text-xs text-ink-muted hover:border-accent/40 transition-colors">
                Поделиться
              </button>
            </div>
          )}
        </div>
      </div>

      {/* WHEN TO CHOOSE */}
      {why.length > 0 && (
        <div className="mb-14">
          <h2 className="heading-sub mb-6">Когда выбрать {product.name}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {why.map(({ title, desc }) => (
              <div key={title} className="border border-border-soft rounded-xl p-5">
                <strong className="text-sm text-ink block mb-2">{title}</strong>
                <p className="text-xs text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ASSEMBLY — 4 steps grid */}
      <div className="mb-14">
        <h2 className="heading-sub mb-6">За 4 шага</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {assemblySteps.map(({ n, title, desc }) => (
            <div key={n} className="border border-border-soft rounded-xl p-5">
              <span className="w-8 h-8 rounded-full border-2 border-accent text-accent font-mono text-sm flex items-center justify-center font-medium mb-3">
                {n}
              </span>
              <h4 className="heading-card text-xl mb-2">{title}</h4>
              <div className="ph mb-3" style={{ minHeight: "70px" }}>пик</div>
              <p className="text-xs text-ink-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MATERIAL CALC */}
      <div className="mb-14 bg-[#F5F1EB] border border-border-soft rounded-2xl p-8">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-4">калькулятор материалов</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {calc.map(({ label, value }) => (
            <div key={label}>
              <span className="font-mono text-xs text-ink-muted block mb-1">{label}</span>
              <p className="heading-card text-xl">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STORIES WITH PRODUCT */}
      {stories.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-sub">Кто уже собрал {product.name}</h2>
            <Link href="/stories" className="link-script hidden sm:block hover:underline">
              все истории →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {stories.map(({ city, quote, author, date }) => (
              <div key={city} className="border border-border-soft rounded-xl overflow-hidden">
                <div className="ph min-h-[140px] rounded-none border-0 border-b border-dashed border-border-soft">
                  {city}
                </div>
                <div className="p-4">
                  <strong className="heading-quote block mb-1">{quote}</strong>
                  <p className="text-xs text-ink-muted">{author}, {date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <div className="mb-14">
          <h2 className="heading-sub mb-6">Частые вопросы</h2>
          <div className="space-y-3">
            {faq.map(({ q, a }) => (
              <div key={q} className="border border-border-soft rounded-xl p-5">
                <strong className="text-sm text-ink block mb-2">{q}</strong>
                <p className="text-xs text-ink-muted">{a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PREV / NEXT */}
      <div className="flex justify-between mt-4">
        {prevProduct ? (
          <Link
            href={`/solutions/${prevProduct.slug}`}
            className="px-4 py-2.5 rounded-lg border border-border-soft text-sm text-ink-muted hover:border-accent/40 hover:text-accent transition-colors"
          >
            ← {prevProduct.name}
          </Link>
        ) : (
          <div />
        )}
        {nextProduct ? (
          <Link
            href={`/solutions/${nextProduct.slug}`}
            className="px-4 py-2.5 rounded-lg border border-border-soft text-sm text-ink-muted hover:border-accent/40 hover:text-accent transition-colors"
          >
            {nextProduct.name} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    available: "готов",
    new: "NEW",
    "coming-soon": "скоро",
    prototype: "прототип",
  };
  const colors: Record<string, string> = {
    available: "border-green-300 text-green-700 bg-green-50",
    new: "border-accent/40 text-accent bg-accent-soft",
    "coming-soon": "border-border-soft text-ink-muted",
    prototype: "border-border-soft text-ink-muted",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-xs ${colors[status] ?? colors["coming-soon"]}`}>
      {labels[status] ?? status}
    </span>
  );
}
