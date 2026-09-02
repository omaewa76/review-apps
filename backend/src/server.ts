import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import reviewRoutes from './routes/reviewRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { corsOptions } from './middlewares/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging dengan morgan (console)
app.use(morgan(process.env.LOG_FORMAT || 'combined'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'project-review-backend',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/reviews', reviewRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    timestamp: new Date().toISOString(),
  });
});

// Error handler
app.use(errorHandler);

export { app };
