const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
require('dotenv').config(); 

// Controller to handle user registration
const registerUser = async (req, res, next) => {
  try {
    // Validation
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) {
      // Transform validation errors into a more structured format
      const errors = validationErr.array().map((error) => ({
        type: 'field',
        value: error.value,
        msg: error.msg,
        path: error.param,
        location: error.location,
      }));

      // Create an error object for validation errors
      const err = new Error('Validation failed!');
      err.statusCode = 422;
      err.data = errors;
      throw err;
    }

    const { email, name, password } = req.body;

    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user object
    const user = new User({
      email: email,
      name: name,
      password: hashedPassword,
    });

    // Save the user in the database
    const result = await user.save();

    // Check if the user was successfully saved
    if (!result) {
      const error = new Error('Registration failed');
      error.statusCode = 500;
      throw error;
    }

    // Send a success response
    res.status(201).json({ message: 'Registration successful', user: result });
  } catch (error) {
    console.error('Error in registerUser:', error);

    // Sending a more informative error response
    res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      data: error.data || [],
    });
  }
};

// Controller to handle user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      const error = new Error('User does not exist');
      error.statusCode = 404;
      throw error;
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is valid, create and send a JWT token
    if (isPasswordValid) {
      console.log('Login successful');

      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      console.log('Token:', token);

      // Send a success response with the token
      res.status(200).json({ message: 'Login successful', token: token });
    } else {
      // If the password is invalid, send a login failed error
      const error = new Error('Login failed');
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    console.error('Error in loginUser:', error);

    // Sending a more informative error response
    res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      data: error.data || [],
    });
  }
};

// Function to check if a user with a given email already exists
const isUserExist = async(email) => {
  const user = await User.findOne({email});
  // Return true if the user exists, otherwise return false
  return !!user;
};

// Export the controllers and the function
module.exports = { registerUser, loginUser, isUserExist };
