const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // don't allow duplicate emails
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    // hash password before saving
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    logger.info(`New user registered: ${email}`);
    res.status(201).json({ msg: 'Registered successfully', userId: user._id });
  } catch (err) {
    logger.error(`Register error: ${err.message}`);
    res.status(500).json({ msg: err.message });
  }
};

// login and get a token back
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // compare entered password with hashed one in db
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Wrong password' });

    // token carries id and role — role is used for access control later
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`User logged in: ${email}`);
    res.json({ token });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    res.status(500).json({ msg: err.message });
  }
};

// get your own profile
exports.getMe = async (req, res) => {
  try {
    // req.user.id was attached by auth middleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// admin only — get all users with pagination, filtering, sorting
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5, role, sort = 'createdAt' } = req.query;

    const filter = {};
    if (role) filter.role = role; // filter by role if provided

    const users = await User.find(filter)
      .select('-password')
      .sort({ [sort]: 1 })         // sort by field
      .skip((page - 1) * limit)    // skip to the right page
      .limit(Number(limit));        // how many per page

    const total = await User.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};