"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

export function WishlistPage() {
  const { products } = useWishlist();
  const t = useTranslations("wishlist");

  return (
    <section className="bg-[#faf8f5] px-4 pb-16 text-[#1a1a1a] sm:px-6 md:px-10 lg:px-20 lg:pb-[100px]">
      <div className="flex flex-col items-start gap-2 py-10 lg:py-16">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[calc(43px*var(--fs-scale))] leading-[normal] lg:text-[calc(56px*var(--fs-scale))]">
          {t("title")}
        </h1>
        <p className="text-[calc(12px*var(--fs-scale))] font-normal uppercase text-[#605a54]">
          {t("subtitle")}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-5 rounded-lg bg-[#f4f0eb] px-6 text-center">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[calc(32px*var(--fs-scale))] text-[#1a1a1a]">
            {t("emptyTitle")}
          </h2>
          <p className="max-w-md text-[calc(14px*var(--fs-scale))] leading-[1.6] text-[#605a54]">
            {t("emptyDescription")}
          </p>
          <Link
            href="/products"
            className="rounded bg-[#1a1a1a] px-6 py-3 font-[family-name:var(--font-manrope)] text-[calc(12px*var(--fs-scale))] font-bold tracking-[0.1em] text-[#faf8f5] uppercase"
          >
            {t("browseProducts")}
          </Link>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
