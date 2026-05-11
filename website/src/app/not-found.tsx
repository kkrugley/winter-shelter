import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex items-end max-w-5xl mx-auto px-6 min-h-[calc(100svh-12rem)] overflow-hidden">
      <div className="flex-1 pb-12">
        <p
          className="heading-display leading-none mb-4"
          style={{ fontSize: "clamp(5rem, 16vw, 10rem)" }}
        >
          404
        </p>
        <p className="text-ink-muted text-lg mb-8">Кажется, этой страницы нет</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          На главную
        </Link>
      </div>
      <div className="flex-shrink-0 self-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mascot_cat.svg"
          alt=""
          className="block w-[42vw] sm:w-auto sm:h-[calc(100svh_-_14rem)]"
        />
      </div>
    </section>
  );
}
