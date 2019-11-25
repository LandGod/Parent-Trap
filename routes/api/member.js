const router = require("express").Router();
const memberController = require("../../controllers/memberController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects

router
  .route("/member")
  // GET all members 
  .get(function(req, res) {
      console.log(req.body)
       // Validate req body
        if (!req.body) {
            res.status(400).send("Request has no body!");
            return;
        }

        // send request to get all of the members
        memberController
            .findAll()
            .then(function(res) {
                res.status(200).json(res);
                console.log('success')
            })
            .catch(function(err){
                res.status(500).send(err);
            })

        // upon result perform the follow 3 if statements

        // if the email and authkey exists take them to the dashboard
        // if the email exists but the authkey does not, add the authkey to the document, then take them to the dashboard
        // if no email exists, add the user and take to create household screen

});

module.exports = router;