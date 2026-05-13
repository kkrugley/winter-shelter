"use client";

import { GlobeSimple } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO(i18n): wire up next-intl (or similar) to apply selected language site-wide
const LANGS = [
  { code: "ru", label: "Русский",    disabled: false },
  { code: "be", label: "Беларуская", disabled: true  },
  { code: "pl", label: "Polski",     disabled: true  },
  { code: "en", label: "English",    disabled: true  },  
];

const STORAGE_KEY = "sp_lang";

export function LangSwitcher() {
  const [lang, setLang] = useState("ru");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setLang(stored);
  }, []);

  function handleValueChange(value: string) {
    setLang(value);
    localStorage.setItem(STORAGE_KEY, value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-2 rounded-full text-[var(--stone)] hover:bg-[var(--ember-pale)] transition-colors outline-none"
        aria-label="Выбрать язык"
      >
        <GlobeSimple size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuRadioGroup value={lang} onValueChange={handleValueChange}>
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
