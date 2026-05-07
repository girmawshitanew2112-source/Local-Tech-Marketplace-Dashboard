import User from '../models/User.js';
import { ApiError, asyncHandler } from '../utils/errors.js';

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort('-createdAt');
  res.json(users);
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password').populate('wishlist cart.product');
  if (!user) throw new ApiError(404, 'User not found');
  res.json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) throw new ApiError(403, 'Not allowed');
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
  if (!user) throw new ApiError(404, 'User not found');
  res.json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ message: 'User deactivated' });
});
