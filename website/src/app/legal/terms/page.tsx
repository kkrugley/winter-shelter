import type { Metadata } from "next";
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
  title: "Пользовательское соглашение",
  alternates: pageAlternates("/legal/terms"),
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/legal">Правовая информация</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Пользовательское соглашение</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-3">Пользовательское соглашение</h1>
      <p className="text-sm mb-10" style={{ color: "var(--stone)" }}>
        Последнее обновление: 8 июля 2026 г.
      </p>

      <div className="flex flex-col gap-10 text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
        <section>
          <h2 className="heading-sub mb-3">1. О проекте</h2>
          <p style={{ color: "var(--stone)" }}>
            SafePaws — открытый некоммерческий проект: чертежи и решения для помощи уличным животным.
            Это не приют, не фонд и не зарегистрированная организация — сайт и Telegram-бот ведёт
            частное лицо. Используя сайт или бота, вы соглашаетесь с условиями ниже.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">2. Лицензия на чертежи и материалы</h2>
          <p style={{ color: "var(--stone)" }}>
            Чертежи, CAD-файлы и другие материалы проекта распространяются бесплатно под лицензией{" "}
            <a
              href="https://github.com/kkrugley/safepaws/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--ember)]"
            >
              CC BY 4.0
            </a>
            . Вы можете использовать, изменять и распространять их при указании авторства.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">3. Публикация историй, идей и мастерских</h2>
          <p style={{ color: "var(--stone)" }}>
            Отправляя историю, идею или карточку мастерской, вы подтверждаете, что имеете право
            публиковать переданные текст и фотографии. Мы модерируем все заявки перед публикацией и
            оставляем за собой право отклонить, отредактировать или позже убрать материал — например,
            если он незаконен, оскорбителен или нарушает права третьих лиц.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">4. Сборка и установка — на свой риск</h2>
          <p style={{ color: "var(--stone)" }}>
            Чертежи и инструкции предоставляются «как есть», без каких-либо гарантий. Резка, сборка
            (в том числе с использованием лазерных станков и режущего инструмента) и установка укрытий,
            поилок и другого оборудования выполняются вами самостоятельно и на свой риск. Учитывайте
            технику безопасности и местные нормы при установке в общественных или чужих местах — проект
            не несёт ответственности за последствия сборки или размещения.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">5. Донаты</h2>
          <p style={{ color: "var(--stone)" }}>
            Поддержка проекта деньгами или криптовалютой добровольна и не подразумевает возврата.
            Переводы обрабатываются выбранной вами сторонней платформой (Buy Me a Coffee, Ko-fi,
            Boosty, криптокошельки) по её собственным правилам — мы не участвуем в обработке платежа.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">6. Telegram-бот</h2>
          <p style={{ color: "var(--stone)" }}>
            Бот <code>@safepaws_help_bot</code> рассылает уведомления о доступности чертежей и собирает
            заявки для модерации. Модератор может отклонить заявку без объяснения причин.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">7. Изменения соглашения</h2>
          <p style={{ color: "var(--stone)" }}>
            Мы можем обновлять это соглашение по мере развития проекта — дата последнего обновления
            указана в начале страницы. Вопросы — по контактам на странице{" "}
            <a href="/about" className="underline hover:text-[var(--ember)]">
              «О проекте»
            </a>{" "}
            или в{" "}
            <a href="/legal/privacy" className="underline hover:text-[var(--ember)]">
              политике конфиденциальности
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
