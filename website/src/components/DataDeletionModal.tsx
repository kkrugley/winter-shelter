"use client"

import { useState } from "react"
import { PaperPlaneTiltIcon, CheckCircleIcon, SpinnerIcon } from "@phosphor-icons/react"
import { DialogRoot, DialogContent, DialogClose } from "@/components/ui/dialog"
import { submitContactForm } from "@/lib/web3forms"
import posthog from "posthog-js"

const DATA_KINDS = [
  "История",
  "Идея",
  "Мастерская",
  "Подписка на рассылку",
  "Подписка в Telegram-боте",
  "Другое",
] as const

interface DataDeletionModalProps {
  open: boolean
  onClose: () => void
}

export function DataDeletionModal({ open, onClose }: DataDeletionModalProps) {
  const [kind, setKind] = useState<(typeof DATA_KINDS)[number]>(DATA_KINDS[0])
  const [identifier, setIdentifier] = useState("")
  const [link, setLink] = useState("")
  const [comment, setComment] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

  function resetAndClose() {
    onClose()
    setTimeout(() => {
      setKind(DATA_KINDS[0])
      setIdentifier("")
      setLink("")
      setComment("")
      setError(null)
      setStatus("idle")
    }, 300)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!identifier.trim()) {
      setError("Укажи, как тебя найти в этих данных — имя, email или Telegram.")
      return
    }

    setError(null)
    setStatus("submitting")

    const message = [
      `Что удалить: ${kind}`,
      `Как найти: ${identifier}`,
      link.trim() ? `Ссылка: ${link}` : null,
      comment.trim() ? `Комментарий: ${comment}` : null,
    ]
      .filter(Boolean)
      .join("\n")

    try {
      await submitContactForm({
        subject: "Запрос на удаление данных — safepaws.ru",
        message,
      })

      posthog.capture("data_deletion_requested", { kind })
      setStatus("success")
    } catch (err) {
      posthog.captureException(err)
      setStatus("idle")
      setError("Не получилось отправить — попробуй ещё раз или напиши напрямую.")
    }
  }

  return (
    <DialogRoot open={open} onOpenChange={(o) => !o && resetAndClose()}>
      <DialogContent>
        <div
          className="relative w-full max-w-md rounded-[20px] p-6 flex flex-col gap-4"
          style={{ background: "var(--card-bg)", border: "1px solid var(--sand)", boxShadow: "var(--shadow-lift)" }}
        >
          <DialogClose />

          {status === "success" ? (
            <>
              <div className="flex flex-col gap-1 pr-6">
                <h2 className="heading-sub text-xl">Запрос отправлен!</h2>
              </div>
              <div className="h-px" style={{ background: "var(--sand)" }} />
              <p
                className="text-sm font-medium text-center py-4 rounded-xl flex items-center justify-center gap-2"
                style={{ background: "var(--forest-pale)", color: "var(--forest)" }}
              >
                <CheckCircleIcon size={18} weight="fill" />
                Мы обработаем удаление вручную и ответим на указанный контакт.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-2.5 rounded-full border text-sm font-medium transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
                style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
              >
                Закрыть
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1 pr-6">
                <h2 className="heading-sub text-xl">Запросить удаление данных</h2>
                <p className="text-sm" style={{ color: "var(--stone)" }}>
                  Например, если когда-то добавил(а) историю или подписался(лась) на рассылку, а теперь
                  хочешь, чтобы это удалили.
                </p>
              </div>

              <div className="h-px" style={{ background: "var(--sand)" }} />

              <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as (typeof DATA_KINDS)[number])}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none transition-colors focus:border-[var(--ember)]"
                  style={{ borderColor: "var(--sand-2)", color: "var(--ink)" }}
                >
                  {DATA_KINDS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); if (error) setError(null) }}
                  placeholder="Как вас найти: имя, email или Telegram"
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none transition-colors focus:border-[var(--ember)]"
                  style={{ borderColor: "var(--sand-2)", color: "var(--ink)" }}
                />
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Ссылка на историю/идею (необязательно)"
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none transition-colors focus:border-[var(--ember)]"
                  style={{ borderColor: "var(--sand-2)", color: "var(--ink)" }}
                />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Комментарий (необязательно)"
                  rows={3}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none resize-none transition-colors focus:border-[var(--ember)]"
                  style={{ borderColor: "var(--sand-2)", color: "var(--ink)" }}
                />

                {error && (
                  <p className="text-xs px-1" style={{ color: "var(--ember)" }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "var(--ember)", color: "white" }}
                >
                  {status === "submitting" ? (
                    <><SpinnerIcon size={16} className="animate-spin" /> Отправляю…</>
                  ) : (
                    <><PaperPlaneTiltIcon size={16} weight="bold" /> Отправить запрос</>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
