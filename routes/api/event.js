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
buildEventObject = event => {
  // var eventObj = {placeholder: "this is an event"};
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
  (event.invitees.length > 0) ? eventObj.assigned_id = event.invitees[0].member._id : eventObj.assigned_id = "";
  (event.invitees.length > 0) ? eventObj.assigned = event.invitees[0].member.firstName : eventObj.assigned = "";
  eventObj.note = event.note;
  return eventObj;
}

// transform household events helper function
transformEvents = result => {
  var currentStartDate  = "";
  var currentDateEvents = {};
  var transformedData = [];  
  const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  result[0].events.map((event,i) => {
    var newEventStartDate = (`${daysOfWeek[event.startTime.getDay()]} ${event.startTime.getMonth()}/${event.startTime.getDate()}/${event.startTime.getFullYear()}`);
    if (i === 0) {  // need to create first object
      currentDateEvents = {date: newEventStartDate};
      currentStartDate = newEventStartDate;
      currentDateEvents.events = [];
      currentDateEvents.events.push(buildEventObject(event));
    } else if (newEventStartDate === currentStartDate) {
      // process the current event
      currentDateEvents.events.push(buildEventObject(event));
    } else {
      // reset currentStartDate to that of the new inbound data's date
      currentStartDate = newEventStartDate;
      // push current object into master array then create new object
      transformedData.push(currentDateEvents)
      currentDateEvents = {date: newEventStartDate};
      // events - call helper function - starting new day's events
      currentDateEvents.events = [];
      currentDateEvents.events.push(buildEventObject(event));
    }
  });
  // finish up by loading last date's object into master
  transformedData.push(currentDateEvents);
  // console.log(`Transformed Data: ${JSON.stringify(transformedData)}`);
  return transformedData;

}



router
  .route("/all/:id")
  // GET all events from the given household
  .get(function(req, res) {
    // Validate req body
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
        res.status(200).json(transformEvents(result));
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  router.route("/")
  .post(eventController.create);

module.exports = router;