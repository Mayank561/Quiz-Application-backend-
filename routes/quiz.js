const express = require("express");

const {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  publishQuiz
} = require("../controllers/quiz");
const isAuthenticated = require("../middlewares/isAuth");
const { check } = require("express-validator");
const router = express.Router();

// POST endpoint to create a new quiz
router.post("/", isAuthenticated, [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("Please enter a valid name, minimum 10 characters long"),
  check('question_list')
    .custom(question_list => {
      if (!question_list || question_list.length === 0) {
        throw new Error("Enter at least 1 question!");
      }
      return true;
    }),
  check('answer')
    .optional()
    .custom(answer => {
      if (answer && Object.keys(answer).length === 0) {
        throw new Error("Answer should not be empty!");
      }
      return true;
    })
], createQuiz);

// GET endpoint to retrieve quiz details by quizId
router.get("/:quizId", isAuthenticated, getQuiz);

// PUT endpoint to update an existing quiz
router.put("/", isAuthenticated, [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage("Please enter a valid name, minimum 10 characters long"),
  check('question_list')
    .custom(question_list => {
      if (question_list.length === 0) {
        return Promise.reject("Enter at least 1 question!");
      }
      return true;
    }),
  check('answer')
    .custom(answer => {
      if (Object.keys(answer).length === 0) {
        return Promise.reject("Answer should not be empty!");
      }
      return true;
    })
], updateQuiz);

// DELETE endpoint to delete a quiz by quizId
router.delete("/:quizId", isAuthenticated, deleteQuiz);

// PATCH endpoint to publish/unpublish a quiz by quizId
router.patch("/:quizId", isAuthenticated, publishQuiz);

module.exports = router;
