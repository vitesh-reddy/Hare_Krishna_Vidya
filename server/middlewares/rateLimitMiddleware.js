import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.REQUEST_LIMIT) || 100
});