"use client";

import { useTranslations } from "next-intl";
import { useProductSort } from "@/features/products/hooks/useProductSort";
import type {
  ProductListQuery,
  ProductSort,
} from "@/features/products/types/product.types";

type ProductSortControlProps = {
  query: ProductListQuery;
  availableCount: number;
};

const SORT_OPTIONS: Array<{ value: ProductSort; key: string }> = [
  { value: "price-desc", key: "sort.priceHighToLow" },
  { value: "price-asc", key: "sort.priceLowToHigh" },
  { value: "name-asc", key: "sort.nameAToZ" },
  { value: "name-desc", key: "sort.nameZToA" },
];

export function ProductSortControl({
  query,
  availableCount,
}: ProductSortControlProps) {
  const t = useTranslations("products");
  const { sort, setSort } = useProductSort(query);
  return (
    <div className="flex w-full flex-col gap-3 border-b border-solid border-[#ebe6de] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-[12px] font-normal uppercase text-[#605a54]">
        {t("availableCount", { count: availableCount })}
      </p>
      <label className="relative flex shrink-0 items-center gap-2">
        <span className="text-[12px] font-semibold whitespace-nowrap text-[#1a1a1a]">
          {t("sort.label")}
        </span>
        <select
          aria-label="Sort products"
          value={sort}
          onChange={(event) => setSort(event.target.value as ProductSort)}
          className="cursor-pointer appearance-none bg-transparent pr-5 text-[12px] font-semibold whitespace-nowrap text-[#c5a880] outline-none"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.key)}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
        />
      </label>
    </div>
  );
}
