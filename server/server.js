import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import groceryItemRoutes from "./routes/groceryItemRoutes.js"
import kitsRoutes from "./routes/kitsRoutes.js"
// console.clear();

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";
connectDB(MONGODB_URI);

app.use(morgan("tiny", {
  skip: (req) => req.url.match(/\.(css|js|png|jpg|ico|svg|woff2?)$/)
}));


app.use(express.json());
app.get("/", async (req, res) => {
});

app.use("/api/grocery-items", groceryItemRoutes);
app.use("/api/kits", kitsRoutes);

app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);
