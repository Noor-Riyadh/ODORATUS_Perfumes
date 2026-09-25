"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import { resolveProductImages } from "@/features/products/utils/product.utils";

type CategoryCard = {
  slug: string;
  productCount: number;
  image?: string;
};

const categoryTranslationKeys = {
  "pure-extractions": "pureExtractions",
  "private-reserve": "privateReserve",
  "atelier-oils": "atelierOils",
  "discovery-vault": "discoveryVault",
} as const;

function categoryCards(products: Product[]): CategoryCard[] {
  const categories = new Map<string, CategoryCard>();

  products.forEach((product) => {
    const existing = categories.get(product.category);

    if (existing) {
      existing.productCount += 1;
      return;
    }

    categories.set(product.category, {
      slug: product.category,
      productCount: 1,
      image: resolveProductImages(product)[0],
    });
  });

  return [...categories.values()].sort((left, right) =>
    left.slug.localeCompare(right.slug),
  );
}

export function CategoriesPage() {
  const t = useTranslations("categories");
  const productsQuery = useProducts({ page: 1, pageSize: 50 });
  const categories = useMemo(
    () => categoryCards(productsQuery.data?.items ?? []),
    [productsQuery.data?.items],
  );

  return (
    <main className="bg-[#faf8f5] px-4 py-16 text-[#1a1a1a] sm:px-6 md:px-10 lg:px-20 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="flex max-w-3xl flex-col gap-4">
          <p className="font-[family-name:var(--font-manrope)] text-[12px] font-bold tracking-[0.12em] text-[#c5a880] uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[52px] leading-[0.95] text-[#1a1a1a] sm:text-[76px]">
            {t("title")}
          </h1>
          <p className="font-[family-name:var(--font-manrope)] text-[15px] leading-[1.7] text-[#605a54]">
            {t("intro")}
          </p>
        </header>

        {productsQuery.isLoading ? (
          <p className="font-[family-name:var(--font-manrope)] text-sm text-[#605a54]">
            {t("loading")}
          </p>
        ) : categories.length === 0 ? (
          <p className="font-[family-name:var(--font-manrope)] text-sm text-[#605a54]">
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`${productPaths.list}?category=${encodeURIComponent(category.slug)}`}
                className="group flex min-h-[360px] flex-col justify-between overflow-hidden rounded-lg border border-[#ebe6de] bg-white p-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-[250px] w-full overflow-hidden rounded bg-[#f4f0eb]">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-sm text-[#605a54]">
                      {t("imageFallback")}
                    </div>
                  )}
                </div>
                <div className="flex items-end justify-between gap-4 px-1 pt-5">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-[family-name:var(--font-instrument-serif)] text-[28px] text-[#1a1a1a]">
                      {t(
                        `items.${categoryTranslationKeys[category.slug as keyof typeof categoryTranslationKeys]}.label`,
                      )}
                    </h2>
                    <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-[1.5] text-[#605a54]">
                      {t(
                        `items.${categoryTranslationKeys[category.slug as keyof typeof categoryTranslationKeys]}.description`,
                      )}
                    </p>
                    <p className="font-[family-name:var(--font-manrope)] text-[11px] font-semibold tracking-[0.08em] text-[#605a54] uppercase">
                      {category.productCount}{" "}
                      {t("count", { count: category.productCount })}
                    </p>
                  </div>
                  <span className="text-[22px] text-[#c5a880] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
