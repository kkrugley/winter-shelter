"use client";

import { GlobeSimple } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGS = [
  { code: "ru", disabled: false },
  { code: "be", disabled: false },
  { code: "pl", disabled: false },
  { code: "en", disabled: false },
];

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("LangSwitcher");

  function handleValueChange(nextLocale: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace({ pathname, params } as any, { locale: nextLocale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-2 rounded-full text-[var(--stone)] hover:bg-[var(--ember-pale)] transition-colors outline-none"
        aria-label={t("label")}
      >
        <GlobeSimple size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuRadioGroup value={locale} onValueChange={handleValueChange}>
          {LANGS.map(({ code, disabled }) => (
            <DropdownMenuRadioItem key={code} value={code} disabled={disabled}>
              {t(code as "ru" | "be" | "pl" | "en")}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
