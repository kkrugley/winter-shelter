"use client";

import { GlobeSimpleIcon } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGS } from "@/config/languages";

export function LangSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-2 rounded-full text-[var(--stone)] hover:bg-[var(--ember-pale)] transition-colors outline-none"
        aria-label="Выбрать язык"
      >
        <GlobeSimpleIcon size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuRadioGroup value="ru" onValueChange={() => {}}>
          {LANGS.map(({ code, label, disabled }) => (
            <DropdownMenuRadioItem key={code} value={code} disabled={disabled}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
