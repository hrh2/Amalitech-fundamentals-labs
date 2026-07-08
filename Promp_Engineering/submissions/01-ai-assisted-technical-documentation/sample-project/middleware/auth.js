// middleware/auth.js
const { getUserIdForToken } = require('../store');

/**
 * Requires a valid `Authorization: Bearer <token>` header.
 * On success, attaches `req.userId`. On failure, responds 401.
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const userId = getUserIdForToken(token);
  if (!userId) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.userId = userId;
  next();
}

module.exports = { requireAuth };
