// In-memory task storage
let tasks = [];
let nextId = 1;

// Load initial tasks from task.json if available
try {
    const taskData = require('../task.json');
    if (taskData && taskData.tasks) {
        tasks = taskData.tasks.map(task => ({
            ...task,
            priority: task.priority || 'medium',
            createdAt: task.createdAt || new Date().toISOString()
        }));
        // Set nextId to be one more than the highest existing ID
        if (tasks.length > 0) {
            nextId = Math.max(...tasks.map(t => t.id)) + 1;
        }
    }
} catch (err) {
    // If task.json doesn't exist or can't be loaded, start with empty tasks
    console.log('Starting with empty task list');
}

// Get all tasks with filtering and sorting
const getAllTasks = (req, res) => {
    let filteredTasks = [...tasks];

    // Filter by completed status
    if (req.query.completed !== undefined) {
        const completedFilter = req.query.completed === 'true';
        filteredTasks = filteredTasks.filter(t => t.completed === completedFilter);
    }

    // Sort by creation date (id is a proxy for creation order)
    if (req.query.sort === 'createdAt') {
        filteredTasks.sort((a, b) => a.id - b.id);
    }

    res.json(filteredTasks);
};

// Get task by ID
const getTaskById = (req, res) => {
    const taskId = parseInt(req.params.id);

    // Validate task ID
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
};

// Create a new task
const createTask = (req, res) => {
    const { title, description, completed, priority } = req.body;

    // Validate required fields
    if (!title || !description || completed === undefined) {
        return res.status(400).json({ error: 'Missing required fields: title, description, completed' });
    }

    // Validate title is not empty
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title must be a non-empty string' });
    }

    // Validate description is not empty
    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description must be a non-empty string' });
    }

    // Validate completed is a boolean
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be a boolean value' });
    }

    // Validate priority if provided
    const validPriorities = ['low', 'medium', 'high'];
    const taskPriority = priority || 'medium';
    if (!validPriorities.includes(taskPriority)) {
        return res.status(400).json({ error: 'Priority must be one of: low, medium, high' });
    }

    const newTask = {
        id: nextId++,
        title: title.trim(),
        description: description.trim(),
        completed,
        priority: taskPriority,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
};

// Update a task
const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);

    // Validate task ID
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description, completed, priority } = req.body;

    // Validate title if provided
    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Title must be a non-empty string' });
        }
        tasks[taskIndex].title = title.trim();
    }

    // Validate description if provided
    if (description !== undefined) {
        if (typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ error: 'Description must be a non-empty string' });
        }
        tasks[taskIndex].description = description.trim();
    }

    // Validate completed if provided
    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Completed must be a boolean value' });
        }
        tasks[taskIndex].completed = completed;
    }

    // Validate priority if provided
    if (priority !== undefined) {
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ error: 'Priority must be one of: low, medium, high' });
        }
        tasks[taskIndex].priority = priority;
    }

    res.json(tasks[taskIndex]);
};

// Delete a task
const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);

    // Validate task ID
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
};

// Get tasks by priority level
const getTasksByPriority = (req, res) => {
    const { level } = req.params;
    const validPriorities = ['low', 'medium', 'high'];

    if (!validPriorities.includes(level)) {
        return res.status(400).json({ error: 'Priority level must be one of: low, medium, high' });
    }

    const filteredTasks = tasks.filter(t => t.priority === level);
    res.json(filteredTasks);
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTasksByPriority
};
