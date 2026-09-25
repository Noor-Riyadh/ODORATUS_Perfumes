"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCart } from "@/features/cart";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import { WishlistButton } from "@/features/wishlist";
import {
  formatWholePrice,
  resolveProductImages,
} from "@/features/products/utils/product.utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("products");
  const { addItem } = useCart();
  const image = resolveProductImages(product)[0];

  return (
    <article className="flex min-w-0 flex-1 flex-col items-start gap-4 self-stretch rounded-lg bg-white p-4">
      <div className="relative h-[240px] w-full shrink-0 sm:h-[280px] lg:h-[320px]">
        <Link
          href={productPaths.detail(product.id)}
          className="relative block size-full overflow-hidden rounded"
        >
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="rounded object-cover"
              sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
            />
          ) : (
            <div className="flex size-full items-center justify-center rounded bg-[#faf8f5] text-sm text-[#605a54]">
              {t("noImage")}
            </div>
          )}
        </Link>
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-start justify-between">
          <Link
            href={productPaths.detail(product.id)}
            className="flex min-w-0 flex-col items-start gap-1"
          >
            <h2 dir="ltr" className="w-full text-left font-[family-name:var(--font-instrument-serif)] text-[20px] text-[#1a1a1a] [direction:ltr] sm:truncate sm:text-[22px]">
              {product.name}
            </h2>
            <p dir="ltr" className="w-full text-left text-[11px] font-normal uppercase text-[#c5a880] [direction:ltr] sm:truncate">
              {product.notes}
            </p>
          </Link>
          <p dir="ltr" className="shrink-0 text-left text-[15px] font-semibold text-[#1a1a1a] [direction:ltr]">
            {formatWholePrice(product.price)}
          </p>
        </div>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center rounded border border-solid border-[#ebe6de] py-3 text-[11px] font-semibold uppercase whitespace-nowrap text-[#1a1a1a]"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image,
              selectedOptions: {},
            })
          }
        >
          {t("addToCart")}
        </button>
      </div>
    </article>
  );
}
