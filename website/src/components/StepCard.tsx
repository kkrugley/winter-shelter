"use client";

import { useState } from "react";
import Image from "next/image";
import { illustrations, slugToKind } from "@/components/ui/ProductIllustration";

interface StepCardProps {
  n: number;
  title: string;
  desc: string;
  image?: string;
  slug: string;
}

function IllustrationFallback({ slug }: { slug: string }) {
  const Illustration = illustrations[slugToKind(slug)];
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--sand)]">
      <div className="w-[55%]">
        <Illustration />
      </div>
    </div>
  );
}

export function StepCard({ n, title, desc, image, slug }: StepCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="border border-border-soft rounded-xl overflow-hidden">
      {expanded && image ? (
        <div
          onClick={() => setExpanded(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setExpanded(false)}
          className="relative w-full aspect-[4/3] cursor-zoom-out"
          style={{ position: "relative" }}
          aria-label="Свернуть изображение"
        >
          {failed ? (
            <IllustrationFallback slug={slug} />
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 25vw"
              onError={() => setFailed(true)}
            />
          )}
        </div>
      ) : (
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="shrink-0 w-8 h-8 rounded-full border-2 border-accent text-accent font-mono text-sm flex items-center justify-center font-medium">
              {n}
            </span>
            <h4 className="text-base font-bold text-ink font-sans truncate">{title}</h4>
          </div>
          {image ? (
            <button
              onClick={() => setExpanded(true)}
              className="relative w-full mb-3 rounded-lg overflow-hidden cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Развернуть изображение"
              style={{ position: "relative", minHeight: "70px" }}
            >
              {failed ? (
                <IllustrationFallback slug={slug} />
              ) : (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  onError={() => setFailed(true)}
                />
              )}
            </button>
          ) : (
            <div className="ph mb-3" style={{ minHeight: "70px" }} />
          )}
          <p className="text-xs text-ink-muted">{desc}</p>
        </div>
      )}
    </div>
  );
}
