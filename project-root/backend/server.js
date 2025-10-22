import fridgeRoutes from './routes/fridge.js';  
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the backend's .env explicitly to avoid CWD issues
const envPath = path.resolve(__dirname, '.env');
const dotenvResult = dotenv.config({ path: envPath });
if (dotenvResult.error && process.env.NODE_ENV !== 'production') {
  // Non-fatal in case env vars are provided by the host environment
  console.warn(`No .env file found at ${envPath}. Using existing environment variables.`);
}
              // ✅ Load env first
const app = express();        // ✅ Define app before using it

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB and start server only after successful connection
let serverInstance;
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    serverInstance = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB. Server not started.');
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ message: 'Backend server is running 🚀' });
});

app.use('/api/fridge', fridgeRoutes);

// Serve static files from React frontend if built
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  // Express 5: use a RegExp for a catch-all route
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  console.warn(`Frontend build not found at ${frontendDistPath}. Skipping static file hosting.`);
}

// Export server for testing/ops to close gracefully if needed
export default serverInstance;
