import { notFound } from "next/navigation";
import Link from "next/link";
import { DownloadSimple, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { products, getProduct } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="font-mono text-xs text-ink-muted mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-accent">главная</Link>
        {" / "}
        <Link href="/solutions" className="hover:text-accent">решения</Link>
        {" / "}
        <span className="text-accent">{product.name.toLowerCase()}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Gallery */}
        <div>
          <div className="ph min-h-[340px] mb-3">
            {product.name} · главное фото / 3D
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["1", "2", "3", "схема"].map((n) => (
              <div key={n} className="ph min-h-[70px] text-sm">
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Info + Actions */}
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <StatusBadge status={product.status} />
            <span className="px-2 py-0.5 rounded-full border border-border-soft text-xs text-ink-muted">
              {product.category === "shelter"
                ? "укрытие"
                : product.category === "hydration"
                ? "поение"
                : "кормление"}
            </span>
            <span className="px-2 py-0.5 rounded-full border border-border-soft text-xs text-ink-muted">
              open source
            </span>
          </div>

          <h1 className="font-hand text-5xl text-ink mb-2">{product.name}</h1>
          <p
            className="font-hand text-xl mb-4"
            style={{ color: "var(--sp-accent)" }}
          >
            {product.tagline}
          </p>
          <p className="text-sm text-ink-muted leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Specs 2×2 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {product.specs.map(({ label, value }) => (
              <div
                key={label}
                className="border border-border-soft rounded-lg p-3"
              >
                <span className="font-mono text-xs text-ink-muted block mb-1">
                  {label}
                </span>
                <strong className="text-sm text-ink">{value}</strong>
              </div>
            ))}
          </div>

          {/* Download panel */}
          {product.downloads.length > 0 ? (
            <div className="bg-accent-soft border border-accent/20 rounded-xl p-5">
              <span className="font-mono text-xs text-ink-muted block mb-3">
                выбери материал:
              </span>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.downloads.map((d) => (
                  <span
                    key={d.variant}
                    className={`px-3 py-1 rounded-full border text-xs ${
                      d.recommended
                        ? "border-accent bg-accent text-white"
                        : "border-border-soft text-ink-muted"
                    }`}
                  >
                    {d.label}
                    {d.recommended ? " · рекомендовано" : ""}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {product.downloads
                  .filter((d) => d.recommended)
                  .map((d) => (
                    <a
                      key={d.variant}
                      href={d.file}
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors"
                    >
                      <DownloadSimple size={16} weight="bold" />
                      Скачать DXF + PDF
                    </a>
                  ))}
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-paper transition-colors"
                >
                  посмотреть все форматы
                </Link>
              </div>
              <p className="text-xs text-ink-muted mt-3">
                {product.downloads[0]?.size} · CC BY 4.0
              </p>
            </div>
          ) : (
            <div className="bg-[#F5F1EB] border border-border-soft rounded-xl p-5 text-center">
              <p className="font-hand text-xl text-ink-muted mb-2">
                Скоро в каталоге
              </p>
              <p className="text-sm text-ink-muted">
                Следи за обновлениями в Telegram
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Assembly steps placeholder */}
      <div className="mt-14">
        <h2 className="font-hand text-3xl text-ink mb-6">
          Инструкция по сборке
        </h2>
        <div className="space-y-3">
          {["Подготовка материала", "Раскрой по чертежу", "Сборка корпуса", "Финальная отделка"].map(
            (step, i) => (
              <details
                key={step}
                className="border border-border-soft rounded-lg overflow-hidden group"
              >
                <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-[#F5F1EB] transition-colors">
                  <span className="w-6 h-6 rounded-full bg-accent-soft border border-accent/30 text-accent text-xs font-mono flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-ink">{step}</span>
                </summary>
                <div className="px-5 pb-5 pt-2">
                  <div className="ph min-h-[100px] text-sm">
                    иллюстрация · шаг {i + 1}
                  </div>
                  <p className="text-sm text-ink-muted mt-3">
                    Описание шага появится здесь.
                  </p>
                </div>
              </details>
            )
          )}
        </div>
      </div>

      {/* Back */}
      <div className="mt-10">
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Все решения
        </Link>
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
    <span
      className={`px-2 py-0.5 rounded-full border text-xs ${colors[status] ?? colors["coming-soon"]}`}
    >
      {labels[status] ?? status}
    </span>
  );
}
