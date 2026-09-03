import React from 'react';
import { Card } from 'ui';
import { ReviewItem } from './ReviewItem';
import type { Review } from 'shared-types';
import styles from './ReviewList.module.css';

interface ReviewListProps {
  reviews: Review[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  onEdit,
  onDelete,
  deletingId,
}) => {
  if (reviews.length === 0) {
    return (
      <Card variant="outlined">
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon}>📝</p>
          <p className={styles.emptyTitle}>Belum Ada Review</p>
          <p className={styles.emptyDescription}>
            Jadilah yang pertama memberikan masukan untuk proyek Anda!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className={styles.reviewList}>
      {reviews.map(review => (
        <ReviewItem
          key={review.id}
          review={review}
          onEdit={() => onEdit(review.id)}
          onDelete={() => onDelete(review.id)}
          isDeleting={deletingId === review.id}
        />
      ))}
    </div>
  );
};
