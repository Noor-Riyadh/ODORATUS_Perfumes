/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import type { Product } from "@/features/products/types/product.types";
import {
  formatTaxonomyLabel,
  formatWholePrice,
} from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
  price: number;
};

/** US-04: product information. */
export function ProductDetails({ product, price }: ProductDetailsProps) {
  const t = useTranslations("productDetail");

  return (
    <div className="flex w-full flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {product.scentFamily ? (
          <span className="rounded-full bg-[#f2ede4] px-2.5 py-1 text-[calc(11px*var(--fs-scale))] leading-[normal] font-semibold text-[#1a1a1a] uppercase">
            {t("scentFamily")}: {formatTaxonomyLabel(product.scentFamily)}
          </span>
        ) : null}
        {product.occasion ? (
          <span className="rounded-full bg-[#f4f0eb] px-2.5 py-1 text-[calc(11px*var(--fs-scale))] leading-[normal] font-semibold text-[#605a54] uppercase">
            {t("occasion")}: {formatTaxonomyLabel(product.occasion)}
          </span>
        ) : null}
      </div>
      <h1
        dir="ltr"
        style={{ unicodeBidi: "isolate" }}
        className="font-[family-name:var(--font-instrument-serif)] text-[calc(36px*var(--fs-scale))] leading-[normal] text-left text-[#1a1a1a] [direction:ltr] [unicode-bidi:isolate] sm:text-[calc(48px*var(--fs-scale))]"
      >
        {product.name}
      </h1>
      <div className="flex w-full items-center justify-between gap-4">
        <p
          dir="ltr"
          style={{ unicodeBidi: "isolate" }}
          className="text-[calc(24px*var(--fs-scale))] leading-[normal] font-semibold whitespace-nowrap text-left text-[#1a1a1a] [direction:ltr] [unicode-bidi:isolate]"
        >
          {formatWholePrice(price)}
        </p>
        <p className="flex items-center gap-1.5 text-[calc(13px*var(--fs-scale))] leading-[normal] font-semibold whitespace-nowrap text-[#10b981]">
          <img src="/icons/dot.svg" alt="" width={8} height={8} />
          {t("availableInAtelier")}
        </p>
      </div>
    </div>
  );
}
