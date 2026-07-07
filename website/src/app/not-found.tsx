import Link from "next/link";
import { MascotLottie } from "@/components/MascotLottie";

export default function NotFound() {
  return (
    <>
      {/* Mobile: wooden sign at the top, flush with header */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/general/sign-404.svg"
        alt="404"
        className="sm:hidden block w-full"
      />

      <section className="flex items-end max-w-5xl mx-auto px-6 sm:min-h-[calc(100svh-12rem)] overflow-hidden">
        <div className="flex-1 pb-8 sm:self-center sm:pb-0">
          {/* Desktop: large "404" text; hidden on mobile (sign above takes its place) */}
          <p
            className="hidden sm:block heading-display leading-none mb-4"
            style={{ fontSize: "clamp(5rem, 16vw, 10rem)" }}
          >
            404
          </p>
          <p className="text-ink-muted mb-8" style={{ fontSize: "clamp(0.85rem, 4vw, 1.125rem)" }}>
            Кажется, такой страницы нет
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            style={{ fontSize: "clamp(0.7rem, 3.2vw, 0.875rem)" }}
          >
            На главную
          </Link>
        </div>
        <div className="flex-shrink-0 self-end w-[60vw] h-[60vw] sm:w-[calc(100svh_-_14rem)] sm:h-[calc(100svh_-_14rem)]">
          <MascotLottie className="w-full h-full" />
        </div>
      </section>
    </>
  );
}
