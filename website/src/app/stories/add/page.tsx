import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function AddStoryPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="font-mono text-xs text-ink-muted mb-8">
        <Link href="/" className="hover:text-accent">главная</Link>
        {" / "}
        <Link href="/stories" className="hover:text-accent">истории</Link>
        {" / "}
        <span className="text-accent">добавить</span>
      </div>

      <h1 className="font-hand text-5xl text-ink mb-3">Поделись историей</h1>
      <p className="text-sm text-ink-muted mb-10">
        Расскажи, как ты поставил домик или поилку. Это вдохновляет других.
      </p>

      <div className="border border-border-soft rounded-xl p-6 space-y-5">
        {[
          { label: "город", placeholder: "Минск", type: "text" },
          { label: "твоё имя (необязательно)", placeholder: "Анна", type: "text" },
          { label: "email для связи (необязательно)", placeholder: "you@example.com", type: "email" },
        ].map(({ label, placeholder, type }) => (
          <div key={label}>
            <label className="font-mono text-xs text-ink-muted block mb-1">
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-border-soft rounded-lg text-sm bg-paper text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent"
            />
          </div>
        ))}

        <div>
          <label className="font-mono text-xs text-ink-muted block mb-1">
            что установил?
          </label>
          <select className="w-full px-3 py-2 border border-border-soft rounded-lg text-sm bg-paper text-ink focus:outline-none focus:border-accent">
            <option>Cozy Shelter</option>
            <option>Family Shelter</option>
            <option>PurrTap</option>
          </select>
        </div>

        <div>
          <label className="font-mono text-xs text-ink-muted block mb-1">
            история (несколько предложений)
          </label>
          <textarea
            rows={4}
            placeholder="Расскажи, как и где установил. Сколько котов?"
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-sm bg-paper text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent resize-none"
          />
        </div>

        <div>
          <label className="font-mono text-xs text-ink-muted block mb-1">
            фото (необязательно)
          </label>
          <div className="ph min-h-[100px] cursor-pointer hover:bg-accent-soft/40 transition-colors text-sm">
            перетащи фото сюда или нажми для выбора
          </div>
        </div>

        <button className="w-full py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-[#c4673d] transition-colors">
          Отправить историю →
        </button>
        <p className="text-xs text-ink-muted text-center">
          Мы проверим и добавим её на карту.
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Все истории
        </Link>
      </div>
    </div>
  );
}
