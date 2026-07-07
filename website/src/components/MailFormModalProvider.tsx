"use client"

import { MailFormModal } from "@/components/MailFormModal"
import { useMailFormModal } from "@/lib/useMailFormModal"

export function MailFormModalProvider() {
  const { open, setOpen } = useMailFormModal()
  return <MailFormModal open={open} onClose={() => setOpen(false)} />
}
