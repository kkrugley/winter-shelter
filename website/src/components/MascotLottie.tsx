"use client";

import { useState, useEffect } from "react";
import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";

export function MascotLottie({ className }: { className?: string }) {
  // DotLottieReact uses WASM + Web Workers — unavailable during SSR.
  // Render the static SVG on the server and swap to the animation after mount.
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setWasmUrl("/dotlottie-player.wasm");
    setMounted(true);
  }, []);

  if (!mounted || failed) {
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
