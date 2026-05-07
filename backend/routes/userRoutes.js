import express from 'express';
import { analytics, deleteUser, getUsers, toggleWishlist, updateUser } from '../controllers/userController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/analytics', authorize('admin', 'seller'), analytics);
router.patch('/wishlist/:productId', toggleWishlist);
router.route('/').get(authorize('admin'), getUsers);
router.route('/:id').put(authorize('admin'), updateUser).delete(authorize('admin'), deleteUser);
export default router;
