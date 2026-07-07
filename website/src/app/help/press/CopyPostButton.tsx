"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@phosphor-icons/react";

export function CopyPostButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors shrink-0"
      style={{
        borderColor: copied ? "var(--forest)" : "var(--sand-2)",
        color: copied ? "var(--forest)" : "var(--stone)",
        background: copied ? "var(--forest-pale)" : "var(--cream)",
      }}
    >
      {copied ? <CheckIcon size={13} weight="bold" /> : <CopyIcon size={13} />}
      {copied ? "Скопировано" : "Копировать"}
    </button>
  );
}
