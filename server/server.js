import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js"
import kitsRoutes from "./routes/kitsRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import groceryItemRoutes from "./routes/groceryItemRoutes.js"
import campaignRoutes from "./routes/campaignRoutes.js"
import fileUpload from "express-fileupload";

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
}));

app.use(morgan("tiny", {
  skip: (req) => req.url.match(/\.(css|js|png|jpg|ico|svg|woff2?)$/)
}));


app.use(express.json());
app.get("/", async (req, res) => {
});

app.use("/api/blogs", blogRoutes);
app.use("/api/kits", kitsRoutes);
app.use('/api/payments', paymentRoutes);
app.use("/api/grocery-items", groceryItemRoutes);
app.use("/api/campaigns", campaignRoutes);

app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);