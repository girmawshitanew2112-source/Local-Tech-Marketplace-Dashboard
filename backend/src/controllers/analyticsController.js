import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/errors.js';

export const overview = asyncHandler(async (_req, res) => {
  const [users, products, orders, revenueAgg, monthlyRevenue, usersByRole] = await Promise.all([
    User.countDocuments({ isActive: true }),
    Product.countDocuments({ status: 'active' }),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, revenue: { $sum: '$total' } } }]),
    Order.aggregate([{ $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, revenue: { $sum: '$total' }, orders: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }])
  ]);
  res.json({ users, products, orders, revenue: revenueAgg[0]?.revenue || 0, monthlyRevenue, usersByRole });
});

export const sellerAnalytics = asyncHandler(async (req, res) => {
  const seller = req.user._id;
  const [products, orders] = await Promise.all([
    Product.find({ seller }).sort('-createdAt'),
    Order.find({ 'items.seller': seller }).sort('-createdAt')
  ]);
  const revenue = orders.reduce((sum, order) => sum + order.items.filter((item) => item.seller.toString() === seller.toString()).reduce((part, item) => part + item.price * item.quantity, 0), 0);
  res.json({ products: products.length, activeProducts: products.filter((p) => p.status === 'active').length, orders: orders.length, revenue, recentOrders: orders.slice(0, 6) });
});
