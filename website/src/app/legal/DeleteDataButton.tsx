"use client"

import { useState } from "react"
import { TrashIcon } from "@phosphor-icons/react"
import { DataDeletionModal } from "@/components/DataDeletionModal"

export function DeleteDataButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
        style={{ borderColor: "var(--sand-2)", color: "var(--stone)" }}
      >
        <TrashIcon size={16} weight="bold" />
        Запросить удаление данных
      </button>
      <DataDeletionModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
