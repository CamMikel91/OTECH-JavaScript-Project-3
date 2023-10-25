const jwt = require('jsonwebtoken');
const config = require('config');

// Auth Middleware
function auth(req, res, next) {
  // Get Token from Header
  const token = req.header('x-auth-token');

  // Check if Token Exists
  if (!token) return res.status(401).send('Access Denied. No Token Provided.');

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get('tokenKey'));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid Token.');
  }
}

module.exports = auth;