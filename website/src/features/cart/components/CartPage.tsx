"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { RemoveCartItemDialog } from "@/features/cart/components/RemoveCartItemDialog";
import { useCart } from "@/features/cart/hooks/useCart";
import type { CartLine } from "@/features/cart/types/cart.types";
import { getCartDelivery } from "@/features/cart/utils/cart.utils";

export function CartPage() {
  const t = useTranslations("cart");
  const { lines, total, increment, decrement, removeItem } = useCart();
  const [pendingRemoval, setPendingRemoval] = useState<CartLine | null>(null);
  const itemCount = lines.length;

  return (
    <section className="bg-[#faf8f5] text-[#1a1a1a]">
      <nav
        aria-label="Breadcrumb"
        className="hidden px-20 py-6 lg:block"
      >
        <p className="text-[12px] leading-[normal] font-normal text-[#605a54]">
          <Link href="/">{t("breadcrumb.home")}</Link>
          <span>{"  /  "}</span>
          <span>{t("breadcrumb.cart")}</span>
        </p>
      </nav>
      <div className="flex flex-col gap-7 px-5 pt-7 pb-12 lg:flex-row lg:items-start lg:gap-16 lg:px-20 lg:pt-4 lg:pb-[100px]">
        <div className="flex min-w-0 flex-1 flex-col gap-7 lg:gap-5">
          <div className="flex flex-col items-start gap-1.5 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[43px] leading-[normal] text-[#1a1a1a] lg:text-[56px]">
              {t("title")}
            </h1>
            <p className="text-[11px] leading-[normal] font-normal text-[#605a54] uppercase lg:text-[12px]">
              <span className="lg:hidden">
                {t("itemCountBag", { count: itemCount })}
              </span>
              <span className="hidden lg:inline">
                {t("itemCount", { count: itemCount })}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-3.5 lg:gap-5">
            {lines.length === 0 ? (
              <p className="text-[14px] leading-[normal] text-[#605a54]">
                {t("empty")}
              </p>
            ) : (
              lines.map((line) => (
                <CartItem
                  key={line.id}
                  line={line}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onRemove={(lineId) =>
                    setPendingRemoval(
                      lines.find((line) => line.id === lineId) ?? null,
                    )
                  }
                />
              ))
            )}
          </div>
        </div>
        <CartSummary subtotal={total} delivery={getCartDelivery(lines)} />
      </div>
      {pendingRemoval ? (
        <RemoveCartItemDialog
          line={pendingRemoval}
          onCancel={() => setPendingRemoval(null)}
          onConfirm={() => {
            removeItem(pendingRemoval.id);
            setPendingRemoval(null);
          }}
        />
      ) : null}
    </section>
  );
}
