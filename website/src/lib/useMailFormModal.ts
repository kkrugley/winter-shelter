"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function useMailFormModal() {
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (searchParams?.get("mail-form") === "open") {
      setOpen(true)
    }
  }, [searchParams])

  return { open, setOpen }
}
