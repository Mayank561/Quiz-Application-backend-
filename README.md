# Quiz Application

This quiz application allows users to create quizzes, participate in quizzes, and view quiz results. It provides various endpoints for creating, retrieving, and managing quizzes.

## Table of Contents

- [Endpoints](#endpoints)
  - [User Authentication](#user-authentication)
    - [Register User](#register-user)
    - [Login User](#login-user)
  - [Quiz Management](#quiz-management)
    - [Create Quiz](#create-quiz)
    - [Get Quiz](#get-quiz)
    - [Update Quiz](#update-quiz)
    - [Delete Quiz](#delete-quiz)
    - [Publish/Unpublish Quiz](#publish-unpublish-quiz)
  - [Exam](#exam)
    - [Start Exam](#start-exam)
    - [Submit Exam](#submit-exam)
  - [Reports](#reports)
    - [Get Report](#get-report)

## Endpoints (Continued)

### User Authentication

#### Register User

```http
POST /auth
Register a new user.

Request Body:

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
Login user.
POST /auth/login
Login an existing user.

Request Body:

json
{
  "email": "john@example.com",
  "password": "password123"
}
Quiz Management
Create Quiz
POST /quiz
Create a new quiz.

Request Body:

json
{
  "name": "Geography Quiz",
  "question_list": [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "London", "Paris", "Madrid"],
      "rightAnswer": 2
    },
    // Add more questions...
  ],
  "startDate": "2023-12-25T08:00:00Z",
  "endDate": "2023-12-26T20:00:00Z"
}
Get Quiz
GET /quiz/:quizId
Retrieve details of a specific quiz.
Update Quiz
PUT /quiz/:quizId
Update an existing quiz.

Request Body:

json
{
  "name": "Updated Geography Quiz",
  "question_list": [
    // Updated question list...
  ],
  "startDate": "2023-12-25T10:00:00Z",
  "endDate": "2023-12-26T22:00:00Z"
}
Delete Quiz
DELETE /quiz/:quizId
Delete a specific quiz.


Publish/Unpublish Quiz
PATCH /quiz/publish
Publish or unpublish a quiz.

json
{
  "is_published": true
}


Exam

Start Exam
GET /exam/:quizId
Start an exam for a specific quiz.


Submit Exam
POST /exam
Submit exam answers.

Request Body:

json
{
  "quizId": "quizId",
  "attempted_questions": {
    "1": 2,
    "2": 1,
    // Add more attempted questions...
  }
}
Reports
Get Report
GET /reports/:reportId?
Retrieve a report.



Hosted API
You can interact with the live API hosted on https://gurucool-bw7c.onrender.com/. Below are examples of the available endpoints:

User Authentication: https://gurucool-bw7c.onrender.com/auth

Register User: POST /auth
Login User: POST /auth/login
Quiz Management: https://gurucool-bw7c.onrender.com/quizzes

Create Quiz: POST /quiz
Get Quiz: GET /quiz/:quizId
Update Quiz: PUT /quiz/:quizId
Delete Quiz: DELETE /quiz/:quizId
Publish/Unpublish Quiz: PATCH /quiz/publish
Exam: https://gurucool-bw7c.onrender.com/exam

Start Exam: GET /exam/:quizId
Submit Exam: POST /exam
Reports: https://gurucool-bw7c.onrender.com/reports

Get Report: GET /report/:reportId
Feel free to interact with the hosted API using the provided links.
