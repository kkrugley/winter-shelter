"use client";

import { useState } from "react";
import { TelegramLogo, Bell } from "@phosphor-icons/react";
import { NotifyModal } from "@/components/ui/NotifyModal";

const TELEGRAM_CHANNEL_URL = "https://t.me/safepaws_help";

interface ComingSoonActionsProps {
  productName: string;
  productSlug: string;
}

export function ComingSoonActions({ productName, productSlug }: ComingSoonActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-xl p-5 mb-4 text-center"
        style={{ background: "#F5F1EB", border: "1px solid var(--sand)" }}
      >
        <p className="heading-card text-xl text-ink-muted mb-1">Скоро в каталоге</p>
        <p className="text-sm text-ink-muted">Следи за обновлениями в Telegram</p>
      </div>

      <div className="flex gap-2">
        <a
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-colors"
          style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--ember)"; e.currentTarget.style.color = "var(--ember)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--sand-2)"; e.currentTarget.style.color = "var(--stone)"; }}
        >
          <TelegramLogo size={16} />
          Перейти в Telegram канал
        </a>

        <button
          onClick={() => setModalOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
          style={{ background: "var(--ember)", color: "white" }}
        >
          <Bell size={16} />
          Подписаться на обновления
        </button>
      </div>

      {modalOpen && (
        <NotifyModal
          productName={productName}
          productSlug={productSlug}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
