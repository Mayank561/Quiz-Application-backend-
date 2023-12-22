const express = require('express');
const { getUser, updateUser } = require('../controllers/user');
const isAuthenticated = require("../middlewares/isAuth")
const router = express.Router();

// GET
router.get('/:userId',isAuthenticated, getUser);

// PUT
router.put('/',isAuthenticated, updateUser);

module.exports = router;
