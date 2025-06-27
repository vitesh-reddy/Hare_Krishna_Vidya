import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Client Route Imports
import jobRoutes from "./routes/jobRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import kitsRoutes from "./routes/kitsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import groceryItemRoutes from "./routes/groceryItemRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";

// Amdin Route Imports
import adminRoutes from "./routes/adminRoutes.js";
import jobAdminRoutes from "./routes/jobAdminRoutes.js";
import blogAdminRoutes from "./routes/blogAdminRoutes.js";
import kitsAdminRoutes from "./routes/kitsAdminRoutes.js";
import updatesAdminRoutes from "./routes/updatesAdminRoutes.js";
import groceryItemAdminRoutes from "./routes/groceryItemAdminRoutes.js";
import applicationAdminRoutes from "./routes/applicationAdminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const ADMIN_URL = process.env.ADMIN_URL || "http://localhost:5174"
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";

if (!MONGODB_URI || !CLIENT_URL || !ADMIN_URL) {
  throw new Error("Missing required environment variables.");
}

connectDB(MONGODB_URI);
app.use(express.json({ limit: process.env.PAYLOAD_LIMIT || '1mb' }));


// Security middlewares
app.disable("x-powered-by");
app.use(helmet());

// custom XSS Sanitizer
app.use((req, res, next) => {
  if(req.path.startsWith('/api/admin/blogs')) return next();
  const sanitize = obj => {
    if (typeof obj !== 'object' || obj === null) return;
    for (const key in obj) {
      if (typeof obj[key] === 'string') obj[key] = xss(obj[key]);
      else if (typeof obj[key] === 'object') sanitize(obj[key]);
    }
  };
  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
});

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later.",
}));

// File upload & cookie parser
app.use(fileUpload({
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  abortOnLimit: true,
  safeFileNames: true,
  preserveExtension: true
}));
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: [CLIENT_URL, ADMIN_URL],
  credentials: true,
}));


app.use(morgan("tiny", {
  skip: (req) => /\.(css|js|png|jpg|ico|svg|woff2?)$/.test(req.url),
}));

// Client API Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/kits", kitsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/grocery-items", groceryItemRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/campaigns", campaignRoutes);

// Admin API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/jobs", jobAdminRoutes);
app.use("/api/admin/blogs", blogAdminRoutes);
app.use("/api/admin/kits", kitsAdminRoutes);
app.use("/api/admin/grocery-items", groceryItemAdminRoutes);
app.use("/api/admin/applications", applicationAdminRoutes);
app.use("/api/admin/updates", updatesAdminRoutes);

// Static upload path
app.use("/uploads", express.static("uploads"));

// Health check endpoint
app.get("/health", (req, res) => res.send("OK"));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);