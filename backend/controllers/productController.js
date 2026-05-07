import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const productQuery = (req) => {
  const { search, category, minPrice, maxPrice, condition, seller, status = 'active' } = req.query;
  const query = { status };
  if (search) query.$text = { $search: search };
  if (category) query.category = category;
  if (condition) query.condition = condition;
  if (seller) query.seller = seller;
  if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
  return query;
};

export const getProducts = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 12, 50);
  const skip = (page - 1) * limit;
  const sort = req.query.sort || '-createdAt';
  const query = productQuery(req);
  const [items, total] = await Promise.all([
    Product.find(query).populate('seller', 'name email avatar').sort(sort).skip(skip).limit(limit),
    Product.countDocuments(query)
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('seller', 'name email phone avatar');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const images = (req.files || []).map((file) => `/uploads/${file.filename}`);
  const product = await Product.create({ ...req.body, images, seller: req.user._id });
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  if (String(product.seller) !== String(req.user._id) && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Only the seller or admin can update this product');
  }
  const images = (req.files || []).map((file) => `/uploads/${file.filename}`);
  Object.assign(product, req.body, images.length ? { images: [...product.images, ...images] } : {});
  await product.save();
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  if (String(product.seller) !== String(req.user._id) && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Only the seller or admin can delete this product');
  }
  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});
