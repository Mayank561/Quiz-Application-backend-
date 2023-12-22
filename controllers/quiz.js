const express = require("express");
const Quiz = require("../models/quiz");
const { validationResult } = require('express-validator');

// Helper function to check if a quiz is published
const isQuizPublished = (quiz) => {
  return quiz.is_published;
};

// Controller to create a new quiz
const createQuiz = async (req, res, next) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      // Return a validation error response
      return res.status(400).send({
        status: "Error",
        message: "Validation failed",
        data: validationError.array()
      });
    }

    // Extract data from the request body
    const created_by = req.userId;
    const { name, question_list, answers } = req.body;

    // Create a new quiz instance
    const quiz = new Quiz({ name, question_list, answers, created_by });
    // Save the quiz to the database
    const result = await quiz.save();

    // Send a success response with the created quiz ID
    res.status(201).send({
      status: "Success",
      message: "Quiz created successfully",
      data: { QuizId: result._id }
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get details of a quiz
const getQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;
    // Fetch the quiz from the database based on the quizId
    const quiz = await Quiz.findById(quizId, {
      name: 1,
      question_list: 1,
      answers: 1,
      created_by: 1
    });

    // Check if the quiz is not found
    if (!quiz) {
      return res.status(404).send({
        status: "Error",
        message: "Quiz not found",
        data: {}
      });
    }

    // Check if the user is authorized to access the quiz
    if (req.userId !== quiz.created_by.toString()) {
      return res.status(403).send({
        status: "Error",
        message: "You are not authorized",
        data: {}
      });
    }

    // Send a success response with the quiz details
    res.status(200).send({
      status: "Success",
      message: "Quiz",
      data: { quiz }
    });
  } catch (error) {
    next(error);
  }
};

// Controller to update an existing quiz
const updateQuiz = async (req, res, next) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      // Return a validation error response
      return res.status(400).send({
        status: "Error",
        message: "Validation Failed",
        data: validationError.array()
      });
    }

    // Use req.params.quizId for the quizId
    const quizId = req.params.quizId;
    // Fetch the quiz from the database based on the quizId
    const quiz = await Quiz.findById(quizId);

    // Check if the quiz is not found
    if (!quiz) {
      return res.status(404).send({
        status: "Error",
        message: "Quiz not found",
        data: {}
      });
    }

    // Check if the user is authorized to update the quiz
    if (req.userId !== quiz.created_by.toString()) {
      return res.status(403).send({
        status: "Error",
        message: "You are not authorized",
        data: {}
      });
    }

    // Check if the quiz is published
    if (isQuizPublished(quiz)) {
      return res.status(405).send({
        status: "Error",
        message: "You cannot update a published quiz",
        data: {}
      });
    }

    // Update quiz data based on the request body
    quiz.name = req.body.name;
    quiz.question_list = req.body.question_list;
    quiz.answers = req.body.answers;
    // Save the updated quiz to the database
    await quiz.save();

    // Send a success response
    res.status(200).send({
      status: "Success",
      message: "Quiz updated successfully",
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// Controller to delete an existing quiz
const deleteQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;
    // Fetch the quiz from the database based on the quizId
    const quiz = await Quiz.findById(quizId);

    // Check if the user is authorized to delete the quiz
    if (req.userId !== quiz.created_by.toString()) {
      return res.status(403).send({
        status: "Error",
        message: "You are not authorized",
        data: {}
      });
    }

    // Check if the quiz is published
    if (isQuizPublished(quiz)) {
      return res.status(405).send({
        status: "Error",
        message: "You cannot delete a published quiz",
        data: {}
      });
    }

    // Delete the quiz from the database
    await Quiz.deleteOne({ _id: quizId });

    // Send a success response
    res.status(200).send({
      status: "Success",
      message: "Quiz deleted successfully",
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// Controller to publish a quiz
const publishQuiz = async (req, res, next) => {
  try {
    const quizId = req.body.quizId;
    // Fetch the quiz from the database based on the quizId
    const quiz = await Quiz.findById(quizId);

    // Check if the quiz is not found
    if (!quiz) {
      return res.status(404).send({
        status: "Error",
        message: "Quiz not found",
        data: {}
      });
    }

    // Check if the user is authorized to publish the quiz
    if (req.userId !== quiz.created_by.toString()) {
      return res.status(403).send({
        status: "Error",
        message: "You are not authorized",
        data: {}
      });
    }

    // Set the is_published flag to true and save the quiz
    quiz.is_published = true;
    await quiz.save();

    // Send a success response
    res.status(200).send({
      status: "Success",
      message: "Quiz published",
      data: { QuizId: quiz._id }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createQuiz, getQuiz, updateQuiz, deleteQuiz, publishQuiz };
