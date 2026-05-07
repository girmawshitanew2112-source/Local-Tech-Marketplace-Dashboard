import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Notification from '../models/Notification.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const productIds = req.body.items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds }, status: 'active' });
  const items = req.body.items.map((item) => {
    const product = products.find((entry) => String(entry._id) === item.product);
    if (!product) throw new Error('One or more products are unavailable');
    return { product: product._id, seller: product.seller, title: product.title, quantity: item.quantity, price: product.price };
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await Order.create({
    buyer: req.user._id,
    items,
    total,
    deliveryAddress: req.body.deliveryAddress,
    paymentStatus: 'paid',
    trackingEvents: [{ status: 'confirmed', note: 'Payment simulation approved' }]
  });
  await Notification.create({ user: req.user._id, type: 'order', title: 'Order confirmed', body: `Order total: $${total.toFixed(2)}` });
  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const query = req.user.role === 'admin' ? {} : req.user.role === 'seller' ? { 'items.seller': req.user._id } : { buyer: req.user._id };
  const orders = await Order.find(query).populate('buyer', 'name email').populate('items.product', 'title images').sort('-createdAt');
  res.json(orders);
});

export const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  order.deliveryStatus = req.body.deliveryStatus;
  order.trackingEvents.push({ status: req.body.deliveryStatus, note: req.body.note || 'Status updated' });
  await order.save();
  res.json(order);
});
