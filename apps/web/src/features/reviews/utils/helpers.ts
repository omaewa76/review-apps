import type { Review } from 'shared-types';

export const sortReviewsByRating = (reviews: Review[]): Review[] => {
  return [...reviews].sort((a, b) => b.rating - a.rating);
};

export const getAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

export const getRatingDistribution = (reviews: Review[]) => {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      distribution[review.rating]++;
    }
  });
  return distribution;
};
