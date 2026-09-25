
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#ebe6de] px-2 py-1 text-[calc(10px*var(--fs-scale))] font-semibold uppercase">
      <button
        type="button"
        className={locale === "en" ? "text-[#c5a880]" : "text-[#605a54]"}
        aria-pressed={locale === "en"}
        onClick={() => router.replace(pathname, { locale: "en" })}
      >
        EN
      </button>
      <span className="text-[#ebe6de]">/</span>
      <button
        type="button"
        className={locale === "ar" ? "text-[#c5a880]" : "text-[#605a54]"}
        aria-pressed={locale === "ar"}
        onClick={() => router.replace(pathname, { locale: "ar" })}
      >
        AR
      </button>
    </div>
  );
}
