"use client";

import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function MascotLottie({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src="/images/general/mascot_cat.svg"
        alt=""
        className={className}
      />
    );
  }

  return (
    <DotLottieReact
      src="/images/general/mascot_cat-anim.lottie"
      loop
      autoplay
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
