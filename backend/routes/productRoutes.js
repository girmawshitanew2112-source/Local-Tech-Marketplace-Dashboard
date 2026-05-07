import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();
router.route('/').get(getProducts).post(protect, authorize('seller', 'admin'), upload.array('images', 5), createProduct);
router.route('/:id').get(getProduct).put(protect, upload.array('images', 5), updateProduct).delete(protect, deleteProduct);
export default router;
