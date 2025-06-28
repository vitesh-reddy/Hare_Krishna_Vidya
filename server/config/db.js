import mongoose from "mongoose";

let isConnected = false;

const connectDB = async (DATABASE_URI) => {
  if (isConnected) return 

  try {
    const conn = await mongoose.connect(DATABASE_URI, {
      maxPoolSize: 20,        
      socketTimeoutMS: 60000, 
      connectTimeoutMS: 30000,
    });

    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;
