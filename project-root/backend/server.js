import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fridgeRouter from './routes/fridge.js';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Middleware
app.use(express.json());

// API routes
app.use('/api/fridge', fridgeRouter);
app.use('/api/auth', authRouter);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Serve frontend (for production)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, '../frontend/dist');

app.use(express.static(frontendDistPath));

// ✅ Works with Express 5 — avoids path-to-regexp errors
app.use((req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});
