import express from 'express';
import { createMessage, listMessages, markMessageRead } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.use(protect);
router.route('/').get(listMessages).post(createMessage);
router.patch('/:id/read', markMessageRead);
export default router;
