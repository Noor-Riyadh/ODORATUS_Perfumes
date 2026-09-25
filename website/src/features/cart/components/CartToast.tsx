"use client";

import { Link } from "@/i18n/navigation";
import { cartPaths } from "@/features/cart/paths";
import { useToastStore } from "@/features/cart/store/toast.store";

export function CartToast() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-lg border border-[#ebe6de] bg-white px-4 py-3 shadow-[0px_8px_24px_0px_rgba(26,26,26,0.08)]"
        >
          <p className="text-[calc(13px*var(--fs-scale))] leading-[normal] text-[#1a1a1a]">
            {toast.message}
          </p>
          <Link
            href={cartPaths.cart}
            className="shrink-0 text-[calc(11px*var(--fs-scale))] leading-[normal] font-semibold tracking-wide text-[#c5a880] uppercase"
          >
            View cart
          </Link>
        </div>
      ))}
    </div>
  );
}
