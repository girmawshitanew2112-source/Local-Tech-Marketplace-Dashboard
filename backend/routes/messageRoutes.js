import express from 'express';
import { getMessages, getNotifications, markNotificationRead, sendMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.route('/').get(getMessages).post(sendMessage);
router.get('/notifications', getNotifications);
router.patch('/notifications/:id/read', markNotificationRead);
export default router;
