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

module.exports = router;