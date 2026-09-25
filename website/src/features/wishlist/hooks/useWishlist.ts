"use client";

import { useToastStore } from "@/features/cart/store/toast.store";
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

  function add(product: Product) {
    addToWishlist(product);
    showToast(`${product.name} added to wishlist`);
  }

  function remove(product: Product) {
    removeFromWishlist(product.id);
    showToast(`${product.name} removed from wishlist`);
  }

  function toggle(product: Product) {
    const isWishlisted = products.some((item) => item.id === product.id);

    toggleWishlist(product);
    showToast(
      isWishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
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
