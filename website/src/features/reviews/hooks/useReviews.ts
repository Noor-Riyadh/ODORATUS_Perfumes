"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewsService } from "@/features/reviews/services/reviews.service";

export function useReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => reviewsService.listByProduct(productId),
    enabled: Boolean(productId),
  });
}
