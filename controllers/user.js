const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Controller to get a user's information
const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Check if the request userId matches the authenticated userId
        if (req.userId != req.params.userId) {
            const err = new Error("Function not allowed");
            err.statusCode = 401;
            throw err;
        }

        // Fetch the user information based on the userId
        const user = await User.findById(userId, { name: 1, email: 1 });

        // Check if the user is not found
        if (!user) {
            res.send("User not found!");
        } else {
            // Send a success response with the user data
            res.status(200).send(user);
        }
    } catch (error) {
        next(error);
    }
};

// Controller to update a user's information
const updateUser = async (req, res, next) => {
    try {
        // Check if the authenticated userId matches the userId in the request body
        if (req.userId != req.body._id) {
            const err = new Error('You are not authorized');
            throw err;
        }

        const userId = req.body._id;

        // Fetch the user based on the userId
        const user = await User.findById(userId);

        // Check if the user is not found
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update the user's name based on the request body
        user.name = req.body.name;
        await user.save();

        // Send a success response
        res.status(200).send("User updated successfully");
    } catch (error) {
        next(error);
    }
};

module.exports = { getUser, updateUser };
