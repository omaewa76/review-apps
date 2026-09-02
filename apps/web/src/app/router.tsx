import { createBrowserRouter } from 'react-router-dom';

// Lazy load pages
const HomePage = React.lazy(() => import('../features/reviews/pages/HomePage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </React.Suspense>
    ),
  },
]);
