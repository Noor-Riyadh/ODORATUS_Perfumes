"use client";

import Link from "next/link";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

export function WishlistNavLink() {
  const { count } = useWishlist();

  return (
    <Link
      href="/wishlist"
      className="flex items-center gap-1.5"
      aria-label={`Wishlist, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <svg
        aria-hidden="true"
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.8"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="rounded-full bg-[#c5a880] px-1.5 py-0.5 text-[10px] leading-[normal] font-bold text-white">
        {count}
      </span>
    </Link>
  );
}
