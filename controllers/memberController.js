const memberService = require('../services/member.service');

exports.createMember = async (req, res) => {
  try {
    const member = await memberService.createMember(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getMembers = async (req, res) => {
  try {
    const result = await memberService.getMembers(req.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getMemberById = async (req, res) => {
  try {
    const member = await memberService.getMemberById(req.params.id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateMember = async (req, res) => {
  try {
    const member = await memberService.updateMember(req.params.id, req.body);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteMember = async (req, res) => {
  try {
    const member = await memberService.deleteMember(req.params.id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};