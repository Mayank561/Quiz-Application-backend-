const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

// Importing route modules
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const quizRoute = require('./routes/quiz');
const examRoute = require('./routes/exam');
const reportRoute = require('./routes/report');

const app = express();
const port = process.env.PORT || 8000;
const connectionString = process.env.MONGODB_URI;

// Middleware
// Parse incoming JSON requests
app.use(express.json()); 
// Enable HTTP request logging
app.use(morgan('dev')); 

// Routes
// User-related routes
app.use('/user', userRoute); 
// Authentication routes
app.use('/auth', authRoute); 
// Quiz-related routes
app.use('/quiz', quizRoute); 
// Exam-related routes
app.use('/exam', examRoute); 
// Report-related routes
app.use('/report', reportRoute); 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).send({ error: err.message });
});

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
