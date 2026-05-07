import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signToken } from '../utils/jwt.js';

const sendAuth = (res, user, status = 200) => {
  const token = signToken(user);
  const safeUser = user.toObject();
  delete safeUser.password;
  res.status(status).json({ token, user: safeUser });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (await User.findOne({ email })) {
    res.status(409);
    throw new Error('Email already registered');
  }
  const user = await User.create({ name, email, password, role });
  sendAuth(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  sendAuth(res, user);
});

export const me = asyncHandler(async (req, res) => res.json(req.user));
