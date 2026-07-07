"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@phosphor-icons/react";

const SITE_URL = "safepaws.ru";

export function CopySiteLink() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(SITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 font-mono transition-colors hover:text-[var(--ember)]"
      style={{ color: copied ? "var(--forest)" : "var(--ink)" }}
    >
      {SITE_URL}
      {copied ? <CheckIcon size={13} weight="bold" style={{ color: "var(--forest)" }} /> : <CopyIcon size={13} />}
    </button>
  );
}
