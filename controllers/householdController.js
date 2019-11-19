// Get models
const db = require("../models");

// Define methods for manipulation of Households collection
module.exports = {
  // New household from scratch
  create: function(req, res) {
    // Validate request object
    if (!req.body) {
      res.status(400).send("Request has no body");
    }
    if (!req.body.name) {
      res.status(400).send("No household name was provided");
    }
    // Define name for use in function scope
    let name;
    // Cast req.body.name to string and perform more validation
    try {
      name = toString(req.body.name);
    } catch (e) {
      res.status(400).send("Household name was not able to be cast to string");
    }
    if (name.length < 3) {
      res.status(400).send("Household name too short");
    }
    if (name.length > 255) {
      res.status(400).send("Household name too long");
    }

    // Create household using the data saved into newHouseholdInfo
    db.Household.create({ name: name })
      .then(result => {
        res.status(201).end();
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
