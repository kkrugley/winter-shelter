"use client"

import { DonateModal } from "@/components/DonateModal"
import { useDonateModal } from "@/lib/useDonateModal"

export function DonateModalProvider() {
  const { open, setOpen } = useDonateModal()
  return <DonateModal open={open} onClose={() => setOpen(false)} />
}
