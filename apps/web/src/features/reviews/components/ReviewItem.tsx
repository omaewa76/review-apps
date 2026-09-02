import React from 'react';
import { Button, Card, StarRating } from 'ui';
import { formatDate } from 'shared-utils';
import type { Review } from 'shared-types';
import { style } from './ReviewItem.module.css';

interface ReviewItemProps {
  review: Review;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <Card variant="outlined" className="review-item">
      <div className="review-header">
        <div className="review-user">
          <strong>{review.user_name}</strong>
          <span className="review-date">{formatDate(review.created_at)}</span>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      <div className="review-project">
        <a
          href={review.project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          {review.project_url}
        </a>
      </div>

      <p className="review-feedback">{review.feedback}</p>

      <div className="review-actions">
        <Button variant="secondary" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Menghapus...' : 'Hapus'}
        </Button>
      </div>

      <style>{style}</style>
    </Card>
  );
};
