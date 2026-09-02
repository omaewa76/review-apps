import React from 'react';
import { Card } from 'ui';
import { ReviewItem } from './ReviewItem';
import type { Review } from 'shared-types';
import { style } from './ReviewList.module.css';

interface ReviewListProps {
  reviews: Review[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  if (reviews.length === 0) {
    return (
      <Card variant="outlined">
        <div className="empty-state">
          <p className="empty-icon">📝</p>
          <p className="empty-title">Belum Ada Review</p>
          <p className="empty-description">
            Jadilah yang pertama memberikan masukan untuk proyek Anda!
          </p>
        </div>
        <style>{style}</style>
      </Card>
    );
  }

  return (
    <div className="review-list">
      {reviews.map(review => (
        <ReviewItem
          key={review.id}
          review={review}
          onEdit={() => onEdit(review.id)}
          onDelete={() => onDelete(review.id)}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};
