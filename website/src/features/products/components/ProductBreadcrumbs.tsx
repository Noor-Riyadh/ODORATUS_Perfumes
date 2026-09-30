/* eslint-disable @next/next/no-img-element */
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { productPaths } from "@/features/products/paths";

export function ProductBreadcrumbs() {
  const t = useTranslations("products");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const chevronClassName = isArabic ? "scale-x-[-1]" : undefined;

  return (
    <nav
      aria-label={t("breadcrumb.label")}
      className="flex flex-wrap items-center gap-2 px-4 py-4 sm:px-6 sm:py-6 md:px-10 lg:px-20"
    >
      <span className="flex items-center gap-2">
        <Link
          href={productPaths.list}
          className="text-[calc(12px*var(--fs-scale))] font-normal whitespace-nowrap text-[#605a54]"
        >
          {t("breadcrumb.home")}
        </Link>
        <img
          src="/icons/chevron-right.svg"
          alt=""
          width={10}
          height={10}
          className={chevronClassName}
        />
      </span>
      <span className="flex items-center gap-2">
        <Link
          href={productPaths.list}
          className="text-[calc(12px*var(--fs-scale))] font-normal whitespace-nowrap text-[#605a54]"
        >
          {t("breadcrumb.shop")}
        </Link>
        <img
          src="/icons/chevron-right.svg"
          alt=""
          width={10}
          height={10}
          className={chevronClassName}
        />
      </span>
      <span className="text-[calc(12px*var(--fs-scale))] font-semibold whitespace-nowrap text-[#1a1a1a]">
        {t("title")}
      </span>
    </nav>
  );
}
