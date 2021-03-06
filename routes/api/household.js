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
      .findById(userId)

      // Resolve request with results from db operation
      .then(function(result) {
        if (!result.length) {
          res.status(204); // If no results are returned, just send status 204
        } else {
          res.status(200).json(result); // If results are returned, send them along with status 200 (ok)
        }
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

// resolves as /api/household/byId/:id    
router
.route("/byId/:id")
.get(function(req, res) {
  // Validate req params
  if (!req.params) {
    res.status(400).send("Request object has no parameters!");
    return;
  }

  // Get household id & assert that it is not undefined 
  let householdId = req.params.id;
  //console.log(`household.js ServerSide householdId is:  ${householdId}`)
  if (!householdId) {
    res.status(400).send("No householdId");
    return;
  }

  // Cast to mongoose ObjectId
  householdId = mongoose.Types.ObjectId(householdId);

  // Send parsed and validated request data to event controller
  householdController
  .findByHouseHoldId(householdId)

  // Resolve request with results from db operation
  .then(function(result) {
    // console.log(JSON.stringify(result));
    res.status(200).json(result);
  })
  .catch(function(err) {
    res.status(500).send(err);
  }); 
});

  // POST: /api/household/create
  router.route('/create')
  .post(function(req, res){
    
    // Validation
    if ( !req.body ) {res.status(400).send('No Body!'); return};
    if ( !req.body.name ) {res.status(400).send('No household name!'); return}

    householdController.create(req.body.name)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send(err)
    })

  })

  // Put: /api/household/add-members
  router.route('/add-members')
  .put(function(req, res){

    // Validate
    if (!req.body) {res.status(400).send('Request had no body!'); return};
    if (!req.body.householdId) {res.status(400).send('No household id!'); return};
    if (!req.body.idsArray || req.body.idsArray.length < 1) {res.status(400).send('Array of member ids was empty or undefined!'); return};

    householdController.addMembers(req.body.householdId, req.body.idsArray)
    .then((results) => {
      res.status(200).json(results)
    })
    .catch((err) => res.status(500).send(err));

  })

module.exports = router;