import express from 'express';
import { createNotification, listNotifications, markNotificationRead } from '../controllers/notificationController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(protect);
router.route('/').get(listNotifications).post(authorize('admin'), createNotification);
router.patch('/:id/read', markNotificationRead);
export default router;
