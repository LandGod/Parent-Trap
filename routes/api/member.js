const router = require("express").Router();
const memberController = require("../../controllers/memberController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects

router
  .route("/all")
  // GET all members
  .get(function(req, res) {
    // Validate req body
    if (!req.body) {
      res.status(400).send("Request has no body!");
      return;
    }

    // send request to get all of the members
    memberController
      .findAll()
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

router.route("/login").put(function(req, res) {
  memberController
    .findByEmail(req.body.email)
    .then(function(result) {
      // if no email exists, return 204 status message to client. This will tell the client to redirect to the household page
      if (result.length === 0) {
        res.status(204).end();
        return;
      }

      // if there are two emails in the database shut that shit down
      if (result.length > 1) {
        res.status(500).send("Multiple users found with that email");
        return;
      }

      // if auth key exists it should match the auth key associated with the email
      if (result[0].userOauthKey) {
        if (result[0].userOauthKey === req.body.id) {
          res.status(200).send(result);
          return;
        } else {
          // shut that shit down if the auth keys do not match
          console.log("auth keys don't match");
          res.status(500).send("auth keys do not match");
          return;
        }
      } else {
        // if auth key does not exist but the email exists then add the auth key to the database
        memberController
          .updateUser(result[0]._id, {
            userOauthKey: req.body.id,
            status: "full"
          })
          .then(function(result2) {
            res
              .status(200)
              .send("auth key successfully added to existing user");
            return;
          })
          .catch(function(err) {
            console.log(err);
            res.status(500).send(err);
            return;
          });
      }
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

router.route("/update-many").put(function(req, res) {

  // Check for valid data payload
  if (!req.body) {
    res.status(400).send("No body!");
  }
  if (!req.body.members || req.body.members.length < 1) {
    res.status(400).send("Request contained 0 members!");
  }

  memberController
    .createMany(req.body.members, req.body.householdId)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
