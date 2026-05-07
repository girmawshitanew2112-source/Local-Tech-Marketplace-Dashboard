import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['order', 'message', 'product', 'system'], default: 'system' },
    title: { type: String, required: true },
    body: String,
    read: { type: Boolean, default: false },
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
