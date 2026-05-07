import Product from '../models/Product.js';
import { ApiError, asyncHandler } from '../utils/errors.js';
import { publicUploadPath } from '../middleware/uploadMiddleware.js';

const buildQuery = (query) => {
  const filter = {};
  if (query.search) filter.$text = { $search: query.search };
  if (query.category) filter.category = query.category;
  if (query.condition) filter.condition = query.condition;
  if (query.status) filter.status = query.status;
  if (query.minPrice || query.maxPrice) filter.price = { ...(query.minPrice && { $gte: Number(query.minPrice) }), ...(query.maxPrice && { $lte: Number(query.maxPrice) }) };
  return filter;
};

export const getProducts = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 12, 50);
  const filter = buildQuery(req.query);
  const sort = req.query.sort || '-createdAt';
  const [items, total] = await Promise.all([
    Product.find(filter).populate('seller', 'name email location').sort(sort).skip((page - 1) * limit).limit(limit),
    Product.countDocuments(filter)
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true }).populate('seller', 'name email phone location');
  if (!product) throw new ApiError(404, 'Product not found');
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const image = publicUploadPath(req.file);
  const product = await Product.create({ ...req.body, seller: req.user._id, images: image ? [image] : [] });
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');
  if (req.user.role !== 'admin' && product.seller.toString() !== req.user._id.toString()) throw new ApiError(403, 'Not allowed');
  Object.assign(product, req.body);
  const image = publicUploadPath(req.file);
  if (image) product.images.push(image);
  await product.save();
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');
  if (req.user.role !== 'admin' && product.seller.toString() !== req.user._id.toString()) throw new ApiError(403, 'Not allowed');
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});
