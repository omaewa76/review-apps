import { z } from 'zod';

export interface Review {
  id: number;
  user_name: string;
  project_url: string;
  feedback: string;
  rating: number;
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

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

// Zod Validation Schemas
export const CreateReviewSchema = z.object({
  user_name: z.string().min(2, 'Nama minimal 2 karakter'),
  project_url: z.string().url('URL tidak valid'),
  feedback: z.string().min(10, 'Masukan minimal 10 karakter'),
  rating: z.number().min(1).max(5, 'Rating harus 1-5'),
});

export const UpdateReviewSchema = CreateReviewSchema.partial().extend({
  id: z.number(),
});
