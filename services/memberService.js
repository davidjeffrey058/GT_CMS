const Member = require('../models/Member');

exports.createMember = async (data) => {
  return await Member.create(data);
};


exports.getMembers = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    status
  } = query;

  const filter = {};

  // 🔍 Search (name)
  if (search) {
    filter.full_name = { $regex: search, $options: 'i' };
  }

  // 🎯 Filter (status)
  if (status) {
    filter.membership_status = status;
  }

  const skip = (page - 1) * limit;

  const [members, total] = await Promise.all([
    Member.find(filter)
      .select('-__v')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }),

    Member.countDocuments(filter)
  ]);

  return {
    data: members,
    meta: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    }
  };
};


exports.getMemberById = async (id) => {
  return await Member.findById(id);
};


exports.updateMember = async (id, data) => {
  return await Member.findByIdAndUpdate(id, data, { new: true });
};


exports.deleteMember = async (id) => {
  return await Member.findByIdAndDelete(id);
};2