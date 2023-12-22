const express = require("express");
// Importing exam controllers
const { startExam, submitExam } = require("../controllers/exam");  
// Importing authentication middleware
const isAuthenticated = require("../middlewares/isAuth");  

const router = express.Router();

// GET endpoint to start an exam by quizId
router.get("/:quizId", isAuthenticated, startExam);

// POST endpoint to submit exam answers
router.post("/", isAuthenticated, submitExam);

module.exports = router;
