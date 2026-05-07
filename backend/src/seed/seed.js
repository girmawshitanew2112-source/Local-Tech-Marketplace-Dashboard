import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';

await connectDB();
await Promise.all([User.deleteMany(), Product.deleteMany(), Order.deleteMany(), Message.deleteMany(), Notification.deleteMany()]);

const [admin, seller, buyer] = await User.create([
  { name: 'Avery Admin', email: 'admin@localtech.dev', password: 'password123', role: 'admin', location: { city: 'Austin', state: 'TX' } },
  { name: 'Sam Seller', email: 'seller@localtech.dev', password: 'password123', role: 'seller', phone: '555-0134', location: { city: 'Austin', state: 'TX' } },
  { name: 'Bailey Buyer', email: 'buyer@localtech.dev', password: 'password123', role: 'buyer', location: { city: 'Round Rock', state: 'TX' } }
]);

const products = await Product.create([
  { title: 'MacBook Pro M3 14-inch', description: 'Lightly used pro laptop with AppleCare and local pickup.', category: 'Laptops', condition: 'Like New', price: 1699, stock: 1, seller: seller._id, tags: ['apple', 'developer'], location: seller.location, images: ['/uploads/demo-macbook.jpg'] },
  { title: 'Custom Gaming PC Build Service', description: 'Parts planning, assembly, BIOS setup, cable management, and stress testing.', category: 'Services', condition: 'Service', price: 180, stock: 10, seller: seller._id, tags: ['gaming', 'service'], location: seller.location },
  { title: 'RTX 4070 Super Graphics Card', description: 'Excellent condition GPU for 1440p gaming and CUDA workloads.', category: 'Components', condition: 'Good', price: 520, stock: 2, seller: seller._id, tags: ['gpu', 'nvidia'], location: seller.location },
  { title: 'Mesh Wi-Fi 6 Router Kit', description: 'Three-node mesh kit for apartments and small homes.', category: 'Networking', condition: 'New', price: 219, stock: 4, seller: seller._id, tags: ['wifi', 'router'], location: seller.location }
]);

const subtotal = products[0].price;
const order = await Order.create({
  buyer: buyer._id,
  items: [{ product: products[0]._id, seller: seller._id, title: products[0].title, price: products[0].price, quantity: 1 }],
  subtotal,
  serviceFee: 59.47,
  total: subtotal + 59.47,
  payment: { method: 'card', status: 'paid', transactionId: 'sim_seed_001' },
  delivery: { type: 'pickup', status: 'ready_for_pickup', eta: new Date(Date.now() + 86400000) }
});

await Message.create({ sender: buyer._id, recipient: seller._id, product: products[1]._id, body: 'Can you build a quiet PC for photo editing this weekend?' });
await Notification.create({ user: buyer._id, title: 'Pickup ready', body: `Order ${order._id} is ready for pickup.`, type: 'order', link: `/orders/${order._id}` });

console.log('Seed complete. Demo password: password123');
await mongoose.disconnect();
