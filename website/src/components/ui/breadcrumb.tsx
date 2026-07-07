import * as React from "react"
import { DotsThreeIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { cn } from "@/lib/utils"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" className={cn(className)} {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1 font-mono text-xs text-ink-muted",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li className={cn("inline-flex items-center gap-1", className)} {...props} />
  )
}

function BreadcrumbLink({
  className,
  href,
  children,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn("transition-colors hover:text-accent", className)}
      {...(props as object)}
    >
      {children}
    </Link>
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-accent", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("select-none text-ink-muted", className)}
      {...props}
    >
      {children ?? "/"}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <DotsThreeIcon className="h-4 w-4" />
      <span className="sr-only">Ещё</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
