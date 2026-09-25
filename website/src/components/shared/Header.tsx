"use client";

/* eslint-disable @next/next/no-img-element */
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Suspense, useState, type FormEvent } from "react";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";
import { WishlistNavLink } from "@/features/wishlist";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  Link as LocaleLink,
  usePathname,
  useRouter,
} from "@/i18n/navigation";

const NAV_LINKS = [
  { href: "/", label: "home" },
  { href: productPaths.list, label: "shop" },
  { href: "/categories", label: "categories" },
  { href: "/contact", label: "contact" },
  { href: "/faqs", label: "faqs" },
] as const;

const searchFieldClassName =
  "w-full bg-transparent text-[calc(14px*var(--fs-scale))] leading-[normal] text-[#1a1a1a] outline-none placeholder:text-[#605a54]";

function SearchForm({
  className,
  onSearched,
}: {
  className: string;
  onSearched?: () => void;
}) {
  const t = useTranslations("products.search");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = pathname === productPaths.list ? (searchParams.get("search") ?? "") : "";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("search") ?? "").trim();
    const params = new URLSearchParams(
      pathname === productPaths.list ? searchParams.toString() : "",
    );

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.delete("page");
    const query = params.toString();
    router.push(query ? `${productPaths.list}?${query}` : productPaths.list);
    onSearched?.();
  }

  return (
    <form action={productPaths.list} method="get" className={className} onSubmit={onSubmit}>
      <img src="/icons/search.svg" alt="" width={14} height={14} />
      <input
        key={search}
        name="search"
        defaultValue={search}
        placeholder={t("placeholder")}
        aria-label={t("ariaLabel")}
        className={searchFieldClassName}
      />
    </form>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const tSearch = useTranslations("products.search");

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]">
      <div className="bg-[#1a1a1a] px-4 py-2.5 text-center lg:py-3">
        <p className="text-[calc(10.5px*var(--fs-scale))] leading-[normal] font-normal text-white uppercase lg:text-[calc(13px*var(--fs-scale))] lg:font-semibold">
          <span
            dir="ltr"
            className="lg:hidden [direction:ltr] [unicode-bidi:isolate]"
          >
            Complimentary gift wrapping over $150
          </span>
          <span
            dir="ltr"
            className="hidden lg:inline [direction:ltr] [unicode-bidi:isolate]"
          >
            Complimentary signature gift wrapping on all orders above $150
          </span>
        </p>
      </div>
      <div className="relative border-b border-[#ebe6de]">
        <div className="grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-x-2 px-4 sm:px-5 xl:h-[90px] xl:gap-x-0 xl:px-10 2xl:px-20">
          <nav className="hidden items-center gap-6 justify-self-start xl:flex 2xl:gap-10">
            {NAV_LINKS.map((link) => (
              <LocaleLink
                key={link.label}
                href={link.href}
                className="text-[calc(15px*var(--fs-scale))] leading-[normal] font-medium text-[#605a54] uppercase"
              >
                {t(link.label)}
              </LocaleLink>
            ))}
          </nav>
          <button
            type="button"
            className="justify-self-start xl:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <img src="/icons/menu.svg" alt="" width={22} height={22} />
          </button>
          <LocaleLink
            href="/"
            dir="ltr"
            className="font-[family-name:var(--font-instrument-serif)] text-[calc(18px*var(--fs-scale))] leading-[normal] text-[#1a1a1a] [direction:ltr] [unicode-bidi:isolate] min-[360px]:text-[calc(22px*var(--fs-scale))] sm:text-[calc(25px*var(--fs-scale))] xl:text-[calc(30px*var(--fs-scale))] xl:tracking-[0.18em] xl:-mr-[0.18em] 2xl:text-[calc(38px*var(--fs-scale))]"
          >
            ODORATUS
          </LocaleLink>
          <div className="flex items-center justify-self-end gap-3 sm:gap-7 xl:gap-5 2xl:gap-7 min-w-max [&>*]:shrink-0">
            <Suspense
              fallback={
                <div className="hidden w-[224px] items-center gap-2 rounded-full border border-[#ebe6de] px-3 py-2 xl:flex">
                  <img src="/icons/search.svg" alt="" width={14} height={14} />
                  <input
                    name="search"
                    placeholder={tSearch("placeholder")}
                    aria-label={tSearch("ariaLabel")}
                    className={searchFieldClassName}
                  />
                </div>
              }
            >
              <SearchForm className="hidden w-[224px] items-center gap-2 rounded-full border border-[#ebe6de] px-3 py-2 xl:flex" />
            </Suspense>
            <WishlistNavLink />
            <CartNavLink />
            <LanguageSwitcher />
          </div>
        </div>
        {menuOpen ? (
          <nav className="absolute inset-x-0 top-full z-20 flex flex-col gap-4 border-b border-[#ebe6de] bg-[#faf8f5] px-5 py-5 xl:hidden">
            <Suspense>
              <SearchForm
                className="flex w-full items-center gap-2 rounded-full border border-[#ebe6de] bg-white px-3 py-2"
                onSearched={() => setMenuOpen(false)}
              />
            </Suspense>
            {NAV_LINKS.map((link) => (
              <LocaleLink
                key={link.label}
                href={link.href}
                className="text-[calc(15px*var(--fs-scale))] leading-[normal] font-medium text-[#605a54] uppercase"
                onClick={() => setMenuOpen(false)}
              >
                {t(link.label)}
              </LocaleLink>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
