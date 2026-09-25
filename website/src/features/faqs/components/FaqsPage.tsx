"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { AccordionItem } from "@/features/faqs/components/AccordionItem";
import { faqItems } from "@/features/faqs/data/faq.data";

const WHATSAPP_ORDER_URL = "https://wa.me/201025598592";

export function FaqsPage() {
  const t = useTranslations("faqs");
  return (
    <main className="bg-[#faf8f5] px-4 py-16 text-[#1a1a1a] sm:px-6 md:px-10 lg:px-20 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        <header className="flex flex-col gap-4">
          <p className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.12em] text-[#c5a880] uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[calc(48px*var(--fs-scale))] leading-[0.95] text-[#1a1a1a] sm:text-[calc(72px*var(--fs-scale))]">
            {t("title")}
          </h1>
          <p className="max-w-2xl font-[family-name:var(--font-manrope)] text-[calc(15px*var(--fs-scale))] leading-[1.7] text-[#605a54]">
            {t("intro")}
          </p>
        </header>

        <section aria-label={t("ariaLabel")}>
          {faqItems.map((item) => (
            <AccordionItem key={item.id} item={item} />
          ))}
        </section>

        <div className="flex flex-col items-start gap-4 border-t border-[#ebe6de] pt-10">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[calc(32px*var(--fs-scale))] text-[#1a1a1a]">
            {t("cta.title")}
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[calc(14px*var(--fs-scale))] text-[#605a54]">
            {t("cta.description")}
          </p>
          <Link
            href={WHATSAPP_ORDER_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-[#1a1a1a] px-6 py-3 font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.1em] text-[#faf8f5] uppercase transition-colors hover:bg-[#c5a880]"
          >
            {t("cta.button")}
          </Link>
        </div>
      </div>
    </main>
  );
}
