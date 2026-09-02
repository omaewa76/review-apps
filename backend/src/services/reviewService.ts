import { createClient } from '@supabase/supabase-js';
import type { Review, CreateReviewInput, UpdateReviewInput } from '../types';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error('Missing Supabase credentials in backend environment');
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    autoRefreshToken: false, // Secret key 
    persistSession: false,
  },
  db: {
    schema: 'public',
  },
});

export class ReviewService {
  async getAllReviews(): Promise<Review[]> {
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
      console.error('ReviewService.getAllReviews error:', error);
      throw error;
    }
  }

  async getReviewById(id: number): Promise<Review | null> {
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
      console.error(`ReviewService.getReviewById error for ${id}:`, error);
      throw error;
    }
  }

  async createReview(input: CreateReviewInput): Promise<Review> {
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

      console.log(`Review created: ${data.id}`);
      return data;
    } catch (error) {
      console.error('ReviewService.createReview error:', error);
      throw error;
    }
  }

  async updateReview(input: UpdateReviewInput): Promise<Review> {
    try {
      const { id, ...updateData } = input;

      const { data, error } = await supabase
        .from('reviews')
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating review ${id}:`, error);
        throw new Error(error.message);
      }

      console.log(`Review updated: ${data.id}`);
      return data;
    } catch (error) {
      console.error(`ReviewService.updateReview error for ${id}:`, error);
      throw error;
    }
  }

  async deleteReview(id: number): Promise<void> {
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);

      if (error) {
        console.error(`Error deleting review ${id}:`, error);
        throw new Error(error.message);
      }

      console.log(`Review deleted: ${id}`);
    } catch (error) {
      console.error(`ReviewService.deleteReview error for ${id}:`, error);
      throw error;
    }
  }

  async getAverageRating(): Promise<number> {
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
      console.error('ReviewService.getAverageRating error:', error);
      throw error;
    }
  }

  async getReviewsByRating(min: number, max: number): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .gte('rating', min)
        .lte('rating', max)
        .order('rating', { ascending: false });

      if (error) {
        console.error(
          `Error fetching reviews by rating (${min}-${max}):`,
          error
        );
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('ReviewService.getReviewsByRating error:', error);
      throw error;
    }
  }
}

export const reviewService = new ReviewService();
