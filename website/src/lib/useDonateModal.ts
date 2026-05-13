"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function useDonateModal() {
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (searchParams?.get("donate") === "open") {
      setOpen(true)
    }
  }, [searchParams])

  return { open, setOpen }
}
