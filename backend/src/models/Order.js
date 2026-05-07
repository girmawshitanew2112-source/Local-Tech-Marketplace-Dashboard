import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  price: Number,
  quantity: { type: Number, default: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  serviceFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  payment: {
    method: { type: String, enum: ['card', 'cash', 'wallet'], default: 'card' },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'paid' },
    transactionId: String
  },
  delivery: {
    type: { type: String, enum: ['pickup', 'local_delivery'], default: 'pickup' },
    status: { type: String, enum: ['processing', 'confirmed', 'out_for_delivery', 'ready_for_pickup', 'delivered', 'cancelled'], default: 'processing' },
    address: String,
    eta: Date
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
