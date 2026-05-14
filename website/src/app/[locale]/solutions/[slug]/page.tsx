import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products, getProduct } from "@/data/products";
import { filterStories } from "@/lib/stories";
import { StoryCard } from "@/components/ui/StoryCard";
import { DownloadButton } from "@/components/DownloadButton";
import { ProductGallery } from "@/components/ProductGallery";
import { StepCard } from "@/components/StepCard";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

interface TranslatedWhyItem { title: string; desc: string }
interface TranslatedStep { n: number; title: string; desc: string }
interface TranslatedFaq { q: string; a: string }
interface TranslatedCalcItem { label: string; value: string }
interface TranslatedSpec { label: string; value: string }
interface TranslatedProduct {
  description: string;
  subtitle: string;
  capacity: string;
  specs: TranslatedSpec[];
  downloads: Record<string, string>;
  whyChoose: TranslatedWhyItem[];
  assemblySteps: TranslatedStep[];
  faqs: TranslatedFaq[];
  materialCalc: TranslatedCalcItem[];
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "ProductSlug" });
  const tProducts = await getTranslations({ locale, namespace: "Products" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  const product = getProduct(slug);
  if (!product) notFound();

  const pT = tProducts.raw(slug) as TranslatedProduct;

  const currentIndex = products.findIndex((p) => p.slug === slug);
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  const stories = await filterStories({ product_slug: slug });
  const why = pT.whyChoose ?? [];
  const faq = pT.faqs ?? [];
  const calc = pT.materialCalc ?? pT.specs ?? [];
  const steps = pT.assemblySteps ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{tCommon("breadHome")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/solutions">{t("breadSolutions")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-2 gap-10 items-start mb-14">
        <ProductGallery images={product.images} productName={product.name} slug={product.slug} />

        <div>
          <h1 className="heading-display mb-2">{product.name}</h1>
          <p className="text-sm text-ink-muted leading-relaxed mb-6">{pT.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {pT.specs.map(({ label, value }) => (
              <div key={label} className="border border-border-soft rounded-lg p-3">
                <span className="font-mono text-xs text-ink-muted block mb-1">{label}</span>
                <strong className="text-sm text-ink">{value}</strong>
              </div>
            ))}
          </div>

          {product.downloads.length > 0 ? (
            <div className="bg-accent-soft border border-accent/20 rounded-xl p-5">
              <span className="font-mono text-xs text-ink-muted block mb-3">{t("chooseVariant")}</span>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.downloads.map((d) => (
                  <span
                    key={d.variant}
                    className={`px-3 py-1 rounded-full border text-xs cursor-pointer ${
                      d.recommended ? "border-accent bg-accent text-white" : "border-border-soft text-ink-muted hover:border-accent/40"
                    }`}
                  >
                    {pT.downloads?.[d.variant] ?? d.label}{d.recommended ? t("recommended") : ""}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {product.downloads.filter((d) => d.recommended).map((d) => (
                  <DownloadButton key={d.variant} href={d.file} productSlug={slug} />
                ))}
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-soft text-ink text-sm hover:bg-paper transition-colors"
                >
                  {t("viewInstructions")}
                </Link>
              </div>
              <p className="text-xs text-ink-muted mt-3">{product.downloads[0]?.size} · CC BY 4.0</p>
            </div>
          ) : (
            <div className="bg-[#F5F1EB] border border-border-soft rounded-xl p-5 text-center">
              <p className="heading-card text-xl text-ink-muted mb-2">{t("comingSoon")}</p>
              <p className="text-sm text-ink-muted">{t("comingSoonDesc")}</p>
            </div>
          )}

          {nextProduct && (
            <div className="flex gap-2 mt-4">
              <Link
                href={`/solutions/${nextProduct.slug}`}
                className="px-4 py-1.5 rounded-lg border border-border-soft text-xs text-ink hover:border-accent/40 hover:text-accent transition-colors"
              >
                {t("compareTo")} {nextProduct.name} →
              </Link>
              <button className="px-4 py-1.5 rounded-lg border border-border-soft text-xs text-ink-muted hover:border-accent/40 transition-colors">
                {t("share")}
              </button>
            </div>
          )}
        </div>
      </div>

      {why.length > 0 && (
        <div className="mb-14">
          <h2 className="heading-sub mb-6">{t("whenToChooseHeading")} {product.name}</h2>
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

      {steps.length > 0 && (
        <div className="mb-14">
          <h2 className="heading-sub mb-6">{t("assemblyHeading")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ n, title, desc }) => (
              <StepCard key={n} n={n} title={title} desc={desc} image={`/images/products/${slug}/steps/step-${n}.jpg`} slug={slug} />
            ))}
          </div>
        </div>
      )}

      <div className="mb-14 bg-[#F5F1EB] border border-border-soft rounded-2xl p-8">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted block mb-4">{t("materialCalcLabel")}</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {calc.map(({ label, value }) => (
            <div key={label}>
              <span className="font-mono text-xs text-ink-muted block mb-1">{label}</span>
              <p className="heading-card text-xl">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {stories.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-sub">{t("storiesWithHeading")} {product.name}</h2>
            <Link href="/stories" className="link-script hidden sm:block hover:underline">
              {t("storiesAll")}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {stories.map((s) => (
              <StoryCard key={s.id} {...s} />
            ))}
          </div>
        </div>
      )}

      {faq.length > 0 && (
        <div className="mb-14">
          <h2 className="heading-sub mb-6">{t("faqHeading")}</h2>
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

      <div className="flex justify-between mt-4">
        {prevProduct ? (
          <Link href={`/solutions/${prevProduct.slug}`} className="px-4 py-2.5 rounded-lg border border-border-soft text-sm text-ink-muted hover:border-accent/40 hover:text-accent transition-colors">
            ← {prevProduct.name}
          </Link>
        ) : (
          <div />
        )}
        {nextProduct ? (
          <Link href={`/solutions/${nextProduct.slug}`} className="px-4 py-2.5 rounded-lg border border-border-soft text-sm text-ink-muted hover:border-accent/40 hover:text-accent transition-colors">
            {nextProduct.name} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
