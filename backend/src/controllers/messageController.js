import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import { asyncHandler } from '../utils/errors.js';

export const listMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ $or: [{ sender: req.user._id }, { recipient: req.user._id }] }).populate('sender recipient', 'name email role').populate('product', 'title').sort('-createdAt');
  res.json(messages);
});

export const createMessage = asyncHandler(async (req, res) => {
  const message = await Message.create({ sender: req.user._id, ...req.body });
  await Notification.create({ user: req.body.recipient, title: 'New message', body: req.body.body.slice(0, 120), type: 'message', link: '/messages' });
  res.status(201).json(message);
});

export const markMessageRead = asyncHandler(async (req, res) => {
  const message = await Message.findOneAndUpdate({ _id: req.params.id, recipient: req.user._id }, { readAt: new Date() }, { new: true });
  res.json(message);
});
