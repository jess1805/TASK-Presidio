const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // no token --> go away
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  // token comes as "Bearer <token>", but we only need the second part
  const token = authHeader.split(' ')[1];

  try {
    // verifying and attaching user info to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = auth;