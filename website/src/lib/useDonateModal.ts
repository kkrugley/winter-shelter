"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import posthog from "posthog-js"

export function useDonateModal() {
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (searchParams?.get("donate") === "open") {
      posthog.capture("donate_modal_opened")
      setOpen(true)
    }
  }, [searchParams])

  return { open, setOpen }
}
