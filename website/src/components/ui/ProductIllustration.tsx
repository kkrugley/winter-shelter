import type React from "react";

type IllustrationKind = "cozy" | "family" | "purrtap" | "edc" | "colony";

const stroke = "#2C2A27";
const fill = "#FDE8D6";
const fillLight = "#FBF7F0";
const fillMuted = "#EDE3D1";
const ember = "#E8712A";

function CozyIllustration() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {/* Walls */}
        <path d="M35 108 L35 62 L100 26 L165 62 L165 108 Z" fill={fill} />
        {/* Roof ridge */}
        <path d="M35 62 L100 26 L165 62" />
        {/* Circular door/window */}
        <circle cx="100" cy="82" r="14" fill={fillLight} />
        {/* Door sill line */}
        <path d="M100 96 L100 108" />
      </g>
    </svg>
  );
}

function FamilyIllustration() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {/* Walls — wider and taller than Cozy */}
        <path d="M14 108 L14 62 L100 18 L186 62 L186 108 Z" fill={fill} />
        {/* Roof ridge */}
        <path d="M14 62 L100 18 L186 62" />
        {/* Entrance */}
        <circle cx="100" cy="82" r="14" fill={fillLight} />
        {/* Sill line */}
        <path d="M100 96 L100 108" />
      </g>
    </svg>
  );
}

function PurrTapIllustration() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {/* Body */}
        <path d="M75 54 L75 104 Q75 116 87 116 L113 116 Q125 116 125 104 L125 54 Z" fill={fill} />
        {/* Shoulder line */}
        <path d="M75 68 L125 68" />
        {/* Tube */}
        <path d="M 75,54 V 29.318463 c 0,-19.169764 30.63817,-22.195786 30.63817,1.16233" />
        {/* Water droplet */}
        <g transform="matrix(0.18729794,0,0,0.18729794,100.84334,32.297797)" fill="#558AE6" stroke="none">
          <path fillRule="evenodd" d="m 25.6,57.6 q 0,-1.8 -1,-3.45 Q 24.55,54.1 23.825,53.025 23.1,51.95 22.55,51.125 22,50.3 21.3,48.925 20.6,47.55 20.25,46.4 q -0.2,-0.8 -1.05,-0.8 -0.85,0 -1.05,0.8 -0.35,1.15 -1.05,2.525 -0.7,1.375 -1.25,2.2 -0.55,0.825 -1.275,1.9 -0.725,1.075 -0.775,1.125 -1,1.65 -1,3.45 0,2.65 1.875,4.525 Q 16.55,64 19.2,64 21.85,64 23.725,62.125 25.6,60.25 25.6,57.6 Z m 25.6,-6.4 q 0,10.6 -7.5,18.1 -7.5,7.5 -18.1,7.5 Q 15,76.8 7.5,69.3 0,61.8 0,51.2 0,43.95 4.05,37.45 4.35,37 7.175,32.925 10,28.85 12.225,25.375 14.45,21.9 17.2,16.475 19.95,11.05 21.35,6.4 21.8,4.9 23.05,4.05 24.3,3.2 25.6,3.2 q 1.3,0 2.575,0.85 1.275,0.85 1.675,2.35 1.4,4.65 4.15,10.075 2.75,5.425 4.975,8.9 2.225,3.475 5.05,7.55 Q 46.85,37 47.15,37.45 51.2,43.8 51.2,51.2 Z" />
        </g>
        {/* Valve circle */}
        <circle cx="100" cy="90" r="11" fill={fillLight} />
      </g>
    </svg>
  );
}

function EdcIllustration() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g
        transform="rotate(-22, 100, 65)"
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Plunger thumb cap */}
        <rect x="87" y="13" width="26" height="12" rx="4" fill={fillMuted} />
        {/* Press indicator line */}
        <line x1="92" y1="19" x2="113" y2="19" />
        {/* Barrel body */}
        <rect x="92" y="25" width="16" height="65" rx="3" fill={fill} />
        {/* Dosing scale marks inside barrel (long / short alternating) */}
        <line x1="93" y1="48" x2="98" y2="48" />
        <line x1="93" y1="56" x2="96" y2="56" />
        <line x1="93" y1="64" x2="98" y2="64" />
        <line x1="93" y1="72" x2="96" y2="72" />
        <line x1="93" y1="80" x2="98" y2="80" />
        {/* Nozzle collar — ember accent */}
        <rect x="95" y="90" width="10" height="7" rx="1.5" fill={fillLight} stroke={ember} strokeWidth="1.4" />
        {/* Nozzle tip — tapered */}
        <path d="M97 97 L96 114 L100 118 L104 114 L103 97 Z" fill={fillLight} />
      </g>
    </svg>
  );
}

function ColonyIllustration() {
  return (
    <svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
        {/* Main large body */}
        <path d="M14 108 L14 62 L54 36 L54 62 L146 62 L146 36 L186 62 L186 108 Z" fill={fill} />
        <path d="M14 62 L54 36" />
        <path d="M146 36 L186 62" />
        {/* Three windows */}
        <circle cx="48" cy="84" r="9" fill={fillLight} />
        <circle cx="100" cy="84" r="9" fill={fillLight} />
        <circle cx="152" cy="84" r="9" fill={fillLight} />
        {/* Dividers */}
        <path d="M78 62 L78 108 M122 62 L122 108" />
      </g>
    </svg>
  );
}

const illustrations: Record<IllustrationKind, () => React.ReactElement> = {
  cozy: CozyIllustration,
  family: FamilyIllustration,
  purrtap: PurrTapIllustration,
  edc: EdcIllustration,
  colony: ColonyIllustration,
};

function slugToKind(slug: string): IllustrationKind {
  if (slug === "purrtap") return "purrtap";
  if (slug === "edc-feeder") return "edc";
  if (slug === "family-shelter") return "family";
  if (slug === "colony-kit") return "colony";
  return "cozy";
}

export function ProductIllustration({
  slug,
  isNew,
  badge,
  badgeColor,
  className,
  style,
}: {
  slug: string;
  isNew?: boolean;
  badge?: string;
  badgeColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const kind = slugToKind(slug);
  const Illustration = illustrations[kind];

  return (
    <div
      className={className}
      style={{
        background: isNew
          ? "linear-gradient(180deg, var(--ember-pale) 0%, var(--sand) 100%)"
          : "var(--sand)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 24px",
        position: "relative",
        ...style,
      }}
    >
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "2px 8px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 500,
            lineHeight: 1.6,
            background: badgeColor === "ember" ? "var(--ember-pale)" : "var(--cream)",
            color: badgeColor === "ember" ? "#93430E" : "var(--stone)",
            border: `1px solid ${badgeColor === "ember" ? "transparent" : "var(--sand-2)"}`,
          }}
        >
          {badge}
        </span>
      )}
      <div style={{ width: "100%", maxWidth: 180 }}>
        <Illustration />
      </div>
    </div>
  );
}
