const express = require("express");
const { registerUser, loginUser, isUserExist } = require("../controllers/auth");
const { check } = require("express-validator");

const router = express.Router();

// POST endpoint for user registration
router.post(
  "/",
  [
    // Validation for the user registration fields
    check("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("Please enter a valid name, minimum 4 characters long"),
    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a valid email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom(async (emailId) => {
        // Custom validation to check if the user already exists
        try {
          const status = await isUserExist(emailId);
          if (status) {
            throw new Error("User already exists!");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      })
      .normalizeEmail(),
    check('password')
        .trim()
        .isLength({ min: 9 })
        .withMessage("Enter at least a 9-character password"),
    check('confirm_password')
      .trim()
      .custom((value, { req }) => {
        // Custom validation to check if password confirmation matches
        if (!value || value !== req.body.password) {
          throw new Error("Password confirmation does not match");
        }
        return true;
      }),
  ],
  registerUser
);

// POST endpoint for user login
router.post("/login", loginUser);

module.exports = router;
