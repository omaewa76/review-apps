import React, { useState } from 'react';
import styles from './RatingInput.module.css';

export interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  value,
  onChange,
  max = 5,
  disabled = false,
  size = 'md',
  label,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const displayRating = hoveredRating ?? value;

  const handleClick = (rating: number) => {
    if (!disabled) {
      onChange(rating === value ? 0 : rating);
    }
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.stars}>
        {Array.from({ length: max }, (_, i) => i + 1).map(star => (
          <span
            key={star}
            className={`${styles.star} ${styles[`size-${size}`]} ${
              star <= displayRating ? styles.active : ''
            } ${disabled ? styles.disabled : ''}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !disabled && setHoveredRating(star)}
            onMouseLeave={() => !disabled && setHoveredRating(null)}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={`Rating ${star} dari ${max}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};
