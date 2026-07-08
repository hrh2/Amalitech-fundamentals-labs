// store.js
// A tiny in-memory data store. This stands in for a real database so the
// TaskFlow API sample stays dependency-free and easy to read/fact-check.

const crypto = require('crypto');

const users = new Map(); // email -> { id, name, email, passwordHash }
const tasks = new Map(); // id -> { id, ownerId, title, description, status, dueDate, createdAt, updatedAt }
const sessions = new Map(); // token -> userId

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function createUser({ name, email, password }) {
  const id = crypto.randomUUID();
  const user = { id, name, email, passwordHash: hashPassword(password) };
  users.set(email, user);
  return user;
}

function findUserByEmail(email) {
  return users.get(email);
}

function createSession(userId) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, userId);
  return token;
}

function getUserIdForToken(token) {
  return sessions.get(token);
}

function createTask(ownerId, { title, description, dueDate }) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const task = {
    id,
    ownerId,
    title,
    description: description || '',
    status: 'todo',
    dueDate: dueDate || null,
    createdAt: now,
    updatedAt: now,
  };
  tasks.set(id, task);
  return task;
}

function listTasksForOwner(ownerId) {
  return Array.from(tasks.values()).filter((t) => t.ownerId === ownerId);
}

function getTask(id) {
  return tasks.get(id);
}

function updateTask(id, patch) {
  const task = tasks.get(id);
  if (!task) return null;
  const updated = { ...task, ...patch, updatedAt: new Date().toISOString() };
  tasks.set(id, updated);
  return updated;
}

function deleteTask(id) {
  return tasks.delete(id);
}

module.exports = {
  hashPassword,
  createUser,
  findUserByEmail,
  createSession,
  getUserIdForToken,
  createTask,
  listTasksForOwner,
  getTask,
  updateTask,
  deleteTask,
};
