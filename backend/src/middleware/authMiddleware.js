import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(401).json({ message: 'Not authorized' });
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }
  } else {
    return res.status(401).json({ message: 'No token' });
  }
};
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Admins only' });
};
