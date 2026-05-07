import express from 'express';
import { overview, sellerAnalytics } from '../controllers/analyticsController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/overview', protect, authorize('admin'), overview);
router.get('/seller', protect, authorize('seller', 'admin'), sellerAnalytics);
export default router;
