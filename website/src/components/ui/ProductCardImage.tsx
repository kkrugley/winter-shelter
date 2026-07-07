"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductIllustration, ProductBadge } from "@/components/ui/ProductIllustration";

export function ProductCardImage({
  slug,
  image,
  alt,
  badge,
  badgeColor,
  className,
  style,
}: {
  slug: string;
  image?: string;
  alt: string;
  badge?: string;
  badgeColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = !!image && !imgError;

  if (!showPhoto) {
    return (
      <ProductIllustration
        slug={slug}
        badge={badge}
        badgeColor={badgeColor}
        className={className}
        style={style}
      />
    );
  }

  return (
    <div className={className} style={{ position: "relative", background: "var(--sand)", ...style }}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 90vw, 300px"
        onError={() => setImgError(true)}
      />
      {badge && <ProductBadge label={badge} color={badgeColor} />}
    </div>
  );
}
