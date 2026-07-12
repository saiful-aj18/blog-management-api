const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers?.authorization?.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      
      req.user = jwt.verify(token, process.env.JWT_SECRET);

      if (!req.user) {
        return res.status(401).json({ success: false, error: 'Not authorized' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

module.exports = { protect };
