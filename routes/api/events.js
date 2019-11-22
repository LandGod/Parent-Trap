const router = require("express").Router();
const eventController = require("../../controllers/eventController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects

// All routes on this page will be appended to this root: "api/events/""

router
  .route("/all")
  // GET all events from the given household
  .get(function(req, res) {

    // Validate req body
    if (!req.body) {
      res.status(400).send("Request has no body!");
      return;
    }

    // Get household id & assert that it is not undefined 
    // let householdId = req.body.householdId;
    let householdId = "5dd726706ddba45e5d59db35";
    console.log(`Events.js ServerSide householdId is:  ${householdId}`)
    console.log(`Events.js ServerSide req.body:  ${JSON.stringify(req.body)}`)
    if (!householdId) {
      res.status(400).send("No householdId");
      return;
    }

    // Validate household id and cast to ObjectId
    // TODO: Call object id validation function (Currently written in a different branch that hasn't been merged to dev yet)

    // Cast to mongoose ObjectId
    householdId = mongoose.Types.ObjectId(householdId);


    // Send parsed and validated request data to event controller
    eventController
      .findAllEventsPopulated(householdId)

      // Resolve request with results from db operation
      .then(function(result) {
        res.status(200).json(result);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });


  // old routes for sand-box
  const {findAll, findAllPopulated, create, findById, update, remove} = require("../../controllers/eventController");

  // Matches with "/api/events"
  router.route("/")
  .get(findAll)
  .post(create);

  // Matches with "/api/events/members"
  router.route("/members")
  .get(findAllPopulated);


  // Matches with "/api/events/:id"
  router
  .route("/:id")
  .get(findById)
  .put(update)
  .delete(remove);



module.exports = router;
