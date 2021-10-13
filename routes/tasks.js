const express = require('express');
const router = express.Router();
const Task = require('../models/task');


// GET - All
router.get('/', (req, res) => {
    res.send('Hello');
});
// GET - One
// CREATE
// UPDATE
// DELETE

module.exports = router;