import { Request, Response } from 'express';
import { reviewService } from '../services/reviewService';
import {
  validateCreateReview,
  validateUpdateReview,
} from '../utils/validators';

export class ReviewController {
  async getAllReviews(req: Request, res: Response) {
    try {
      const reviews = await reviewService.getAllReviews();
      res.json({
        success: true,
        data: reviews,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error in getAllReviews:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch reviews',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async getReviewById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid review ID',
          timestamp: new Date().toISOString(),
        });
      }

      const review = await reviewService.getReviewById(id);
      if (!review) {
        return res.status(404).json({
          success: false,
          error: 'Review not found',
          timestamp: new Date().toISOString(),
        });
      }

      res.json({
        success: true,
        data: review,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error in getReviewById:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch review',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async createReview(req: Request, res: Response) {
    try {
      const validation = validateCreateReview(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          errors: validation.errors,
          timestamp: new Date().toISOString(),
        });
      }

      const review = await reviewService.createReview(validation.data);
      res.status(201).json({
        success: true,
        data: review,
        message: 'Review created successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error in createReview:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create review',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async updateReview(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid review ID',
          timestamp: new Date().toISOString(),
        });
      }

      const validation = validateUpdateReview({ id, ...req.body });
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          errors: validation.errors,
          timestamp: new Date().toISOString(),
        });
      }

      const review = await reviewService.updateReview(validation.data);
      res.json({
        success: true,
        data: review,
        message: 'Review updated successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error in updateReview:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update review',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async deleteReview(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid review ID',
          timestamp: new Date().toISOString(),
        });
      }

      await reviewService.deleteReview(id);
      res.json({
        success: true,
        message: 'Review deleted successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error in deleteReview:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete review',
        timestamp: new Date().toISOString(),
      });
    }
  }

  async getAverageRating(req: Request, res: Response) {
    try {
      const average = await reviewService.getAverageRating();
      res.json({
        success: true,
        data: { average },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error in getAverageRating:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get average rating',
        timestamp: new Date().toISOString(),
      });
    }
  }
}

export const reviewController = new ReviewController();
