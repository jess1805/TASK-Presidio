const role = (requiredRole) => {
  return (req, res, next) => {
    // not the right role? blocked
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
  };
};

module.exports = role;