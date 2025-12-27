const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /tasks - Retrieve all tasks (with filtering and sorting)
router.get('/', taskController.getAllTasks);

// GET /tasks/priority/:level - Retrieve tasks by priority level
router.get('/priority/:level', taskController.getTasksByPriority);

// GET /tasks/:id - Retrieve a specific task by ID
router.get('/:id', taskController.getTaskById);

// POST /tasks - Create a new task
router.post('/', taskController.createTask);

// PUT /tasks/:id - Update an existing task
router.put('/:id', taskController.updateTask);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
