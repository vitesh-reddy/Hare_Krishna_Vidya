import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import kitsRoutes from "./routes/kitsRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import groceryItemRoutes from "./routes/groceryItemRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"
import campaignRoutes from "./routes/campaignRoutes.js"


import adminRoutes from "./routes/adminRoutes.js";
import jobAdminRoutes from "./routes/jobAdminRoutes.js";
import blogAdminRoutes from "./routes/blogAdminRoutes.js";  
import kitsAdminRoutes from "./routes/kitsAdminRoutes.js";
import updatesAdminRoutes from "./routes/updatesAdminRoutes.js";
import groceryItemAdminRoutes from "./routes/groceryItemAdminRoutes.js";
import applicationAdminRoutes from "./routes/applicationAdminRoutes.js";

import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const ADMIN_URL = process.env.ADMIN_URL;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";


const app = express();
app.use(fileUpload());
app.use(cookieParser())
connectDB(MONGODB_URI);

// Enable CORS for frontend URL
app.use(cors({
  origin: [CLIENT_URL, ADMIN_URL],
  credentials: true
}));

app.use(morgan("tiny", {
  skip: (req) => req.url.match(/\.(css|js|png|jpg|ico|svg|woff2?)$/)
}));


app.use(express.json());
app.get("/", async (req, res) => {
});

app.use("/api/admin", adminRoutes);
app.use("/api/admin/jobs", jobAdminRoutes);
app.use("/api/admin/blogs", blogAdminRoutes);
app.use("/api/admin/kits", kitsAdminRoutes);
app.use("/api/admin/grocery-items", groceryItemAdminRoutes);
app.use('/api/admin/applications', applicationAdminRoutes);
app.use("/api/admin/updates", updatesAdminRoutes);


app.use("/api/jobs", jobRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/kits", kitsRoutes);
app.use('/api/payments', paymentRoutes);
app.use("/api/grocery-items", groceryItemRoutes);
app.use('/api/applications', applicationRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);