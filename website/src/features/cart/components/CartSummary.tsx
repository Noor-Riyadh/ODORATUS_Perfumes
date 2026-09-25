"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cartPaths } from "@/features/cart/paths";
import { productPaths } from "@/features/products/paths";
import { formatCartAmount } from "@/features/cart/utils/cart.utils";

type CartSummaryProps = {
  subtotal: number;
  delivery: number;
};

export function CartSummary({ subtotal, delivery }: CartSummaryProps) {
  const t = useTranslations("cart");
  const total = subtotal + delivery;

  return (
    <aside className="flex w-full shrink-0 flex-col gap-7 lg:w-[400px] lg:gap-6">
      <div className="flex flex-col gap-4 lg:gap-6">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[calc(32px*var(--fs-scale))] leading-[normal] text-[#1a1a1a] lg:text-[calc(36px*var(--fs-scale))]">
          {t("summary.title")}
        </h2>
        <div className="flex flex-col gap-5 rounded-lg bg-[#f4f0eb] p-6">
          <div className="flex items-start justify-between text-[calc(12px*var(--fs-scale))] leading-[normal]">
            <p className="font-normal text-[#605a54]">{t("summary.subtotal")}</p>
            <p className="font-semibold text-black">
              {formatCartAmount(subtotal)}
            </p>
          </div>
          <div className="flex items-start justify-between text-[calc(12px*var(--fs-scale))] leading-[normal]">
            <p className="font-normal text-[#605a54]">{t("summary.delivery")}</p>
            <p className="font-semibold text-black">
              {formatCartAmount(delivery)}
            </p>
          </div>
          <div className="h-px w-full bg-[#ebe6de]" />
          <div className="flex items-start justify-between leading-[normal] font-bold text-black">
            <p className="text-[calc(12px*var(--fs-scale))]">{t("summary.total")}</p>
            <p className="text-[calc(20px*var(--fs-scale))]">{formatCartAmount(total)}</p>
          </div>
          {subtotal === 0 ? (
            <button
              type="button"
              className="w-full rounded bg-[#1a1a1a] py-4 text-[calc(12px*var(--fs-scale))] leading-[normal] font-bold text-white uppercase disabled:cursor-not-allowed disabled:opacity-40"
              disabled
            >
              {t("summary.checkout")}
            </button>
          ) : (
            <Link
              href={cartPaths.checkout}
              className="flex w-full items-center justify-center rounded bg-[#1a1a1a] py-4 text-[calc(12px*var(--fs-scale))] leading-[normal] font-bold text-white uppercase"
            >
              {t("summary.checkout")}
            </Link>
          )}
          <p className="text-center text-[calc(10px*var(--fs-scale))] leading-[normal] font-normal text-[#605a54] uppercase">
            {t("summary.secure")}
          </p>
        </div>
      </div>
      <Link
        href={productPaths.list}
        className="text-center text-[calc(12px*var(--fs-scale))] leading-[normal] font-normal text-[#605a54] uppercase underline"
      >
        {t("summary.continueShopping")}
      </Link>
    </aside>
  );
}
