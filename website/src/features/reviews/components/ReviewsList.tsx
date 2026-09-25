"use client";

import { useState, type FormEvent } from "react";
import { useToastStore } from "@/features/cart/store/toast.store";
import { ReviewCard } from "@/features/reviews/components/ReviewCard";
import { StarRating } from "@/features/reviews/components/StarRating";
import { useReviews } from "@/features/reviews/hooks/useReviews";
import type { Review } from "@/features/reviews/types/review.types";

function ratingSummary(reviews: Review[]) {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return reviews.length ? total / reviews.length : 0;
}

export function ProductRatingSummary({ productId }: { productId: string }) {
  const { data = [] } = useReviews(productId);
  const average = ratingSummary(data);

  return (
    <a
      href="#reviews"
      className="flex items-center gap-2 text-[12px] text-[#605a54]"
    >
      <StarRating value={average} size="sm" />
      <span>
        {average ? average.toFixed(1) : "No"}{" "}
        {data.length === 1 ? "review" : "reviews"}
      </span>
    </a>
  );
}

export function ReviewsList({ productId }: { productId: string }) {
  const reviewsQuery = useReviews(productId);
  const showToast = useToastStore((state) => state.show);
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const reviews = [...localReviews, ...(reviewsQuery.data ?? [])];
  const average = ratingSummary(reviews);
  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((review) => review.rating === stars).length,
  }));

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !rating || !comment.trim()) {
      return;
    }

    setLocalReviews((current) => [
      {
        id: `local-${Date.now()}`,
        productId,
        customerName: name.trim(),
        rating,
        comment: comment.trim(),
        date: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ]);
    setName("");
    setRating(0);
    setComment("");
    showToast("Your review was submitted");
  }

  return (
    <section
      id="reviews"
      className="flex flex-col gap-10 bg-[#f4f0eb] px-4 py-16 sm:px-6 md:px-10 lg:px-20 lg:py-[100px]"
    >
      <div className="flex flex-col gap-3">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a] sm:text-[48px]">
          Reviews
        </h2>
        <p className="font-[family-name:var(--font-manrope)] text-[13px] uppercase text-[#605a54]">
          The experience of the signature scent
        </p>
      </div>

      {reviewsQuery.isLoading ? (
        <p className="text-sm text-[#605a54]">Loading reviews...</p>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col gap-6">
            <div className="flex items-end gap-4">
              <span className="font-[family-name:var(--font-instrument-serif)] text-[64px] leading-none text-[#1a1a1a]">
                {average ? average.toFixed(1) : "0.0"}
              </span>
              <div className="pb-1">
                <StarRating value={average} size="md" />
                <p className="mt-1 text-[12px] text-[#605a54]">
                  Based on {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {breakdown.map(({ stars, count }) => (
                <div key={stars} className="flex items-center gap-3 text-[12px]">
                  <span className="w-8 text-[#605a54]">{stars} star</span>
                  <div className="h-1.5 flex-1 rounded-full bg-[#ebe6de]">
                    <div
                      className="h-full rounded-full bg-[#c5a880]"
                      style={{
                        width: reviews.length
                          ? `${(count / reviews.length) * 100}%`
                          : "0%",
                      }}
                    />
                  </div>
                  <span className="w-4 text-right text-[#605a54]">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {reviews.length ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p className="py-5 text-[14px] text-[#605a54]">
                Be the first to share your experience.
              </p>
            )}
          </div>
        </div>
      )}

      <form
        onSubmit={submitReview}
        className="flex max-w-2xl flex-col gap-4 border-t border-[#ebe6de] pt-8"
      >
        <h3 className="font-[family-name:var(--font-instrument-serif)] text-[30px] text-[#1a1a1a]">
          Share your experience
        </h3>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="rounded border border-[#ebe6de] bg-white px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
        />
        <StarRating value={rating} onChange={setRating} size="lg" />
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Tell us about the scent..."
          aria-label="Your review"
          rows={4}
          className="resize-none rounded border border-[#ebe6de] bg-white px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
        />
        <button
          type="submit"
          className="self-start rounded bg-[#1a1a1a] px-6 py-3 font-[family-name:var(--font-manrope)] text-[12px] font-bold tracking-[0.1em] text-[#faf8f5] uppercase"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}
