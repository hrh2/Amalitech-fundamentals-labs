// routes/tasks.js
const express = require('express');
const {
  createTask,
  listTasksForOwner,
  getTask,
  updateTask,
  deleteTask,
} = require('../store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const VALID_STATUSES = ['todo', 'in-progress', 'done'];

router.use(requireAuth);

// GET /api/tasks
router.get('/', (req, res) => {
  const tasks = listTasksForOwner(req.userId);
  return res.status(200).json({ tasks });
});

// POST /api/tasks
router.post('/', (req, res) => {
  const { title, description, dueDate } = req.body || {};

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }

  const task = createTask(req.userId, { title, description, dueDate });
  return res.status(201).json({ task });
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const task = getTask(req.params.id);
  if (!task || task.ownerId !== req.userId) {
    return res.status(404).json({ error: 'Task not found' });
  }
  return res.status(200).json({ task });
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const existing = getTask(req.params.id);
  if (!existing || existing.ownerId !== req.userId) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, status, dueDate } = req.body || {};

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `status must be one of: ${VALID_STATUSES.join(', ')}`,
    });
  }

  const task = updateTask(req.params.id, { title, description, status, dueDate });
  return res.status(200).json({ task });
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const existing = getTask(req.params.id);
  if (!existing || existing.ownerId !== req.userId) {
    return res.status(404).json({ error: 'Task not found' });
  }

  deleteTask(req.params.id);
  return res.status(204).send();
});

module.exports = router;
