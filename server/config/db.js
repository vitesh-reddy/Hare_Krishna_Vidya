import mongoose from "mongoose";

const options = {
  maxPoolSize: 20,          
  socketTimeoutMS: 60000,   
  connectTimeoutMS: 30000,  
};

// Global cache (shared across Vercel warm starts)
let cached = global._mongoose;

if (!cached)
  cached = global._mongoose = { conn: null, promise: null };

const connectDB = async (DATABASE_URI) => {
  if (cached.conn) return cached.conn; // Reuse existing connection

  if (!cached.promise) {
    cached.promise = mongoose.connect(DATABASE_URI, options).then((mongoose) => {
      console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
