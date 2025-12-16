import { z } from "zod";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const credSchema = z.object({
  email: z.string().email(),
});

export const validateCreds = (req, res, next) => {
  try {
    credSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid login input" });
  }
};