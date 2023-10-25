const jwt = require('jsonwebtoken');
const config = require('config');

// Auth Middleware for Admin
function adminAuth(req, res, next) {
  // Get Token from Header
  const token = req.header('x-auth-token');

  // Check if Token Exists
  if (!token) return res.status(401).send('Access Denied. No Token Provided.');

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get('tokenKey'));
    req.user = decoded;
    if (!req.user.isAdmin) return res.status(403).send('Access Denied. Not an Admin.');
    next();
  } catch (ex) {
    res.status(400).send('Invalid Token.');
  }
}

module.exports = adminAuth;