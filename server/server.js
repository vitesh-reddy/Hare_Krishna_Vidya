import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import securityMiddleware from "./middlewares/securityMiddleware.js";
import rateLimitMiddleware from "./middlewares/rateLimitMiddleware.js";
import uploadMiddleware from "./middlewares/uploadMiddleware.js";
import xssMiddleware from "./middlewares/xssMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

import jobRoutes from "./routes/jobRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import kitsRoutes from "./routes/kitsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import groceryItemRoutes from "./routes/groceryItemRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";

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
const ADMIN_URL = process.env.ADMIN_URL || "http://localhost:5174";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Hare_Krishna_Vidya";

connectDB(MONGODB_URI);

app.set("trust proxy", 1);

app.use(morgan("tiny", {skip: req => req.url.match(/\.(css|js|png|jpg|ico|svg|woff2?)$/)}));

app.use(express.json({ limit: process.env.PAYLOAD_LIMIT || "1mb" }));
app.use(express.urlencoded({ extended: true, limit: process.env.PAYLOAD_LIMIT || "1mb" }));
app.use(cookieParser());

app.use(cors({origin: [CLIENT_URL, ADMIN_URL], credentials: true}));

app.use(securityMiddleware);
// app.use(rateLimitMiddleware);
app.use(uploadMiddleware);
app.use(xssMiddleware);

app.use("/api/jobs", jobRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/kits", kitsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/grocery-items", groceryItemRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/campaigns", campaignRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/admin/jobs", jobAdminRoutes);
app.use("/api/admin/blogs", blogAdminRoutes);
app.use("/api/admin/kits", kitsAdminRoutes);
app.use("/api/admin/grocery-items", groceryItemAdminRoutes);
app.use("/api/admin/applications", applicationAdminRoutes);
app.use("/api/admin/updates", updatesAdminRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/health", (_, res) => res.send("OK"));

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));