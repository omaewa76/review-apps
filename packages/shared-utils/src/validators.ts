export const validateReviewInput = (input: {
  userName: string;
  projectUrl: string;
  feedback: string;
  rating: number;
}) => {
  const errors: Record<string, string> = {};

  if (!input.userName.trim() || input.userName.length < 2) {
    errors.userName = 'Nama pengguna minimal 2 karakter';
  }

  if (!input.projectUrl.trim() || !isValidUrl(input.projectUrl)) {
    errors.projectUrl = 'URL proyek tidak valid';
  }

  if (!input.feedback.trim() || input.feedback.length < 10) {
    errors.feedback = 'Masukan minimal 10 karakter';
  }

  if (input.rating < 1 || input.rating > 5) {
    errors.rating = 'Rating harus antara 1-5 bintang';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
