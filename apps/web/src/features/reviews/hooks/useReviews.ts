import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { reviewApi } from '../api/reviewApi';
import { subscribeToReviews } from '@/lib/supabaseClient';
import type { Review, CreateReviewInput, UpdateReviewInput } from '../types';

export const REVIEWS_QUERY_KEY = 'reviews';

export const useReviews = () => {
  const queryClient = useQueryClient();

  // Query: Get all reviews with sorting
  const {
    data: reviews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [REVIEWS_QUERY_KEY],
    queryFn: reviewApi.getReviews,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  });

  // Real-time subscription untuk live updates
  useEffect(() => {
    // Handler untuk insert
    const handleInsert = useCallback(
      (payload: any) => {
        const newReview = payload.new as Review;
        queryClient.setQueryData<Review[]>([REVIEWS_QUERY_KEY], old => {
          if (!old) return [newReview];
          // Cegah duplikat
          if (old.some(r => r.id === newReview.id)) return old;
          return [newReview, ...old].sort((a, b) => b.rating - a.rating);
        });
      },
      [queryClient]
    );

    // Handler untuk update
    const handleUpdate = useCallback(
      (payload: any) => {
        const updatedReview = payload.new as Review;
        queryClient.setQueryData<Review[]>([REVIEWS_QUERY_KEY], old => {
          if (!old) return [updatedReview];
          return old
            .map(r => (r.id === updatedReview.id ? updatedReview : r))
            .sort((a, b) => b.rating - a.rating);
        });
      },
      [queryClient]
    );

    // Handler untuk delete
    const handleDelete = useCallback(
      (payload: any) => {
        const deletedId = payload.old.id;
        queryClient.setQueryData<Review[]>([REVIEWS_QUERY_KEY], old => {
          if (!old) return [];
          return old.filter(r => r.id !== deletedId);
        });
      },
      [queryClient]
    );

    // Subscribe ke perubahan realtime
    const subscription = subscribeToReviews(
      handleInsert,
      handleUpdate,
      handleDelete
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  // Mutation: Create review
  const createReview = useMutation({
    mutationFn: reviewApi.createReview,
    onSuccess: () => {
      // Invalidate untuk memastikan data terbaru
      queryClient.invalidateQueries({ queryKey: [REVIEWS_QUERY_KEY] });
    },
    onError: error => {
      console.error('Failed to create review:', error);
    },
  });

  // Mutation: Update review
  const updateReview = useMutation({
    mutationFn: reviewApi.updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEWS_QUERY_KEY] });
    },
    onError: error => {
      console.error('Failed to update review:', error);
    },
  });

  // Mutation: Delete review
  const deleteReview = useMutation({
    mutationFn: reviewApi.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEWS_QUERY_KEY] });
    },
    onError: error => {
      console.error('Failed to delete review:', error);
    },
  });

  // Get average rating
  const getAverageRating = useCallback(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  return {
    reviews,
    isLoading,
    error,
    refetch,
    createReview: createReview.mutateAsync,
    updateReview: updateReview.mutateAsync,
    deleteReview: deleteReview.mutateAsync,
    isCreating: createReview.isPending,
    isUpdating: updateReview.isPending,
    isDeleting: deleteReview.isPending,
    averageRating: getAverageRating(),
  };
};
