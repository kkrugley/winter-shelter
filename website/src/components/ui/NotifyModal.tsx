"use client";

import { useState, useRef, useEffect } from "react";
import { X, TelegramLogo, Info } from "@phosphor-icons/react";

const TELEGRAM_BOT_URL = "https://t.me/safepaws_help_bot";
const SITEKEY = "0x4AAAAAADs9TzE7UAMqNZVI";

interface NotifyModalProps {
  productName: string;
  productSlug: string;
  onClose: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, string>) => string;
      remove: (widgetId: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

export function NotifyModal({ productName, productSlug, onClose }: NotifyModalProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error" | "invalid">("idle");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: SITEKEY,
          "data-action": "turnstile-spin-v1",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.removeEventListener("keydown", handleKey);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setState("invalid");
      return;
    }

    const token = window.turnstile?.getResponse(widgetIdRef.current ?? undefined);
    if (!token) {
      setState("error");
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/notify-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, productSlug, "cf-turnstile-response": token }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  const statusMessage =
    state === "success" ? "Готово! Напишем, как только выйдет." :
    state === "error"   ? "Что-то пошло не так. Попробуй ещё раз." :
    state === "invalid" ? "Введи корректный email." :
    null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(30,20,10,0.45)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notify-modal-title"
    >
      <div
        className="relative w-full max-w-md rounded-[20px] p-6 flex flex-col gap-4"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--sand)",
          boxShadow: "var(--shadow-lift)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 p-1 rounded-full transition-colors hover:bg-[var(--sand)]"
          style={{ color: "var(--stone)" }}
        >
          <X size={18} />
        </button>

        <div className="flex flex-col gap-1 pr-6">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-full border self-start"
            style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
          >
            {productName}
          </span>
          <h2 id="notify-modal-title" className="heading-sub text-xl mt-1">
            Скоро появится
          </h2>
          <p className="text-sm" style={{ color: "var(--stone)" }}>
            Этот продукт сейчас в разработке. Оставь email — напишем, как только он будет готов к скачиванию.
          </p>
        </div>

        <div className="h-px" style={{ background: "var(--sand)" }} />

        {state === "success" ? (
          <p
            className="text-sm font-medium text-center py-4 rounded-xl"
            style={{ background: "var(--forest-pale)", color: "var(--forest)" }}
          >
            {statusMessage}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
            <div className="flex flex-col gap-1">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === "invalid") setState("idle"); }}
                placeholder="твой@email.com"
                disabled={state === "loading"}
                className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none transition-colors focus:border-[var(--ember)]"
                style={{
                  borderColor: state === "invalid" ? "var(--ember)" : "var(--sand-2)",
                  color: "var(--ink)",
                }}
                aria-invalid={state === "invalid"}
              />
              {statusMessage && (
                <p className="text-xs px-1" style={{ color: state === "invalid" || state === "error" ? "var(--ember)" : "var(--forest)" }}>
                  {statusMessage}
                </p>
              )}
            </div>

            <div ref={turnstileRef} data-action="turnstile-spin-v1" />

            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--ember)", color: "white" }}
            >
              {state === "loading" ? "..." : "Получить уведомление"}
            </button>
          </form>
        )}

        <div className="flex items-center gap-2">
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-full border text-sm transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
            style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
          >
            <TelegramLogo size={16} />
            Хочу уведомление в Telegram
          </a>

          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              onFocus={() => setTooltipVisible(true)}
              onBlur={() => setTooltipVisible(false)}
              aria-label="После нажатия откроется наш бот в Telegram, в котором вы сможете оформить подписку на новости."
              className="p-1.5 rounded-full transition-colors hover:bg-[var(--sand)]"
              style={{ color: "var(--stone)" }}
            >
              <Info size={16} />
            </button>
            {tooltipVisible && (
              <div
                className="absolute bottom-full right-0 mb-2 w-56 rounded-xl px-3 py-2 text-xs z-10"
                style={{
                  background: "#1e1209",
                  color: "var(--cream)",
                  boxShadow: "var(--shadow-lift)",
                }}
                role="tooltip"
              >
                После нажатия откроется наш бот в Telegram, в котором вы сможете оформить подписку на новости.
                <div
                  className="absolute right-3 top-full w-0 h-0"
                  style={{
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid #1e1209",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}