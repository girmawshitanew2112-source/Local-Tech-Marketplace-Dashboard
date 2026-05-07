import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiError, asyncHandler } from '../utils/errors.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
const sendAuth = (res, user, status = 200) => res.status(status).json({ token: signToken(user._id), user });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'buyer' } = req.body;
  if (await User.findOne({ email })) throw new ApiError(409, 'Email already registered');
  const user = await User.create({ name, email, password, role });
  const safeUser = user.toObject({ versionKey: false });
  delete safeUser.password;
  sendAuth(res, safeUser, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) throw new ApiError(401, 'Invalid email or password');
  const safeUser = user.toObject();
  delete safeUser.password;
  sendAuth(res, safeUser);
});

export const me = asyncHandler(async (req, res) => res.json({ user: req.user }));
