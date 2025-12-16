import express from "express";
import { loginAdmin, logoutAdmin, getAdminProfile, forgotPassword, resetPassword, updateAdminProfile} from "../controllers/adminController.js";
import { protectAdmin, validateCreds } from "../middlewares/authMiddleware.js";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", validateCreds, loginAdmin);
router.get("/logout", logoutAdmin);
router.get("/me", protectAdmin, getAdminProfile);
router.patch("/update-profile", protectAdmin, updateAdminProfile);
router.post("/forgot-password", validateCreds, forgotPassword);
router.post("/reset-password", resetPassword);

router.post('/create-default-admin', validateCreds, async (req, res) => {
  try {
    const existing = await Admin.findOne({ email: 'admin@demo.com' });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({
      name: req.body.name || 'Default Admin',
      email: req.body.email,
      password: req.body.password, 
    });

    await admin.save();

    res.status(201).json({
      message: 'Default admin created successfully',
      email: admin.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
