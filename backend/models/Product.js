import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: 'text' },
    description: { type: String, required: true, index: 'text' },
    category: {
      type: String,
      required: true,
      enum: ['Laptops', 'Phones', 'Components', 'Gaming', 'Services', 'Networking', 'Accessories']
    },
    price: { type: Number, required: true, min: 0 },
    condition: { type: String, enum: ['New', 'Like New', 'Good', 'Fair', 'Service'], default: 'Good' },
    stock: { type: Number, default: 1, min: 0 },
    images: [String],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { city: String, state: String },
    rating: { type: Number, default: 0 },
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'active', 'sold', 'archived'], default: 'active' }
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
