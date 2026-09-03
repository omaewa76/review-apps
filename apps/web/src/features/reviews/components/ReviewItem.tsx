import React from 'react';
import { Button, Card, StarRating } from 'ui';
import { formatDate } from 'shared-utils';
import type { Review } from 'shared-types';
import styles from './ReviewItem.module.css';

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
    <Card variant="outlined" className={styles.reviewItem}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewUser}>
          <strong>{review.user_name}</strong>
          <span className={styles.reviewDate}>
            {formatDate(review.created_at)}
          </span>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      <div className={styles.reviewProject}>
        <a
          href={review.project_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectLink}
        >
          {review.project_url}
        </a>
      </div>

      <p className={styles.reviewFeedback}>{review.feedback}</p>

      <div className={styles.reviewActions}>
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
    </Card>
  );
};
