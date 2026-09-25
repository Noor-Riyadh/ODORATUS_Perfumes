import { mockReviews } from "@/features/reviews/services/reviews.mock-data";
import type { Review } from "@/features/reviews/types/review.types";

export type ReviewsService = {
  listByProduct(productId: string): Promise<Review[]>;
};

export const mockReviewsService: ReviewsService = {
  async listByProduct(productId) {
    return mockReviews.filter((review) => review.productId === productId);
  },
};
