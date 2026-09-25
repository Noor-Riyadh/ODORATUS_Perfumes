"use client";

import { useTranslations } from "next-intl";
import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";
import {
  formatWholePrice,
  resolveProductImages,
} from "@/features/products/utils/product.utils";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  const t = useTranslations("productDetail");

  return (
    <ProductDetailsPage
      productId={productId}
      actions={({ product, selectedOptions, quantity, unitPrice }) => (
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={unitPrice}
          image={resolveProductImages(product)[0]}
          selectedOptions={selectedOptions}
          quantity={quantity}
          label={`${t("addToCart")} / ${formatWholePrice(unitPrice)}`}
          dir="ltr"
          className="flex w-full items-center justify-center rounded bg-[#1a1a1a] py-4 text-[calc(13px*var(--fs-scale))] leading-[normal] font-bold text-white uppercase [direction:ltr] [unicode-bidi:isolate]"
        />
      )}
    />
  );
}
