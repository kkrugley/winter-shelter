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
  title: "Политика конфиденциальности",
  alternates: pageAlternates("/legal/privacy"),
};

const PROCESSORS = [
  { name: "Vercel", purpose: "хостинг сайта и бота, метрики производительности (Speed Insights)" },
  { name: "Neon (Postgres)", purpose: "база данных: истории, идеи, мастерские, подписчики бота" },
  { name: "PostHog (EU)", purpose: "продуктовая аналитика сайта" },
  { name: "Sentry", purpose: "отслеживание ошибок и технических сбоев" },
  { name: "MailerLite", purpose: "рассылка о новых устройствах" },
  { name: "Web3Forms", purpose: "пересылка формы обратной связи на почту" },
  { name: "Cloudflare (Turnstile)", purpose: "проверка «не робот» на формах" },
  { name: "vgy.me", purpose: "хостинг загруженных фотографий" },
  { name: "Nominatim / OpenStreetMap", purpose: "поиск города по названию" },
  { name: "Telegram", purpose: "работа бота @safepaws_help_bot" },
];

export default function PrivacyPage() {
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
            <BreadcrumbPage>Политика конфиденциальности</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="heading-display mb-3">Политика конфиденциальности</h1>
      <p className="text-sm mb-10" style={{ color: "var(--stone)" }}>
        Последнее обновление: 8 июля 2026 г.
      </p>

      <div className="flex flex-col gap-10 text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
        <section>
          <h2 className="heading-sub mb-3">1. Кто мы</h2>
          <p style={{ color: "var(--stone)" }}>
            SafePaws — открытый некоммерческий проект без юридического лица. Сайт safepaws.ru и
            Telegram-бот <a href="https://t.me/safepaws_help" target="_blank" rel="noopener noreferrer"><code>@safepaws_help_bot</code></a> ведёт Павел Круглей как
            частное лицо.
          </p>
          <p className="mt-2" style={{ color: "var(--stone)" }}>
          Мы не приют и не фонд — здесь публикуются чертежи и открытые данные проекта.
          </p>
          <p className="mt-2" style={{ color: "var(--stone)" }}>
            Связаться по вопросам данных можно так: email{" "}
            <a href="mailto:safepaws.help@proton.me" className="underline hover:text-[var(--ember)]">
              safepaws.help@proton.me
            </a>
            , Telegram{" "}
            <a href="https://t.me/safepaws_help" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--ember)]">
              @safepaws_help
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">2. Посетители сайта</h2>
          <p style={{ color: "var(--stone)" }}>
            Мы используем PostHog, Sentry и Vercel Speed Insights, чтобы понимать, как работает сайт,
            и находить ошибки. Это может включать переходы по страницам, клики, технические данные
            устройства и браузера, а в случае ошибок — запись сессии для отладки. Подробности и способы
            отключения — в{" "}
            <Link href="/legal/cookies" className="underline hover:text-[var(--ember)]">
              политике cookies и трекеров
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">3. Рассылка о новых устройствах</h2>
          <p style={{ color: "var(--stone)" }}>
            При подписке на форме уведомлений мы передаём ваш email и (если указан) интерес к конкретному
            продукту сервису MailerLite. Отписаться можно ссылкой в любом письме рассылки.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">4. Форма обратной связи</h2>
          <p style={{ color: "var(--stone)" }}>
            Сообщение из формы «Написать нам» (имя, email для ответа, текст) уходит через сервис Web3Forms
            и пересылается на нашу почту safepaws.help@proton.me. Мы не используем эти данные для чего-то,
            кроме ответа вам.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">5. Истории, идеи и мастерские</h2>
          <p style={{ color: "var(--stone)" }}>
            Когда вы публикуете историю, идею или карточку мастерской, мы сохраняем указанные вами поля
            (имя, текст, город/страна, Telegram — если оставили, ссылку на фото) в нашей базе данных
            (Neon Postgres). Фотографии хранятся на стороннем хостинге vgy.me.
          </p>
          <p className="mt-2" style={{ color: "var(--stone)" }}>
            Если при добавлении истории вы указали местоположение на карте, координаты случайным образом
            смещаются в пределах 1 км перед сохранением — точный адрес укрытия никогда не попадает
            в базу. Для карточек мастерских координаты сохраняются как есть, потому что это адрес услуги,
            который сам пользователь хочет сделать публичным.
          </p>
          <p className="mt-2" style={{ color: "var(--stone)" }}>
            Все публикации проходят модерацию перед появлением на сайте.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">6. Поиск города</h2>
          <p style={{ color: "var(--stone)" }}>
            Подсказки городов при заполнении форм получены через открытый сервис геокодинга Nominatim
            (OpenStreetMap). Ему передаётся только текст запроса, без личных данных.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">7. Проверка «не робот»</h2>
          <p style={{ color: "var(--stone)" }}>
            Формы на сайте защищены Cloudflare Turnstile — сервис проверяет, что заявку отправляет
            человек, без показа капчи и без использования данных в рекламных целях.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">8. Донаты</h2>
          <p style={{ color: "var(--stone)" }}>
            Поддержать проект можно через сторонние платформы (Buy Me a Coffee, Ko-fi, Boosty) или
            переводом на криптокошелёк. Сайт не получает и не хранит ваши платёжные данные — оплата
            происходит полностью на стороне выбранной платформы, по её собственным правилам.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">9. Telegram-бот @safepaws_help_bot</h2>
          <p style={{ color: "var(--stone)" }}>
            При старте бота или подписке мы сохраняем ваш Telegram ID, username и имя, а также список
            выбранных подписок (общие обновления или конкретные устройства) — это нужно, чтобы прислать
            уведомление, когда чертежи станут доступны. Эти данные хранятся в той же базе, что и данные
            сайта, но в отдельных таблицах, не связанных с сайтом иначе как технически.
          </p>
          <p className="mt-2" style={{ color: "var(--stone)" }}>
            Ограниченный список модераторов (их Telegram ID задан в настройках бота) получает уведомления
            о новых историях, идеях и мастерских для одобрения или отклонения — сам текст заявки
            модератор видит, чтобы принять решение.
          </p>
          <p className="mt-2" style={{ color: "var(--stone)" }}>
            Чтобы отписаться от всех уведомлений и удалить свои подписки — команда{" "}
            <code>/unsubscribe_all</code> в самом боте. Чтобы полностью удалить запись о себе из базы —
            напишите нам (контакты в разделе 1) или воспользуйтесь{" "}
            <Link href="/legal" className="underline hover:text-[var(--ember)]">
              формой запроса на удаление данных
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">10. Кому передаются данные</h2>
          <p className="mb-4" style={{ color: "var(--stone)" }}>
            Мы не продаём данные и не передаём их для рекламы. Для работы сайта и бота используются
            следующие сторонние сервисы:
          </p>
          <div className="flex flex-col gap-2">
            {PROCESSORS.map((p) => (
              <div key={p.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 border-b" style={{ borderColor: "var(--sand)" }}>
                <span className="font-medium shrink-0 sm:w-48" style={{ color: "var(--ink)" }}>{p.name}</span>
                <span style={{ color: "var(--stone)" }}>{p.purpose}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="heading-sub mb-3">11. Сроки хранения</h2>
          <p style={{ color: "var(--stone)" }}>
            Опубликованный контент (истории, идеи, мастерские) хранится, пока проект существует, или до
            вашего запроса на удаление. Данные подписки на рассылку и в боте — до отписки или запроса на
            удаление. Аналитические сервисы (PostHog, Sentry) хранят технические данные согласно своим
            собственным политикам и настройкам ретенции.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">12. Ваши права</h2>
          <p style={{ color: "var(--stone)" }}>
            Вы можете запросить, какие данные о вас у нас есть, попросить их исправить или удалить —
            через{" "}
            <Link href="/legal" className="underline hover:text-[var(--ember)]">
              форму запроса на удаление данных
            </Link>{" "}
            на этой странице или написав напрямую (контакты в разделе 1).
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">13. Дети</h2>
          <p style={{ color: "var(--stone)" }}>
            Сайт и бот не предназначены для целенаправленного сбора данных несовершеннолетних.
          </p>
        </section>

        <section>
          <h2 className="heading-sub mb-3">14. Изменения политики</h2>
          <p style={{ color: "var(--stone)" }}>
            Мы можем обновлять этот документ по мере развития проекта — дата последнего обновления
            указана в начале страницы.
          </p>
        </section>
      </div>
    </div>
  );
}
