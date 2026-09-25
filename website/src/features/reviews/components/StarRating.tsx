"use client";

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const sizes = {
  sm: "text-[calc(14px*var(--fs-scale))]",
  md: "text-[calc(18px*var(--fs-scale))]",
  lg: "text-[calc(28px*var(--fs-scale))]",
} as const;

export function StarRating({
  value,
  onChange,
  size = "md",
  label = "Rating",
}: StarRatingProps) {
  const interactive = Boolean(onChange);

  return (
    <div
      className={`flex items-center gap-0.5 ${sizes[size]}`}
      role={interactive ? "radiogroup" : undefined}
      aria-label={`${label}: ${value} out of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const star = index + 1;
        const fill =
          value >= star ? "#c5a880" : value >= star - 0.5 ? "#c5a880" : "none";
        const opacity = value >= star - 0.5 ? 1 : 0.35;

        return interactive ? (
          <button
            key={star}
            type="button"
            role="radio"
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            aria-checked={value === star}
            className="leading-none"
            onClick={() => onChange?.(star)}
          >
            <span style={{ color: fill, opacity }}>★</span>
          </button>
        ) : (
          <span key={star} aria-hidden="true" style={{ color: fill, opacity }}>
            ★
          </span>
        );
      })}
    </div>
  );
}
