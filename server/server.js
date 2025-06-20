import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js"
import kitsRoutes from "./routes/kitsRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"
import groceryItemRoutes from "./routes/groceryItemRoutes.js"

  import campaignRoutes from "./routes/campaignRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";

import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import Admin from "./models/Admin.js";
// console.clear();

dotenv.config();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";

const app = express();
app.use(fileUpload());
connectDB(MONGODB_URI);

// Enable CORS for frontend URL
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));


app.use(morgan("tiny", {
  skip: (req) => req.url.match(/\.(css|js|png|jpg|ico|svg|woff2?)$/)
}));

app.use(express.json());
app.use(cookieParser());
app.get("/", async (req, res) => {
});

app.use('/api/admin', adminRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/jobs', jobRoutes);
app.use("/api/kits", kitsRoutes);
app.use("/api/blogs", blogRoutes);
app.use('/api/payments', paymentRoutes);
app.use("/api/grocery-items", groceryItemRoutes);
app.use("/api/campaigns", campaignRoutes);

app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);
