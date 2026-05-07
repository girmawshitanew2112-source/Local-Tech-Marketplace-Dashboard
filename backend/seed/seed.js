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
  { name: 'Avery Admin', email: 'admin@localtech.dev', password: 'password123', role: 'admin' },
  { name: 'Sam Seller', email: 'seller@localtech.dev', password: 'password123', role: 'seller', phone: '555-0144' },
  { name: 'Bianca Buyer', email: 'buyer@localtech.dev', password: 'password123', role: 'buyer' }
]);

const products = await Product.create([
  { title: 'Refurbished ThinkPad X1', description: 'Business laptop with 16GB RAM and 512GB SSD.', category: 'Laptops', price: 780, condition: 'Like New', stock: 4, seller: seller._id, location: { city: 'Austin', state: 'TX' }, tags: ['laptop', 'work'], isFeatured: true },
  { title: 'Custom Gaming PC Build Service', description: 'Local consultation, parts sourcing, and PC assembly.', category: 'Services', price: 180, condition: 'Service', stock: 12, seller: seller._id, location: { city: 'Austin', state: 'TX' }, tags: ['gaming', 'service'] },
  { title: 'Mesh Wi-Fi 6 Router Kit', description: 'Three-node mesh kit for apartments and homes.', category: 'Networking', price: 210, condition: 'Good', stock: 2, seller: seller._id, location: { city: 'Round Rock', state: 'TX' }, tags: ['wifi', 'router'] },
  { title: 'Mechanical Keyboard Bundle', description: 'Hot-swappable keyboard with artisan caps and desk mat.', category: 'Accessories', price: 145, condition: 'Like New', stock: 6, seller: seller._id, location: { city: 'Austin', state: 'TX' }, tags: ['keyboard'] }
]);

await Order.create({
  buyer: buyer._id,
  items: [{ product: products[0]._id, seller: seller._id, title: products[0].title, quantity: 1, price: products[0].price }],
  total: products[0].price,
  paymentStatus: 'paid',
  deliveryStatus: 'out_for_delivery',
  trackingEvents: [{ status: 'confirmed', note: 'Payment simulation approved' }, { status: 'out_for_delivery', note: 'Courier pickup completed' }]
});

await Message.create({ sender: buyer._id, recipient: seller._id, product: products[1]._id, body: 'Can you build a compact PC this weekend?' });
await Notification.create({ user: seller._id, type: 'message', title: 'New service inquiry', body: 'A buyer asked about a custom build.' });
console.log('Seed data created. Demo password for all accounts: password123');
await mongoose.disconnect();
