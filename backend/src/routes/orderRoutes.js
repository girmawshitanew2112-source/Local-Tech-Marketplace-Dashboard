import express from 'express';
import { createOrder, getOrder, listOrders, updateDeliveryStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(protect);
router.route('/').get(listOrders).post(createOrder);
router.get('/:id', getOrder);
router.patch('/:id/status', updateDeliveryStatus);
export default router;
