import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import User from '../models/User.js';

const router = express.Router();

// Common route - for all logged-in users
router.get('/', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ message: `Welcome ${user.name}`, role: user.role });
});

// Admin-only route
router.get('/admin', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  res.json({ message: 'Admin dashboard loaded' });
});

// Teacher-only route
router.get('/teacher', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.role !== 'teacher') {
    return res.status(403).json({ message: 'Access denied: Teachers only' });
  }
  res.json({ message: 'Teacher dashboard loaded' });
});

export default router;
