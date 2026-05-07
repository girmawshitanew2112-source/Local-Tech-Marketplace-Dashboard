import express from 'express';
import { createOrder, getOrders, updateDeliveryStatus } from '../controllers/orderController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.route('/').get(getOrders).post(authorize('buyer', 'admin'), createOrder);
router.patch('/:id/delivery', authorize('seller', 'admin'), updateDeliveryStatus);
export default router;
