"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  future?: boolean;
}

const TILTS = [-1.5, 1.2, -0.8, 1.8, -1.2, 0.9];

function RoadmapCard({ item, index }: { item: TimelineItem; index: number }) {
  const tilt = TILTS[index % TILTS.length];
  return (
    <div style={{ transform: `rotate(${tilt}deg)` }}>
      <div
        className="rounded-xl p-5"
        style={{
          border: item.future ? "1.5px dashed var(--sand-2)" : "1.5px solid var(--sand)",
          background: item.future ? "transparent" : "var(--cream)",
          opacity: item.future ? 0.6 : 1,
        }}
      >
        <span className="font-mono text-[10px] block mb-2" style={{ color: "var(--stone)" }}>
          {item.year}
        </span>
        <strong className="heading-card text-base block mb-1">{item.title}</strong>
        <p className="text-xs" style={{ color: "var(--stone)" }}>{item.desc}</p>
      </div>
    </div>
  );
}

interface PathSpec {
  d: string;
}

function buildPaths(
  cardEls: (HTMLDivElement | null)[],
  containerEl: HTMLDivElement
): PathSpec[] {
  const cr = containerEl.getBoundingClientRect();
  const rects = cardEls.map((el) => (el ? el.getBoundingClientRect() : null));
  const W = cr.width;
  const paths: PathSpec[] = [];

  for (let i = 0; i < rects.length - 1; i++) {
    const a = rects[i];
    const b = rects[i + 1];
    if (!a || !b) continue;

    const ax = a.right - cr.left;
    const ay = (a.top + a.bottom) / 2 - cr.top;
    const bx = b.left - cr.left;
    const by = (b.top + b.bottom) / 2 - cr.top;

    if (i % 2 === 0) {
      // Same row: right edge of left card → left edge of right card.
      // Simple horizontal arc that stays strictly in the column gap (between ax and bx).
      // The arc peaks 22px above center; the path arrives horizontally at bx.
      const midX = (ax + bx) / 2;
      paths.push({
        d: `M ${ax} ${ay} C ${midX} ${ay - 22}, ${bx - 4} ${ay}, ${bx} ${ay}`,
      });
    } else {
      // Between rows: right card (right col, row N) → left card (left col, row N+1).
      // The path must never cross any card's bounding box.
      // Strategy: exit right → sweep outside container on the right →
      //           cross through the gap between rows at mid-Y →
      //           sweep outside container on the left →
      //           enter the left card from its left side (arrow points →).
      const gapMidY = (a.bottom + b.top) / 2 - cr.top;
      const loopR = W + 88;   // loop right of container
      const loopL = -88;      // loop left of container
      const midX = W / 2;     // column-gap centre
      paths.push({
        d: `M ${ax} ${ay} C ${loopR} ${ay}, ${loopR} ${gapMidY}, ${midX} ${gapMidY} C ${loopL} ${gapMidY}, ${loopL} ${by}, ${bx} ${by}`,
      });
    }
  }

  return paths;
}

export function RoadmapZigzag({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<PathSpec[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cr = container.getBoundingClientRect();
    setSvgSize({ w: cr.width, h: cr.height });
    setPaths(buildPaths(cardRefs.current, container));
  }, []);

  useEffect(() => {
    measure();
    const obs = new ResizeObserver(measure);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [measure]);

  return (
    <>
      {/* Desktop: 2-column zigzag + SVG connectors */}
      <div ref={containerRef} className="relative hidden md:block">
        {/* SVG is z-index 0; the card grid wrapper is z-index 1, so cards always sit on top. */}
        {svgSize.w > 0 && (
          <svg
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              overflow: "visible",
              pointerEvents: "none",
              zIndex: 0,
            }}
            width={svgSize.w}
            height={svgSize.h}
          >
            <defs>
              {/*
                orient="auto" rotates the marker to match the path direction at the endpoint.
                refX=9 places the triangle tip exactly at the path endpoint.
              */}
              <marker
                id="rm-arrow"
                markerWidth="9"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <path d="M 0 0 L 9 3.5 L 0 7 Z" fill="var(--ember)" fillOpacity="0.75" />
              </marker>
            </defs>
            {paths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill="none"
                stroke="var(--ember)"
                strokeWidth="1.5"
                strokeOpacity="0.6"
                markerEnd="url(#rm-arrow)"
              />
            ))}
          </svg>
        )}

        {/* Cards sit above the SVG via z-index: 1 */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-2 gap-x-24 gap-y-12">
            {items.map((item, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={i % 2 === 0 ? "col-start-1" : "col-start-2"}
              >
                <RoadmapCard item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: single column, alternating alignment */}
      <div className="flex flex-col gap-3 md:hidden">
        {items.map((item, i) => (
          <div
            key={i}
            className={`w-[80%] ${i % 2 === 0 ? "self-start" : "self-end"}`}
          >
            <RoadmapCard item={item} index={i} />
          </div>
        ))}
      </div>
    </>
  );
}
