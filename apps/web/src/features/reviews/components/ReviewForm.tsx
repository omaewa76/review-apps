import React, { useState } from 'react';
import { Button, Card, RatingInput } from 'ui';
import { validateReviewInput } from 'shared-utils';
import type { CreateReviewInput } from '../types';

interface ReviewFormProps {
  onSubmit: (data: CreateReviewInput) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<CreateReviewInput>;
  isEditing?: boolean;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData = {},
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<CreateReviewInput>({
    user_name: initialData.user_name || '',
    project_url: initialData.project_url || '',
    feedback: initialData.feedback || '',
    rating: initialData.rating || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Adapt validator untuk field names Supabase
    const validation = validateReviewInput({
      userName: formData.user_name,
      projectUrl: formData.project_url,
      feedback: formData.feedback,
      rating: formData.rating,
    });

    if (!validation.isValid) {
      setErrors({
        user_name: validation.errors.userName || '',
        project_url: validation.errors.projectUrl || '',
        feedback: validation.errors.feedback || '',
        rating: validation.errors.rating || '',
      });
      return;
    }

    setErrors({});
    await onSubmit(formData);

    if (!isEditing) {
      setFormData({
        user_name: '',
        project_url: '',
        feedback: '',
        rating: 0,
      });
    }
  };

  return (
    <Card variant="elevated">
      <form onSubmit={handleSubmit} className="review-form">
        <h3 className="mb-2">
          {isEditing ? 'Edit Review' : 'Tambah Review Baru'}
        </h3>

        <div className="form-group">
          <label htmlFor="user_name">Nama Pengguna</label>
          <input
            id="user_name"
            name="user_name"
            type="text"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Masukkan nama Anda"
            className={`form-input ${errors.user_name ? 'error' : ''}`}
            disabled={isLoading}
          />
          {errors.user_name && (
            <span className="form-error">{errors.user_name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="project_url">URL Proyek / Link GitHub</label>
          <input
            id="project_url"
            name="project_url"
            type="url"
            value={formData.project_url}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
            className={`form-input ${errors.project_url ? 'error' : ''}`}
            disabled={isLoading}
          />
          {errors.project_url && (
            <span className="form-error">{errors.project_url}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Masukan</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Tuliskan masukan Anda untuk proyek ini..."
            className={`form-textarea ${errors.feedback ? 'error' : ''}`}
            rows={4}
            disabled={isLoading}
          />
          {errors.feedback && (
            <span className="form-error">{errors.feedback}</span>
          )}
        </div>

        <div className="form-group">
          <RatingInput
            value={formData.rating}
            onChange={handleRatingChange}
            disabled={isLoading}
            size="lg"
            label="Rating"
          />
          {errors.rating && <span className="form-error">{errors.rating}</span>}
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="mt-2"
        >
          {isLoading
            ? isEditing
              ? 'Menyimpan...'
              : 'Menyimpan...'
            : isEditing
              ? 'Simpan Perubahan'
              : 'Kirim Review'}
        </Button>
      </form>
    </Card>
  );
};
