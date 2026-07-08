import type { Metadata } from "next";
import Link from "next/link";
import { pageAlternates } from "@/lib/metadata";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Отчёт расходов",
  alternates: pageAlternates("/help/spendings"),
};

export default function SpendingsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/help">Как помочь</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Отчёт расходов</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-3">Куда идут пожертвования</h1>
      <p className="text-base max-w-[560px] mb-10" style={{ color: "var(--stone)" }}>
        Подзаголовок
      </p>

      <div
        className="rounded-xl p-8 text-center mb-10"
        style={{ background: "#F5F1EB", border: "1px solid var(--sand)" }}
      >
        <p className="heading-card text-xl text-ink-muted mb-1">Скоро здесь появятся отчёты</p>
        <p className="text-sm text-ink-muted">На данный момент данные отстуствуют. Раздел находится в разработке.</p>
      </div>

      <Link
        href="/help"
        className="inline-flex items-center px-5 py-2.5 rounded-full border text-sm font-medium transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
        style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
      >
        Другие способы помочь →
      </Link>
    </div>
  );
}
