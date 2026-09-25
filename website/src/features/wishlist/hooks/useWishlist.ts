"use client";

import { useToastStore } from "@/features/cart/store/toast.store";
import { useTranslations } from "next-intl";
import type { Product } from "@/features/products/types/product.types";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";

export function useWishlist() {
  const products = useWishlistStore((state) => state.products);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const showToast = useToastStore((state) => state.show);
  const t = useTranslations("wishlist");

  function add(product: Product) {
    addToWishlist(product);
    showToast(t("toasts.added", { product: product.name }));
  }

  function remove(product: Product) {
    removeFromWishlist(product.id);
    showToast(t("toasts.removed", { product: product.name }));
  }

  function toggle(product: Product) {
    const isWishlisted = products.some((item) => item.id === product.id);

    toggleWishlist(product);
    showToast(
      isWishlisted
        ? t("toasts.removed", { product: product.name })
        : t("toasts.added", { product: product.name }),
    );
  }

  return {
    products,
    count: products.length,
    add,
    remove,
    toggle,
    isInWishlist: (productId: string) =>
      products.some((product) => product.id === productId),
  };
}
