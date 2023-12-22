const express = require('express');
const jwt = require("jsonwebtoken");
require('dotenv').config(); 



// Middleware to check if the request is authenticated
const isAuthenticated = (req, res, next) => {
    try {
        // Get the Authorization header from the request
        const authHeader = req.get("Authorization");

        // Check if the Authorization header is missing
        if (!authHeader) {
            res.status(401).send("Not Authenticated");
            return;
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];
        let decodedToken;

        // Verify the token using the secret key from environment variable
        try {
            decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            console.error(error);
            res.status(401).send("Not Authenticated");
            return;
        }

        // Check if the token is invalid or expired
        if (!decodedToken) {
            res.status(401).send("Not Authenticated");
            return;
        }

        // Attach the userId from the token to the request object
        req.userId = decodedToken.userId;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
}

module.exports = isAuthenticated;
