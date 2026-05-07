import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ $or: [{ sender: req.user._id }, { recipient: req.user._id }] })
    .populate('sender recipient', 'name avatar')
    .populate('product', 'title')
    .sort('-createdAt');
  res.json(messages);
});

export const sendMessage = asyncHandler(async (req, res) => {
  const message = await Message.create({ sender: req.user._id, ...req.body });
  await Notification.create({ user: req.body.recipient, type: 'message', title: 'New message', body: req.body.body });
  req.app.get('io')?.to(String(req.body.recipient)).emit('notification:new', { title: 'New message', body: req.body.body });
  res.status(201).json(message);
});

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort('-createdAt').limit(30);
  res.json(notifications);
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { read: true }, { new: true });
  res.json(notification);
});
