const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      console.log('--- Auth Debug Start ---');
      console.log('Token Payload:', { id: decoded.id, role: decoded.role });

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.log('Auth Failure: User ID not found in DB:', decoded.id);
        return res.status(403).json({ 
          message: 'Security Alert: Your credential is valid but your identity was not found in our records.',
          debug: { id: decoded.id, tokenRole: decoded.role, source: 'authMiddleware:missing' }
        });
      }

      console.log('DB User Found:', { id: req.user._id, dbRole: req.user.role, active: req.user.isActive });

      if (!req.user.isActive) {
        console.log('Auth Failure: Account is deactivated:', req.user._id);
        return res.status(403).json({ 
          message: 'Account Access Denied: This account is currently inactive.',
          debug: { id: req.user._id, active: req.user.isActive, role: req.user.role }
        });
      }

      console.log('--- Auth Debug End ---');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
