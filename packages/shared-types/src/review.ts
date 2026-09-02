export interface Review {
  id: number;
  userName: string;
  projectUrl: string;
  feedback: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateReviewInput {
  userName: string;
  projectUrl: string;
  feedback: string;
  rating: number;
}

export interface UpdateReviewInput extends Partial<CreateReviewInput> {
  id: number;
}
