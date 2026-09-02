import type { Review as SharedReview } from 'shared-types';

// Extend shared types with Supabase-specific fields
export interface Review extends SharedReview {
  created_at: string;
  updated_at: string;
}

export interface CreateReviewInput {
  user_name: string;
  project_url: string;
  feedback: string;
  rating: number;
}

export interface UpdateReviewInput extends Partial<CreateReviewInput> {
  id: number;
}
