import React, { useState } from 'react';
import { Button, Card, StarRating } from 'ui';
import { useReviews } from '../hooks/useReviews';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewList } from '../components/ReviewList';
import type { CreateReviewInput } from 'shared-types';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const {
    reviews,
    isLoading,
    createReview,
    updateReview,
    deleteReview,
    isCreating,
    isUpdating,
    averageRating,
  } = useReviews();

  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreateReview = async (data: CreateReviewInput) => {
    await createReview(data);
  };

  const handleUpdateReview = async (data: CreateReviewInput) => {
    if (editingReviewId) {
      await updateReview({ id: editingReviewId, ...data });
      setEditingReviewId(null);
    }
  };

  const handleEdit = (id: number) => {
    setEditingReviewId(id);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus review ini?')) {
      setDeletingId(id);
      await deleteReview(id);
      setDeletingId(null);
    }
  };

  const editingReview = editingReviewId
    ? reviews.find(r => r.id === editingReviewId)
    : null;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Memuat review...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>📝 Project Review App</h1>
        <p className={styles.subtitle}>
          Berikan masukan untuk proyek yang sudah Anda buat
        </p>
      </header>

      <section className={styles.statsSection}>
        <Card variant="elevated">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Review</span>
              <span className={styles.statValue}>{reviews.length}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Rata-rata Rating</span>
              <div className={styles.statRating}>
                <StarRating rating={averageRating} size="lg" showLabel />
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className={styles.formSection}>
        <ReviewForm
          onSubmit={editingReview ? handleUpdateReview : handleCreateReview}
          isLoading={isCreating || isUpdating}
          initialData={editingReview || {}}
          isEditing={!!editingReview}
        />
        {editingReview && (
          <Button
            variant="secondary"
            onClick={handleCancelEdit}
            className={styles.cancelEditBtn}
          >
            Batalkan Edit
          </Button>
        )}
      </section>

      <section className={styles.listSection}>
        <ReviewList
          reviews={reviews}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      </section>
    </div>
  );
};
