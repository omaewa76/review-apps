import React from 'react';
import { styles } from './StarRating.module.css';

export interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  size = 'md',
  showLabel = true,
}) => {
  const filledStars = Math.round(rating);

  return (
    <div className={styles.container}>
      <div className={styles.stars}>
        {Array.from({ length: max }, (_, i) => i + 1).map(star => (
          <span
            key={star}
            className={`${styles.star} ${styles[`size-${size}`]} ${
              star <= filledStars ? styles.filled : ''
            }`}
          >
            ★
          </span>
        ))}
      </div>
      {showLabel && (
        <span className={styles.label}>
          {rating.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
};
