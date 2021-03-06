const mongoose = require('mongoose');

// Creating new schema to outline each task that my database will hold
const taskSchema = new mongoose.Schema({
    title: {
        type: String,       // Only accepts Strings as titles
        required: true      // IS REQUIRED (no null values)
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    }
});

// Exporting this schema to be used by my database
module.exports = mongoose.model('Task', taskSchema);