const router = require('express').Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const authLimiter = require('../middleware/rateLimiter');
const {
  register,
  login,
  getMe,
  getAllUsers,
} = require('../controllers/user.controller');

// public — but rate limited
router.post('/register', authLimiter, register);
router.post('/login',    authLimiter, login);

// any logged in user can see their own profile
router.get('/me', auth, getMe);

// admin only — auth checks token, role checks if admin
router.get('/', auth, role('admin'), getAllUsers);

module.exports = router;