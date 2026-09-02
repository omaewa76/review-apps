import { z } from 'zod';
import { CreateReviewSchema, UpdateReviewSchema } from '../types';

export const validateCreateReview = (data: unknown) => {
  try {
    const result = CreateReviewSchema.parse(data);
    return { success: true, data: result, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce<Record<string, string>>((acc, err) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      }, {});
      return { success: false, data: null, errors };
    }
    return {
      success: false,
      data: null,
      errors: { general: 'Validation failed' },
    };
  }
};

export const validateUpdateReview = (data: unknown) => {
  try {
    const result = UpdateReviewSchema.parse(data);
    return { success: true, data: result, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce<Record<string, string>>((acc, err) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      }, {});
      return { success: false, data: null, errors };
    }
    return {
      success: false,
      data: null,
      errors: { general: 'Validation failed' },
    };
  }
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
