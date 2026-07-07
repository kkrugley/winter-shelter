"use client"

import { useState } from "react"
import { Copy, Check, PaperPlaneTilt, CheckCircle, Spinner } from "@phosphor-icons/react"
import { DialogRoot, DialogContent, DialogClose } from "@/components/ui/dialog"
import { submitContactForm } from "@/lib/web3forms"
import posthog from "posthog-js"

const CONTACT_EMAIL = "safepaws.help@proton.me"

interface MailFormModalProps {
  open: boolean
  onClose: () => void
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 font-mono transition-colors hover:text-[var(--ember)]"
      style={{ color: "var(--ink)" }}
    >
      {copied ? <Check size={13} weight="bold" style={{ color: "var(--forest)" }} /> : <Copy size={13} />}
      {copied ? "Скопировано" : CONTACT_EMAIL}
    </button>
  )
}

export function MailFormModal({ open, onClose }: MailFormModalProps) {
  const [name, setName] = useState("")
  const [replyTo, setReplyTo] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

  function resetAndClose() {
    onClose()
    setTimeout(() => {
      setName("")
      setReplyTo("")
      setMessage("")
      setError(null)
      setStatus("idle")
    }, 300)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!message.trim()) {
      setError("Напиши пару слов о том, с чем нужна помощь.")
      return
    }
    if (replyTo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo.trim())) {
      setError("Проверь адрес почты для ответа — что-то в нём не так.")
      return
    }

    setError(null)
    setStatus("submitting")

    try {
      await submitContactForm({
        subject: "Сообщение с сайта SafePaws",
        name,
        email: replyTo,
        message,
      })

      posthog.capture("contact_form_submitted")
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
                <h2 className="heading-sub text-xl">Отправлено!</h2>
              </div>
              <div className="h-px" style={{ background: "var(--sand)" }} />
              <p
                className="text-sm font-medium text-center py-4 rounded-xl flex items-center justify-center gap-2"
                style={{ background: "var(--forest-pale)", color: "var(--forest)" }}
              >
                <CheckCircle size={18} weight="fill" />
                Письмо получено, ответим при первой возможности.
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
                <h2 className="heading-sub text-xl">Написать нам</h2>
                <p className="text-sm" style={{ color: "var(--stone)" }}>
                  Сообщение придёт нам на {CONTACT_EMAIL} — ответим на указанный email, если его оставишь.
                </p>
              </div>

              <div className="h-px" style={{ background: "var(--sand)" }} />

              <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя (необязательно)"
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none transition-colors focus:border-[var(--ember)]"
                  style={{ borderColor: "var(--sand-2)", color: "var(--ink)" }}
                />
                <input
                  type="email"
                  value={replyTo}
                  onChange={(e) => { setReplyTo(e.target.value); if (error) setError(null) }}
                  placeholder="Твой email для ответа (необязательно)"
                  disabled={status === "submitting"}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none transition-colors focus:border-[var(--ember)]"
                  style={{ borderColor: "var(--sand-2)", color: "var(--ink)" }}
                />
                <textarea
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (error) setError(null) }}
                  placeholder="О чём хочешь рассказать?"
                  rows={4}
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
                    <><Spinner size={16} className="animate-spin" /> Отправляю…</>
                  ) : (
                    <><PaperPlaneTilt size={16} weight="bold" /> Отправить сообщение</>
                  )}
                </button>
              </form>

              <p className="text-xs text-center flex items-center justify-center gap-1.5 flex-wrap" style={{ color: "var(--stone)" }}>
                Или напиши напрямую: <CopyEmail />
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
