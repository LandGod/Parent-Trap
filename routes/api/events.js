const router = require("express").Router();
const eventController = require("../../controllers/eventController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects

// All routes on this page will be appended to this root: "api/events/""

router
  .route("/")
  // POST event
  .post(function(req, res) {

    // Validate req body
    if (!req.body) {
      res.status(400).send("Request has no body!");
      return;
    }

    // Send parsed and validated request data to event controller
    eventController
      .create(eventData)

      // Resolve request with results from db operation
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

module.exports = router;
