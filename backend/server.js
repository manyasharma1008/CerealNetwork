import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import fridgeRoutes from './routes/fridge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend .env (if present)
const envPath = path.resolve(__dirname, '.env');
const dotenvResult = dotenv.config({ path: envPath });
if (dotenvResult.error && process.env.NODE_ENV !== 'production') {
  console.warn(`No .env file found at ${envPath}. Using existing environment variables.`);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount only API routers required by the backend
app.use('/api/auth', authRoutes);
app.use('/api/fridge', fridgeRoutes);

// Health check for uptime monitoring (Render, load balancers, UptimeRobot, etc.)
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Fallback for any non-matching route: return JSON 404 (do NOT serve frontend)
app.all('*', (_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Central error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err?.status || 500;
  res.status(status).json({
    error: err?.message || 'Internal Server Error',
  });
});

// Connect to DB then start server
let serverInstance;
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    serverInstance = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB. Server not started.', err);
    process.exit(1);
  });

// Export serverInstance for tests/ops (may be undefined until DB connects)
export default serverInstance
