import fridgeRoutes from './routes/fridge.js';  
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') }); // Ensure correct .env path
const app = express();        // ✅ Define app before using it

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB before starting the server
await connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running 🚀' });
});

app.use('/api/fridge', fridgeRoutes);

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server only after successful DB connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
