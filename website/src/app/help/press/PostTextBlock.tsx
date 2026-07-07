"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { CopyPostButton } from "./CopyPostButton";

// Fixed collapsed height so every card in the grid reads as one row,
// regardless of how long the underlying post text is.
const COLLAPSED_HEIGHT = 108;

export function PostTextBlock({ label, text }: { label: string; text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (el) setOverflowing(el.scrollHeight > COLLAPSED_HEIGHT + 1);
  }, [text]);

  return (
    <div
      className="rounded-xl p-5 border flex flex-col gap-3"
      style={{ borderColor: "var(--sand-2)", background: "var(--card-bg)" }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: "var(--stone)" }}>
          {label}
        </span>
        <CopyPostButton text={text} />
      </div>

      <div className="relative">
        <p
          ref={textRef}
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{
            color: "var(--ink)",
            maxHeight: expanded ? "none" : COLLAPSED_HEIGHT,
            overflow: "hidden",
          }}
        >
          {text}
        </p>
        {!expanded && overflowing && (
          <div
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{ background: "linear-gradient(transparent, var(--card-bg))" }}
          />
        )}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`self-start inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[var(--ember)] ${overflowing ? "" : "invisible"}`}
        style={{ color: "var(--stone)" }}
        tabIndex={overflowing ? 0 : -1}
        aria-hidden={!overflowing}
      >
        {expanded ? "Свернуть" : "Развернуть"}
        <CaretDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
