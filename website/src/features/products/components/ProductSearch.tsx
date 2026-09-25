"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { useProductSearch } from "@/features/products/hooks/useProductSearch";

type ProductSearchProps = {
  value?: string;
};

/** US-02: search field for the product listing. */
export function ProductSearch({ value }: ProductSearchProps) {
  const { search } = useProductSearch(value);
  const t = useTranslations("products");

  return (
    <label className="block min-w-56 flex-1">
      <span className="mb-1 block text-sm font-medium">{t("search.label")}</span>
      <Input
        defaultValue={search}
        placeholder={t("search.productsPlaceholder")}
        aria-label={t("search.productsAriaLabel")}
      />
    </label>
  );
}
