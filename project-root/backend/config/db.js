import mongoose from 'mongoose';

const getMongoUri = () => {
  // Prefer explicit env var; allow Render-style DATABASE_URL fallback
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL || process.env.MONGO_URI;
  if (!uri) {
    throw new Error('Missing Mongo connection string (MONGODB_URI or DATABASE_URL)');
  }
  return uri;
};

const connectDB = async () => {
  const mongoUri = getMongoUri();
  try {
    // Mongoose >= 6 ignores useNewUrlParser/useUnifiedTopology and defaults are fine
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
