import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetEmail } from "../utils/sendMail.js";
import bcrypt from "bcryptjs";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1hr" });

  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 60 * 60 * 1000,
  });

  return token;
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  generateToken(res, admin._id);
  res.status(200).json({ message: "Login successful" });
};

export const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken");
  res.status(200).json({ message: "Logged out" });
};

export const getAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("-password");
  res.status(200).json(admin);
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  admin.resetToken = resetToken;
  admin.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await admin.save();

  const resetURL = `${process.env.FRONTEND_URL}/admin/reset-password?token=${resetToken}`;
  await sendResetEmail(admin.email, resetURL);

  res.status(200).json({ message: "Reset email sent" });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const admin = await Admin.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!admin) return res.status(400).json({ message: "Invalid or expired token" });

  admin.password = newPassword;
  admin.resetToken = undefined;
  admin.resetTokenExpiry = undefined;
  await admin.save();

  res.status(200).json({ message: "Password reset successful" });
};
