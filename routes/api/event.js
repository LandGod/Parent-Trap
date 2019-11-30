const router = require("express").Router();
const eventController = require("../../controllers/eventController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects

// All routes on this page will be appended to this root: "api/events/""

// helper function time formatter
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// helper function to build and event array element
buildEventObject = (event,eventCount) => {
  let showhideval = (eventCount > 3) ? "hide-event" : "show-event";
  var eventObj = {};
  eventObj.event_id = event._id;
  eventObj.title = event.title;
  eventObj.eventType = event.eventType;
  eventObj.status = event.status;
  eventObj.location1 = event.location1;
  eventObj.location2 = event.location2;
  eventObj.time = formatAMPM(event.startTime);
  eventObj.startTime = event.startTime;
  eventObj.endTime = event.endTime;
  eventObj.creator_id = event.creator._id;
  eventObj.creator = event.creator.firstName;
  if (event.assignee) {
    eventObj.assigned_id = event.assignee._id;
    eventObj.assigned = event.assignee.firstName
  } else {
    eventObj.assigned_id = undefined;
    eventObj.assigned = undefined;
  };
  eventObj.assignedStatus = event.assignedStatus;
  eventObj.note = event.note;
  eventObj.showhideclass = showhideval;
  return eventObj;
}

// transform household events helper function
transformEvents = result => {
  var currentStartDate  = "";
  var currentDateEvents = {};
  var transformedData = [];  
  let eventCount = 1;
  const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  result[0].events.map((event,i) => {
    var newEventStartDate = (`${daysOfWeek[event.startTime.getDay()]} ${event.startTime.getMonth()}/${event.startTime.getDate()}/${event.startTime.getFullYear()}`);
    if (i === 0) {  // need to create first object
      currentDateEvents = {date: newEventStartDate};
      currentStartDate = newEventStartDate;
      currentDateEvents.events = [];
      currentDateEvents.events.push(buildEventObject(event,eventCount));
    } else if (newEventStartDate === currentStartDate) {  // process the current event
      eventCount = eventCount + 1;
      currentDateEvents.events.push(buildEventObject(event,eventCount));
    } else { // process a new date
      eventCount = 1;
      // reset currentStartDate to that of the new inbound data's date
      currentStartDate = newEventStartDate;
      // push current object into master array then create new object
      transformedData.push(currentDateEvents)
      currentDateEvents = {date: newEventStartDate};
      // events - call helper function - starting new day's events
      currentDateEvents.events = [];
      currentDateEvents.events.push(buildEventObject(event,eventCount));
    }
  });

  // finish up by loading last date's object into master
  transformedData.push(currentDateEvents);
  // console.log(`Transformed Data: ${JSON.stringify(transformedData)}`);
  return transformedData;

}


// TO-DO - if time permits these 3 routes below are all very similiar
// and could be refactored here and also in the eventController, dashboard and API files
// to converted to functions with passed in parameters to handle the route uniqueness

// GET all events from the given household
router
  .route("/all/:id")
  .get(function(req, res) {
    // Validate req params
    if (!req.params) {
      res.status(400).send("Request object has no parameters!");
      return;
    }

    // Get household id & assert that it is not undefined 
    let householdId = req.params.id;
    // let householdId = "5dd726706ddba45e5d59db35";
    // console.log(`Events.js ServerSide householdId is:  ${householdId}`)
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
        // console.log(JSON.stringify(result));
        //res.status(200).json(result);
        res.status(200).json(transformEvents(result));
      })
      .catch(function(err) {
        res.status(500).send(err);
      });

  });



  // GET all unassigned events
  router
  .route("/unassigned/:id")
  .get(function(req, res) {
    // Validate req params
    if (!req.params) {
      res.status(400).send("Request object has no parameters!");
      return;
    }

    // Get household id & assert that it is not undefined 
    let householdId = req.params.id;
    // let householdId = "5dd726706ddba45e5d59db35";
    // console.log(`Events.js ServerSide householdId is:  ${householdId}`)
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
    .findUnassignedEventsPopulated(householdId)

    // Resolve request with results from db operation
    .then(function(result) {
      // console.log(JSON.stringify(result));
      //res.status(200).json(result);
      res.status(200).json(transformEvents(result));
    })
    .catch(function(err) {
      res.status(500).send(err);
    }); 

  });



  // GET all of a user's events
  router
  .route("/current-user/:id/:userid")
  .get(function(req, res) {
    // Validate req body
    if (!req.params) {
      res.status(400).send("Request object has no parameters!");
      return;
    }

    // Get household id & assert that it is not undefined 
    let householdId = req.params.id;
    // let householdId = "5dd726706ddba45e5d59db35";
    console.log(`Events.js ServerSide householdId is:  ${householdId}`)
    if (!householdId) {
      res.status(400).send("No householdId");
      return;
    }

    // Get user id & assert that it is not undefined 
    let userId = req.params.userid;
    // let householdId = "5dd726706ddba45e5d59db35";
    console.log(`Events.js ServerSide userId is:  ${userId}`)
    if (!userId) {
      res.status(400).send("No userId");
      return;
    } 

    // Validate household id and cast to ObjectId
    // TODO: Call object id validation function (Currently written in a different branch that hasn't been merged to dev yet)

    // Cast to mongoose ObjectId
    householdId = mongoose.Types.ObjectId(householdId);
    userId = mongoose.Types.ObjectId(userId);


    // Send parsed and validated request data to event controller
    eventController
    .findUserEventsPopulated(householdId,userId)

    // Resolve request with results from db operation
    .then(function(result) {
      // console.log(JSON.stringify(result));
      //res.status(200).json(result);
      res.status(200).json(transformEvents(result));
    })
    .catch(function(err) {
      res.status(500).send(err);
    }); 

  });

  // event PUT route to update one Event
  // Matches with "/api/event/:id"
  router
    .route("/:id")
    .put(eventController.update);

  // // Matches with "/api/event/unassign"
  // router
  // .route("/unassign/:id")
  // .put(eventController.removeAssigned);

  // // Matches with "/api/event/assign"
  // router
  // .route("/assign/:id")
  // .put(eventController.addAssigned);
  router.route("/")
  .post(eventController.createEvent);

module.exports = router;