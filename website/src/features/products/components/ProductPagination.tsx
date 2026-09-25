import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type ProductPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  previousHref?: string;
  nextHref?: string;
};

export function ProductPagination({
  page,
  pageSize,
  total,
  previousHref,
  nextHref,
}: ProductPaginationProps) {
  const t = useTranslations("products");
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const controlClassName =
    "inline-flex cursor-pointer items-center justify-center rounded border border-solid border-[#ebe6de] p-3";

  return (
    <div className="flex w-full items-center justify-center gap-4 pt-8 lg:pt-10">
      {previousHref ? (
        <Link href={previousHref} className={controlClassName} aria-label={t("pagination.previous")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/arrow-left.svg" alt="" width={14} height={14} />
        </Link>
      ) : (
        <button
          type="button"
          className={`${controlClassName} cursor-default opacity-40`}
          disabled
          aria-label={t("pagination.previous")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/arrow-left.svg" alt="" width={14} height={14} />
        </button>
      )}
      <p className="text-[13px] font-normal whitespace-nowrap text-[#605a54]">
        {t("pagination.pageOf", { page, pageCount })}
      </p>
      {nextHref ? (
        <Link
          href={nextHref}
          className={`${controlClassName} bg-[#1a1a1a]`}
          aria-label={t("pagination.next")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/arrow-right.svg" alt="" width={14} height={14} />
        </Link>
      ) : (
        <button
          type="button"
          className={`${controlClassName} cursor-default bg-[#1a1a1a] opacity-40`}
          disabled
          aria-label={t("pagination.next")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/arrow-right.svg" alt="" width={14} height={14} />
        </button>
      )}
    </div>
  );
}
