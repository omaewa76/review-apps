import { supabase } from '@/lib/supabaseClient';
import type { Review, CreateReviewInput, UpdateReviewInput } from '../types';

export const supabaseQueries = {
  // Get all reviews (sorted by rating descending)
  getReviews: async (): Promise<Review[]> => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('rating', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Supabase query error (getReviews):', error);
      throw error;
    }
  },

  // Get a single review by ID
  getReview: async (id: number): Promise<Review | null> => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(`Error fetching review ${id}:`, error);
        return null;
      }

      return data;
    } catch (error) {
      console.error(`Supabase query error (getReview ${id}):`, error);
      throw error;
    }
  },

  // Create a new review
  createReview: async (input: CreateReviewInput): Promise<Review> => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            user_name: input.user_name,
            project_url: input.project_url,
            feedback: input.feedback,
            rating: input.rating,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating review:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Supabase query error (createReview):', error);
      throw error;
    }
  },

  // Update a review
  updateReview: async (input: UpdateReviewInput): Promise<Review> => {
    try {
      const { id, ...updateData } = input;

      const { data, error } = await supabase
        .from('reviews')
        .update({
          user_name: updateData.user_name,
          project_url: updateData.project_url,
          feedback: updateData.feedback,
          rating: updateData.rating,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating review ${id}:`, error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error(`Supabase query error (updateReview ${id}):`, error);
      throw error;
    }
  },

  // Delete a review
  deleteReview: async (id: number): Promise<void> => {
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);

      if (error) {
        console.error(`Error deleting review ${id}:`, error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(`Supabase query error (deleteReview ${id}):`, error);
      throw error;
    }
  },

  // Get reviews by rating range
  getReviewsByRating: async (
    minRating: number,
    maxRating: number
  ): Promise<Review[]> => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .gte('rating', minRating)
        .lte('rating', maxRating)
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching reviews by rating:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error(
        `Supabase query error (getReviewsByRating ${minRating}-${maxRating}):`,
        error
      );
      throw error;
    }
  },

  // Get average rating
  getAverageRating: async (): Promise<number> => {
    try {
      const { data, error } = await supabase.from('reviews').select('rating');

      if (error) {
        console.error('Error calculating average rating:', error);
        return 0;
      }

      if (!data || data.length === 0) return 0;
      const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
      return sum / data.length;
    } catch (error) {
      console.error('Supabase query error (getAverageRating):', error);
      throw error;
    }
  },
};
