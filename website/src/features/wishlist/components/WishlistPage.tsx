"use client";

import Link from "next/link";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

export function WishlistPage() {
  const { products } = useWishlist();

  return (
    <section className="bg-[#faf8f5] px-4 pb-16 text-[#1a1a1a] sm:px-6 md:px-10 lg:px-20 lg:pb-[100px]">
      <div className="flex flex-col items-start gap-2 py-10 lg:py-16">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[43px] leading-[normal] lg:text-[56px]">
          Wishlist
        </h1>
        <p className="text-[12px] font-normal uppercase text-[#605a54]">
          Saved fragrances for your next discovery.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-5 rounded-lg bg-[#f4f0eb] px-6 text-center">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] text-[#1a1a1a]">
            Your wishlist is waiting.
          </h2>
          <p className="max-w-md text-[14px] leading-[1.6] text-[#605a54]">
            Save the fragrances that catch your attention and return to them
            whenever inspiration strikes.
          </p>
          <Link
            href="/products"
            className="rounded bg-[#1a1a1a] px-6 py-3 font-[family-name:var(--font-manrope)] text-[12px] font-bold tracking-[0.1em] text-[#faf8f5] uppercase"
          >
            Browse Fragrances
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
