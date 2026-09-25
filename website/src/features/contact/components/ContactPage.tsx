"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { useToastStore } from "@/features/cart/store/toast.store";

const WHATSAPP_ORDER_URL = "https://wa.me/201025598592";
const PHONE_NUMBER = "+20 10 2559 8592";
const PHONE_URL = "tel:+201025598592";
const EMAIL_ADDRESS = "hello@odoratus.com";
const fieldClassName =
  "w-full rounded border border-[#ebe6de] bg-white px-4 py-3 font-[family-name:var(--font-manrope)] text-[calc(14px*var(--fs-scale))] text-[#1a1a1a] outline-none placeholder:text-[#605a54] focus:border-[#1a1a1a]";

export function ContactPage() {
  const t = useTranslations("contact");
  const showToast = useToastStore((state) => state.show);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showToast(t("success"));
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <main className="bg-[#faf8f5] px-4 py-16 text-[#1a1a1a] sm:px-6 md:px-10 lg:px-20 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <header className="flex max-w-3xl flex-col gap-4">
          <p className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.12em] text-[#c5a880] uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[calc(52px*var(--fs-scale))] leading-[0.95] text-[#1a1a1a] sm:text-[calc(76px*var(--fs-scale))]">
            {t("title")}
          </h1>
          <p className="font-[family-name:var(--font-manrope)] text-[calc(15px*var(--fs-scale))] leading-[1.7] text-[#605a54]">
            {t("intro")}
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <section className="flex flex-col gap-4" aria-label="Contact methods">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[calc(34px*var(--fs-scale))] text-[#1a1a1a]">
              {t("methods.title")}
            </h2>
            <div className="flex flex-col">
              <Link
                href={WHATSAPP_ORDER_URL}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-1 border-b border-[#ebe6de] py-5"
              >
                <span className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.1em] text-[#c5a880] uppercase">
                  {t("methods.whatsapp")}
                </span>
                <span className="font-[family-name:var(--font-manrope)] text-[calc(15px*var(--fs-scale))] text-[#1a1a1a]">
                  {t("methods.whatsappDescription")}
                </span>
              </Link>
              <Link
                href={PHONE_URL}
                className="flex flex-col gap-1 border-b border-[#ebe6de] py-5"
              >
                <span className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.1em] text-[#c5a880] uppercase">
                  {t("methods.phone")}
                </span>
                <span
                  dir="ltr"
                  className="font-[family-name:var(--font-manrope)] text-[calc(15px*var(--fs-scale))] text-[#1a1a1a] [direction:ltr]"
                >
                  {PHONE_NUMBER}
                </span>
              </Link>
              <Link
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex flex-col gap-1 border-b border-[#ebe6de] py-5"
              >
                <span className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.1em] text-[#c5a880] uppercase">
                  {t("methods.email")}
                </span>
                <span
                  dir="ltr"
                  className="font-[family-name:var(--font-manrope)] text-[calc(15px*var(--fs-scale))] text-[#1a1a1a] [direction:ltr]"
                >
                  {EMAIL_ADDRESS}
                </span>
              </Link>
              <p className="py-5 font-[family-name:var(--font-manrope)] text-[calc(13px*var(--fs-scale))] leading-[1.6] text-[#605a54]">
                {t("methods.responseTime")}
              </p>
            </div>
          </section>

          <form
            onSubmit={submitForm}
            className="flex flex-col gap-5 rounded-lg bg-[#f4f0eb] p-6 sm:p-8"
          >
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[calc(34px*var(--fs-scale))] text-[#1a1a1a]">
              {t("form.title")}
            </h2>
            <label className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.08em] text-[#1a1a1a] uppercase">
                {t("form.name")}
              </span>
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className={fieldClassName}
                type="text"
                name="name"
                autoComplete="name"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.08em] text-[#1a1a1a] uppercase">
                {t("form.email")}
              </span>
              <input
                required
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={fieldClassName}
                type="email"
                name="email"
                autoComplete="email"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.08em] text-[#1a1a1a] uppercase">
                {t("form.subject")}
              </span>
              <input
                required
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                className={fieldClassName}
                type="text"
                name="subject"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.08em] text-[#1a1a1a] uppercase">
                {t("form.message")}
              </span>
              <textarea
                required
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                className={`${fieldClassName} resize-none`}
                name="message"
                rows={6}
              />
            </label>
            <button
              type="submit"
              className="self-start rounded bg-[#1a1a1a] px-7 py-3 font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.1em] text-[#faf8f5] uppercase transition-colors hover:bg-[#c5a880]"
            >
              {t("form.submit")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
