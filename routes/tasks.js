const express = require('express');
const router = express.Router();
const Task = require('../models/task');


// GET - All
router.get('/', async (req, res) => {
    try {
        // Find record in database
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET - One
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});


// CREATE
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });
    try {
        // Save new record to database
        const newTask = await task.save();
        res.status(201).json({ message: "Task saved successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// UPDATE
router.patch('/:id', getTask, async (req, res) => {
    if (req.body.title) {
        res.task.title = req.body.title;
    }
    if (req.body.description) {
        res.task.description = req.body.description;
    }

    try {
        // Save updated record to database
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// DELETE
router.delete('/:id', getTask, async (req, res) => {
    try {
        // Remove record from database
        await res.task.remove();
        res.json({ message: 'Task Deleted Successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Middleware to find a single task by ID
//   - Return task if it exists
//   - Return error message if not
async function getTask(req, res, next) {
    let task;
    try {
        // Find single task from database, using the records unique id
        task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task Not Found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    // set response.task equal to the object created above
    res.task = task;
    next();
}

module.exports = router;