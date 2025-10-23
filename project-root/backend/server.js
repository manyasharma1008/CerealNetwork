import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Serve frontend
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// API routes
app.use('/api/fridge', fridgeRouter);
app.use('/api/auth', authRouter);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
