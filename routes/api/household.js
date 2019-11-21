const router = require("express").Router();
const householdController = require("../../controllers/householdController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects
// Import utils

// All routes on this page will be appended to this root: "api/household/""

router
  .route("/")
  // GET household id(s) of the household(s) which contain the specified user id
  .get(function(req, res) {

    // Validate req.body

    // Parse user id from req.body

    let userId = req.body.userId


    // Send parsed and validated request data to household controller
    householdController.findUserHousehold(userId)

      // Resolve request with results from db operation
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

module.exports = router;
