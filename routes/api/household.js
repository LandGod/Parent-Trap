const router = require("express").Router();
const householdController = require("../../controllers/householdController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects
const {
  validateOauthKey,
  validateObjectId
} = require("../../controllers/utils"); // Get utils.js for validation functions

// All routes on this page will be appended to this root: "api/household/""

router
  .route("/")
  // GET household id(s) of the household(s) which contain the specified user id
  .get(function(req, res) {
    // Validate req.body
    if (!req.body) {
      res.status(400).send("Request body was empty.");
      return;
    }

    // Define variable for single value that we will be extracting (Avoids scope issues with let declaration)
    let userId;

    // Parse user id from req.body
    if (req.body.userId) {
      userId = req.body.userId;
    } else {
      res.status(400).send("UserId property was blank.");
      return;
    }
    // Validate userId
    if (!validateObjectId(userId)) {
      res
        .status(400)
        .send(
          "Provided userId could not be converted to a valid mongoose ObjectId"
        );
      return;
    } else {
      if (typeof userId === "string") {
        userId = mongoose.Types.ObjectId(userId);
      }
    }

    // Send parsed and validated request data to household controller
    householdController
      .findUserHousehold(userId)

      // Resolve request with results from db operation
      .then(function(result) {
        //TODO: Parse result as neccessary
        res.status(200).json(result);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

module.exports = router;
