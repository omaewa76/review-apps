import React from 'react';
import { styles } from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const variantClass =
    styles[`variant-${variant}`] || styles['variant-default'];

  return (
    <div className={`${styles.card} ${variantClass} ${className}`}>
      {children}
    </div>
  );
};
