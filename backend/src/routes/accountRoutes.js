import express from 'express';
import { getAllAccounts, createAccount, deleteAccount, updateUserProfile, getUserTransactions, adminUpdateUser } from '../controllers/accountController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { User, Account } from '../models/index.js';
const router = express.Router();

// Admin routes
router.get('/', protect, adminOnly, getAllAccounts);
router.post('/', protect, adminOnly, createAccount);
router.delete('/:id', protect, adminOnly, deleteAccount);
router.put('/user/:id', protect, adminOnly, adminUpdateUser);

// User routes
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [Account]
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      status: user.status,
      address: user.address,
      profilePicture: user.profilePicture,
      account: user.Accounts[0] || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/profile', protect, updateUserProfile);
router.get('/transactions', protect, getUserTransactions);

export default router;