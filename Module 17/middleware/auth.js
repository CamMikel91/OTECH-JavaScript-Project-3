const jwt = require('jsonwebtoken');
const config = require('config');

// Auth Middleware
function auth(req, res, next) {
  // Get Token from Header
  const token = req.cookies.token;

  // Check if Token Exists
  if (!token) return res.status(401).send('Access Denied. No Token Provided.');

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get('tokenKey'));
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/api/users/login');
  }
}

module.exports = auth;