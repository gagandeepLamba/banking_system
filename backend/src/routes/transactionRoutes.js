import express from 'express';
import { credit, debit } from '../controllers/transactionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/credit', protect, adminOnly, credit);
router.post('/debit', protect, adminOnly, debit);
export default router;
