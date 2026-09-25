import { StarRating } from "@/features/reviews/components/StarRating";
import type { Review } from "@/features/reviews/types/review.types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex flex-col gap-3 border-b border-[#ebe6de] py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-[family-name:var(--font-manrope)] text-[calc(13px*var(--fs-scale))] font-semibold text-[#1a1a1a]">
            {review.customerName}
          </p>
          <StarRating value={review.rating} size="sm" />
        </div>
        <time
          dateTime={review.date}
          className="font-[family-name:var(--font-manrope)] text-[calc(11px*var(--fs-scale))] text-[#605a54]"
        >
          {new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(review.date))}
        </time>
      </div>
      <p className="font-[family-name:var(--font-manrope)] text-[calc(14px*var(--fs-scale))] leading-[1.6] text-[#605a54]">
        {review.comment}
      </p>
    </article>
  );
}
