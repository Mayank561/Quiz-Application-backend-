const express = require("express");
const Quiz = require("../models/quiz");
const Result = require("../models/result");

// Controller to start an exam/quiz
const startExam = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId, {
      name: 1,
      question_list: 1,
      is_published: 1
    });

    // Check if the quiz exists
    if (!quiz) {
      const err = new Error("No quiz found!");
      err.statusCode = 404;
      throw err;
    }

    // Check if the quiz is published
    if (!quiz.is_published) {
      const err = new Error("Quiz is not published");
      err.statusCode = 405;
      throw err;
    }

    // Send the quiz data in the response
    res.status(200).send({
      status: "Success",
      message: "Quiz",
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

// Controller to submit an exam/quiz
const submitExam = async (req, res, next) => {
  try {
    const userId = req.userId; // Obtain userId from the request object

    const quizId = req.body.quizId;
    const attemptedQuestions = req.body.attempted_questions || {};

    console.log("Received quizId:", quizId);

    // Find the quiz by quizId and fetch the answers
    const quiz = await Quiz.findById(quizId, { answers: 1, question_list: 1 });

    console.log("Found quiz:", quiz);

    // Check if the quiz or its answers are not found
    if (!quiz || !quiz.answers) {
      const err = new Error("Answers not found for the quiz");
      err.statusCode = 500;
      throw err;
    }

    const answers = quiz.answers;

    const allQuestions = Object.keys(answers);
    const total = allQuestions.length;

    let score = 0;

    // Check each attempted question
    for (let i = 0; i < total; i++) {
      let questionNumber = allQuestions[i];
      console.log(
        "Question:",
        questionNumber,
        "Expected Answer:",
        answers[questionNumber]
      );

      // Check if the attemptedQuestions has the property
      if (
        attemptedQuestions.hasOwnProperty(questionNumber) &&
        answers[questionNumber].toLowerCase().trim() ===
          attemptedQuestions[questionNumber].toLowerCase().trim()
      ) {
        score = score + 1;
      }
    }

    // Save the result
    const result = new Result({ userId, quizId, score, total });
    const data = await result.save();

    // Send the result data in the response
    res.status(200).send({
      status: "Success",
      message: "Quiz Submitted",
      data: { total, score, resultId: data._id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { startExam, submitExam };









