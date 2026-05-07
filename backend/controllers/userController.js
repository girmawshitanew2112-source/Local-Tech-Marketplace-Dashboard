import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort('-createdAt');
  res.json(users);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ message: 'User deactivated' });
});

export const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const exists = user.wishlist.some((id) => String(id) === req.params.productId);
  user.wishlist = exists ? user.wishlist.filter((id) => String(id) !== req.params.productId) : [...user.wishlist, req.params.productId];
  await user.save();
  res.json({ wishlist: user.wishlist });
});

export const analytics = asyncHandler(async (req, res) => {
  const [users, products, orders, revenueAgg, byCategory, recentOrders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, revenue: { $sum: '$total' } } }]),
    Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Order.find().sort('-createdAt').limit(8).populate('buyer', 'name')
  ]);
  res.json({
    totals: { users, products, orders, revenue: revenueAgg[0]?.revenue || 0 },
    byCategory,
    recentOrders,
    monthlyRevenue: [1200, 2600, 3100, 4900, 6200, 8300].map((value, index) => ({ month: `M${index + 1}`, revenue: value }))
  });
});
