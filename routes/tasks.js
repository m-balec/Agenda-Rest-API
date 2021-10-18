const express = require('express');
const router = express.Router();
const Task = require('../models/task');


// GET - All
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET - One
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
})


// CREATE
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        dateOfEvent: req.body.dateOfEvent,
        description: req.body.description
    });
    try {
        const newTask = await task.save();
        res.status(201).json({ message: "Task saved successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
// UPDATE
// DELETE


// Middleware to find a single task by ID
//   - Return task if it exists
//   - Return error message if not
async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task Not Found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.task = task;
    next();
}

module.exports = router;