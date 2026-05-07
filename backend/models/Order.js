import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    paymentMethod: { type: String, default: 'Simulated Card' },
    deliveryStatus: {
      type: String,
      enum: ['processing', 'confirmed', 'packed', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'processing'
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    trackingEvents: [
      {
        status: String,
        note: String,
        at: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
