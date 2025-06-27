import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetEmail } from "../utils/sendMail.js";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1hr" });

  const mode = process.env.NODE_ENV;
  const isProduction = mode === "production";

  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
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

// GET /api/admin/me
export const getAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("name email");
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  res.status(200).json(admin);
};

// PATCH /api/admin/update-profile
export const updateAdminProfile = async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ message: "Current password is required" });
  }

  const admin = await Admin.findById(req.user.id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await admin.matchPassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect current password" });
  }

  // Update name/email
  admin.name = name || admin.name;
  admin.email = email || admin.email;

  // Optional: update password
  if (newPassword) {
    admin.password = newPassword; // will be hashed in pre-save hook
  }

  await admin.save();
  res.status(200).json({ message: "Profile updated successfully", name: admin.name, email: admin.email });
};



export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  admin.resetToken = resetToken;
  admin.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await admin.save();

  const resetURL = `${process.env.ADMIN_URL}/reset-password?token=${resetToken}`;
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
