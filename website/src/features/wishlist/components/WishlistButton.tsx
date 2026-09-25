"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Product } from "@/features/products/types/product.types";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

type WishlistButtonProps = {
  product: Product;
};

export function WishlistButton({ product }: WishlistButtonProps) {
  const { isInWishlist, toggle } = useWishlist();
  const t = useTranslations("wishlist");
  const isWishlisted = isInWishlist(product.id);
  const [isPressed, setIsPressed] = useState(false);

  function handleClick() {
    setIsPressed(true);
    toggle(product);
    window.setTimeout(() => setIsPressed(false), 180);
  }

  return (
    <button
      type="button"
      aria-label={
        isWishlisted
          ? t("actions.remove", { product: product.name })
          : t("actions.add", { product: product.name })
      }
      aria-pressed={isWishlisted}
      className={`inline-flex size-10 items-center justify-center rounded-full border border-[#ebe6de] bg-[#faf8f5]/90 text-[#1a1a1a] shadow-[0px_4px_12px_0px_rgba(26,26,26,0.08)] transition-transform duration-200 ${
        isPressed ? "scale-125" : "scale-100"
      }`}
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        className="size-5"
        viewBox="0 0 24 24"
        fill={isWishlisted ? "#c5a880" : "none"}
        stroke={isWishlisted ? "#c5a880" : "#1a1a1a"}
        strokeWidth="1.8"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
