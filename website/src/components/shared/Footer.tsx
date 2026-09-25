/* eslint-disable @next/next/no-img-element */
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const SOCIALS = [
  { href: "https://instagram.com", key: "instagram", icon: "/icons/instagram.svg" },
  { href: "https://x.com", key: "x", icon: "/icons/x.svg" },
  { href: "https://facebook.com", key: "facebook", icon: "/icons/facebook.svg" },
] as const;

const PAYMENT_METHODS = ["visa", "mastercard", "amex"] as const;

export function Footer() {
  const t = useTranslations("footer");
  const columns = [
    {
      title: t("collections.title"),
      links: [
        t("collections.laMaison"),
        t("collections.privateReserve"),
        t("collections.scentedCandles"),
        t("collections.discoverySets"),
      ],
    },
    {
      title: t("customerCare.title"),
      links: [
        t("customerCare.olfactoryConsultation"),
        t("customerCare.shippingReturns"),
        t("customerCare.atelierAppointments"),
        t("customerCare.careGuide"),
      ],
    },
    {
      title: t("about.title"),
      links: [
        t("about.philosophy"),
        t("about.sourcingStandards"),
        t("about.sustainability"),
        t("about.journal"),
      ],
    },
  ];

  return (
    <footer className="bg-[#1a1a1a] px-4 pt-16 pb-8 text-white sm:px-6 md:px-10 lg:px-20 lg:pt-20 lg:pb-10">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full max-w-[400px] flex-col items-start gap-6">
            <Link
              href="/"
              dir="ltr"
              className="font-[family-name:var(--font-instrument-serif)] text-[32px] leading-[normal] tracking-[0.18em] text-white [direction:ltr] [unicode-bidi:isolate] sm:text-[40px]"
            >
              ODORATUS
            </Link>
            <p
              dir="ltr"
              style={{ unicodeBidi: "isolate" }}
              className="text-[14px] leading-[1.6] font-normal text-[#f2ede4] opacity-80 [direction:ltr] [unicode-bidi:isolate]"
            >
              {t("description")}
            </p>
            <div className="flex items-start gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  aria-label={t(`social.${social.key}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 p-2"
                >
                  <img src={social.icon} alt="" width={16} height={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:gap-20">
            {columns.map((column) => (
              <div
                key={column.title}
                className="flex w-full flex-col items-start gap-5 lg:w-[180px]"
              >
                <p className="text-[12px] leading-[normal] font-bold text-[#c5a880] uppercase">
                  {column.title}
                </p>
                {column.links.map((link) => (
                  <p
                    key={link}
                    className="text-[13px] leading-[normal] font-normal text-white opacity-70"
                  >
                    {link}
                  </p>
                ))}
                {column.title === t("customerCare.title") ? (
                  <>
                    <Link
                      href="/faqs"
                      className="text-[13px] leading-[normal] font-normal text-white opacity-70"
                    >
                      {t("customerCare.faqs")}
                    </Link>
                    <Link
                      href="/contact"
                      className="text-[13px] leading-[normal] font-normal text-white opacity-70"
                    >
                      {t("customerCare.contact")}
                    </Link>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-px w-full bg-white/13" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] leading-[normal] font-normal whitespace-nowrap text-white opacity-50">
              <span
                dir="ltr"
                className="[direction:ltr] [unicode-bidi:isolate]"
              >
                © 2026 Odoratus.
              </span>{" "}
              {t("rightsReserved")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[11px] leading-[normal] font-normal text-white uppercase opacity-40">
                {t("securedCheckout")}
              </p>
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="rounded border border-white/13 px-2 py-1 text-[9px] leading-[normal] font-semibold text-white uppercase opacity-60"
                >
                  <span dir="ltr">{t(`paymentMethods.${method}`)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
