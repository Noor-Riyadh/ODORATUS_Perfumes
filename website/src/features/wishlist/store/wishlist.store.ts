"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/features/products/types/product.types";

type WishlistStore = {
  products: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
};

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") {
    return false;
  }

  const product = value as Product;

  return (
    typeof product.id === "string" &&
    typeof product.name === "string" &&
    typeof product.description === "string" &&
    typeof product.notes === "string" &&
    typeof product.price === "number" &&
    Array.isArray(product.images) &&
    product.images.every((image) => typeof image === "string") &&
    typeof product.category === "string" &&
    typeof product.scentFamily === "string" &&
    typeof product.occasion === "string" &&
    Array.isArray(product.options)
  );
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      products: [],
      addToWishlist: (product) =>
        set((state) =>
          state.products.some((item) => item.id === product.id)
            ? state
            : { products: [...state.products, product] },
        ),
      removeFromWishlist: (productId) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().products.some((product) => product.id === productId),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.products.some((item) => item.id === product.id);

          return {
            products: exists
              ? state.products.filter((item) => item.id !== product.id)
              : [...state.products, product],
          };
        }),
    }),
    {
      name: "odoratus-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ products: state.products }),
      skipHydration: true,
      merge: (persisted, current) => {
        const stored = persisted as { products?: unknown } | undefined;
        const products = Array.isArray(stored?.products)
          ? stored.products.filter(isProduct)
          : [];

        return { ...current, products };
      },
    },
  ),
);
