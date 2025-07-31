import jwt from 'jsonwebtoken';
import Admin from "../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;
    if (!token) 
      return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded || !decoded.id) 
      return res.status(401).json({ message: 'Invalid token' });
    
    const admin = await Admin.findById(decoded.id);

    if (!admin) 
      return res.status(401).json({ message: 'Admin not found' });    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
