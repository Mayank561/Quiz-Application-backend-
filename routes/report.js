const express = require("express");
const getReport = require("../controllers/report");
const isAuthenticated = require("../middlewares/isAuth")



const router = express.Router();

// optional params?
router.get("/:reportId?",isAuthenticated,getReport);


module.exports = router;