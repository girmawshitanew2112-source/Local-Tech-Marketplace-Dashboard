import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Notification from '../models/Notification.js';
import { ApiError, asyncHandler } from '../utils/errors.js';

export const createOrder = asyncHandler(async (req, res) => {
  const requestedItems = req.body.items || [];
  if (!requestedItems.length) throw new ApiError(400, 'Order items are required');
  const products = await Product.find({ _id: { $in: requestedItems.map((item) => item.product) }, status: 'active' });
  const items = requestedItems.map((item) => {
    const product = products.find((entry) => entry._id.toString() === item.product);
    if (!product) throw new ApiError(400, 'Product unavailable');
    return { product: product._id, seller: product.seller, title: product.title, price: product.price, quantity: item.quantity || 1 };
  });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = Number((subtotal * 0.035).toFixed(2));
  const order = await Order.create({
    buyer: req.user._id,
    items,
    subtotal,
    serviceFee,
    total: subtotal + serviceFee,
    payment: { method: req.body.paymentMethod || 'card', status: 'paid', transactionId: `sim_${crypto.randomUUID()}` },
    delivery: req.body.delivery || {}
  });
  await Notification.create({ user: req.user._id, title: 'Order confirmed', body: `Your order ${order._id} was placed.`, type: 'order', link: `/orders/${order._id}` });
  res.status(201).json(order);
});

export const listOrders = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'buyer' ? { buyer: req.user._id } : req.user.role === 'seller' ? { 'items.seller': req.user._id } : {};
  const orders = await Order.find(filter).populate('buyer', 'name email').populate('items.product', 'title images').sort('-createdAt');
  res.json(orders);
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('buyer', 'name email').populate('items.product items.seller');
  if (!order) throw new ApiError(404, 'Order not found');
  const allowed = req.user.role === 'admin' || order.buyer._id.toString() === req.user._id.toString() || order.items.some((item) => item.seller._id.toString() === req.user._id.toString());
  if (!allowed) throw new ApiError(403, 'Not allowed');
  res.json(order);
});

export const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { 'delivery.status': req.body.status }, { new: true });
  if (!order) throw new ApiError(404, 'Order not found');
  await Notification.create({ user: order.buyer, title: 'Delivery update', body: `Your order is now ${req.body.status}.`, type: 'order', link: `/orders/${order._id}` });
  res.json(order);
});
