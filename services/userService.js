const User = require('../models/User');

// Create user
exports.createUser = async (data) => {
  return await User.create(data);
};


// Get users (pagination + filtering)
exports.getUsers = async (query) => {
  const {
    page = 1,
    limit = 10,
    role,
    search
  } = query;

  const filter = {};

  // 🎯 Filter by role
  if (role) {
    filter.role = role;
  }

  // 🔍 Search by username
  if (search) {
    filter.username = { $regex: search, $options: 'i' };
  }

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(filter)
      .select('-password -__v')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),

    User.countDocuments(filter)
  ]);

  return {
    data: users,
    meta: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    }
  };
};


// Get single user
exports.getUserById = async (id) => {
  return await User.findById(id).select('-password');
};


// Update user
exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true })
    .select('-password');
};


// Delete user
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};