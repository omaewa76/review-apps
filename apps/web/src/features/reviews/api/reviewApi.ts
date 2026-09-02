import { supabaseQueries } from './supabaseQueries';
// import type { Review, CreateReviewInput, UpdateReviewInput } from '../types';

// Re-export Supabase queries with consistent naming
export const reviewApi = {
  getReviews: supabaseQueries.getReviews,
  getReview: supabaseQueries.getReview,
  createReview: supabaseQueries.createReview,
  updateReview: supabaseQueries.updateReview,
  deleteReview: supabaseQueries.deleteReview,
  getReviewsByRating: supabaseQueries.getReviewsByRating,
  getAverageRating: supabaseQueries.getAverageRating,
};
