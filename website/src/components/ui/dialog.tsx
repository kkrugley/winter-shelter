"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const DialogRoot = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <DialogPrimitive.Portal>{children}</DialogPrimitive.Portal>
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm",
        "transition-opacity duration-200",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogClose({
  className,
  ...props
}: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={cn(
        "absolute top-3 right-3 rounded-lg p-1.5 text-ink-muted transition-colors hover:text-ink hover:bg-border-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        className
      )}
      {...props}
    >
      <X size={16} weight="bold" />
    </DialogPrimitive.Close>
  )
}

export { DialogRoot, DialogTrigger, DialogContent, DialogClose }
