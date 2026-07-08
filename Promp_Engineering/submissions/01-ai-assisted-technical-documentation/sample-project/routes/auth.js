// routes/auth.js
const express = require('express');
const { createUser, findUserByEmail, hashPassword, createSession } = require('../store');

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }

  if (findUserByEmail(email)) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const user = createUser({ name, email, password });
  return res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = findUserByEmail(email);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = createSession(user.id);
  return res.status(200).json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

module.exports = router;
