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
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
Login User:
POST /auth/login
Login an existing user.
Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}
#Quiz Management
Create Quiz.
POST /quiz

Certainly! Continuing from where we left off:

markdown
Copy code
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
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
Login User
http
Copy code
POST /auth/login
Login an existing user.

Request Body:

json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Quiz Management
Create Quiz
http
Copy code
POST /quizzes
Create a new quiz.
Request Body:
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
{
  "name": "Updated Geography Quiz",
  "question_list": [
    // Updated question list...
  ],
  "startDate": "2023-12-25T10:00:00Z",
  "endDate": "2023-12-26T22:00:00Z"
}
Delete QuizDELETE /quiz/:quizId
Delete a specific quiz.
Publish/Unpublish Quiz
PATCH /quiz/publish
Publish or unpublish a quiz.
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
Note: :reportId is optional.



