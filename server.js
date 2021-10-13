require('dotenv').config();             // Required to use environment variables
const express = require('express');     // Used for creating API
const mongoose = require('mongoose');   // Used for interacting with mongoDB
const app = express();

// Connecting to Database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.once('open', () => console.log('Connected to database'));
db.on('error', (error) => console.error(error));

// Using express json middleware
app.use(express.json());

// using task router
const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);

app.listen(process.env.port || 3001, () => console.log(`Server running on http://localhost:${process.env.port || 3001}`));