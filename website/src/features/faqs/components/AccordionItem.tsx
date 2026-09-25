"use client";

import { useState } from "react";
import type { FaqItem } from "@/features/faqs/data/faq.data";

export function AccordionItem({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#ebe6de]">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${item.id}-answer`}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="font-[family-name:var(--font-manrope)] text-[15px] font-semibold text-[#1a1a1a]">
          {item.question}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-[24px] leading-none font-light text-[#c5a880] transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>
      <div
        id={`${item.id}-answer`}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl pb-6 pr-12 font-[family-name:var(--font-manrope)] text-[14px] leading-[1.7] text-[#605a54]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
