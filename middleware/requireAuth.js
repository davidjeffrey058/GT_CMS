const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const {_id} = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(_id).select('_id');
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized request' });
  }
};