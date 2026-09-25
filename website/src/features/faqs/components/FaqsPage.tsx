import Link from "next/link";
import { AccordionItem } from "@/features/faqs/components/AccordionItem";
import { faqItems } from "@/features/faqs/data/faq.data";

const WHATSAPP_ORDER_URL = "https://wa.me/201025598592";

export function FaqsPage() {
  return (
    <main className="bg-[#faf8f5] px-4 py-16 text-[#1a1a1a] sm:px-6 md:px-10 lg:px-20 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        <header className="flex flex-col gap-4">
          <p className="font-[family-name:var(--font-manrope)] text-[12px] font-bold tracking-[0.12em] text-[#c5a880] uppercase">
            Customer Care
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[48px] leading-[0.95] text-[#1a1a1a] sm:text-[72px]">
            Frequently Asked Questions
          </h1>
          <p className="max-w-2xl font-[family-name:var(--font-manrope)] text-[15px] leading-[1.7] text-[#605a54]">
            Everything you need to know about discovering, ordering, and caring
            for your Odoratus fragrance.
          </p>
        </header>

        <section aria-label="Frequently asked questions">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} item={item} />
          ))}
        </section>

        <div className="flex flex-col items-start gap-4 border-t border-[#ebe6de] pt-10">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] text-[#1a1a1a]">
            Still have questions?
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[14px] text-[#605a54]">
            Our team would be happy to help you find your signature scent.
          </p>
          <Link
            href={WHATSAPP_ORDER_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-[#1a1a1a] px-6 py-3 font-[family-name:var(--font-manrope)] text-[12px] font-bold tracking-[0.1em] text-[#faf8f5] uppercase transition-colors hover:bg-[#c5a880]"
          >
            Chat with us on WhatsApp
          </Link>
        </div>
      </div>
    </main>
  );
}
