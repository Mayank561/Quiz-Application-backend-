const express = require("express");
const Report = require("../models/result");

// Controller to get a report or all reports for a user
const getReport = async (req, res, next) => {
  try {
    let report;

    // Check if a specific reportId is provided in the request params
    if (!!req.params.reportId) {
      const reportId = req.params.reportId;
      // Fetch the report from the database based on the provided reportId
      report = await Report.findById(reportId);

      // Check if the report is not found
      if (!report) {
        const err = new Error("Report not found");
        err.statusCode = 404;
        throw err;
      }

      // Check if the user is authorized to access the specific report
      if (report.userId.toString() !== req.userId) {
        const err = new Error("You are not allowed");
        err.statusCode = 405;
        throw err;
      }
    } else {
      // If no specific reportId is provided, fetch all reports for the user
      report = await Report.find({ userId: req.userId });
    }

    // Check if the report is not found
    if (!report) {
      const err = new Error("Report not found");
      err.statusCode = 404;
      throw err;
    }

    // Send a success response with the report data
    res.status(200).send({
      status: "Success",
      message: "Report",
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getReport;
