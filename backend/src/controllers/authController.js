import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Account, User } from '../models/index.js';
import { logAction } from '../utils/logger.js';
const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    if(!name||!email||!password||!mobile) return res.status(400).json({message:'Missing fields'});
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, mobile, status: 'inactive', role: 'user' });
    await logAction({ log: `User registered ${user.id}`, haveError:false, user_id: user.id, type:1 });
    res.status(201).json({ message: 'Registered. Await admin activation', user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    if (user.status === 'inactive') return res.status(403).json({ message: 'Account inactive' });
    const token = generateToken(user.id, user.role);
    await logAction({ log: `User login ${user.id}`, haveError:false, user_id: user.id, type:1 });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const logoutUser = async (req, res) => {
  res.json({ message: 'Logout' });
};
export const getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id, {include: Account});
  res.json(user);
};
