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

  // Helpful diagnostics for common misconfigurations
  const isLocalhost = /(^mongodb:\/\/|^mongodb\+srv:\/\/).*(@)?(localhost|127\.0\.0\.1|\[::1\])/i.test(mongoUri);
  if (isLocalhost && process.env.DOCKER || process.env.CONTAINER || process.env.KUBERNETES_SERVICE_HOST) {
    console.warn('Detected localhost Mongo URI inside a containerized environment.');
    console.warn('If MongoDB runs in another container, use its service name instead of localhost.');
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      // keepAlive helps avoid ECONNRESET on idle connections
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000,
      // Family 4 forces IPv4; helps avoid ::1 lookups when IPv6 misconfigured
      family: 4,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Provide targeted hints for ECONNREFUSED
    if (error?.message?.includes('ECONNREFUSED') || error?.code === 'ECONNREFUSED') {
      console.error('Connection refused when connecting to MongoDB.');
      console.error('Checklist:');
      console.error(' - Ensure MongoDB is running and reachable');
      console.error(' - Verify MONGODB_URI is correct (and not pointing to localhost from inside a container)');
      console.error(' - Check network/firewall rules and that the port is open');
    } else if (error?.name === 'MongooseServerSelectionError') {
      console.error('Failed to discover a suitable MongoDB server.');
    }
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
