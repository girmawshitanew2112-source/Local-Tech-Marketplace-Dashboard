import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, index: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Laptops', 'Phones', 'Components', 'Gaming', 'Services', 'Networking', 'Accessories'] },
  condition: { type: String, enum: ['New', 'Like New', 'Good', 'Fair', 'Service'], default: 'Good' },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 1, min: 0 },
  images: [String],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { city: String, state: String },
  tags: [String],
  rating: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'active', 'sold', 'archived'], default: 'active' },
  views: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.pre('save', function createSlug(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = `${slugify(this.title, { lower: true, strict: true })}-${Date.now().toString(36)}`;
  }
  next();
});

productSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
