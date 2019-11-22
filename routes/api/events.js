const router = require("express").Router();
const eventController = require("../../controllers/eventController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects

// All routes on this page will be appended to this root: "api/events/""



const eventData = [
  { date: "Monday 11/18/2019",
    events: [{status: "closed", title: "Ride to Practice", eventType: "ride", time: "9:00 AM", creator: "Rory", assigned: "Myles"},
            {status: "closed", title: "Pick up from work", eventType: "ride", time: "9:00 AM", creator: "Rory", assigned: "Myles"},
            {status: "closed", title: "Sign permission slip", eventType: "task", time: "", creator: "Kyra", assigned: "Sean"},
            {status: "closed", title: "Pick up from Jane's", eventType: "ride", time: "8:00PM", creator: "Rory", assigned: "Myles"}]},
    {date: "Wednesday 11/20/2019",
    events: [{status: "open", title: "Pick up dinner", eventType: "task", time: "5:00 PM", creator: "Sean", assigned: "Myles"}]},
    {date: "Thursday 11/21/2019",
    events: [{status: "open", title: "Drop off at meet", eventType: "ride", time: "4:00 PM", creator: "Rory", assigned: ""},
            {status: "open", title: "Pick up from meet", eventType: "ride", time: "9:00 PM", creator: "Rory", assigned: ""}]}
  ]

var transformedData = [];  
const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
// transform household events helper function
transformEvents = result => {
  // console.log(`result:  ${result[0].events[0]}`)
  result[0].events.map((event,i) => {
    if (i === 0) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(`status: ${event.status}`);
      console.log(`_id: ${event._id}`);
      console.log(`title: ${event.title}`);
      console.log(`eventType: ${event.eventType}`);
      console.log(`startTime: ${event.startTime}`);
      console.log(`day: ${daysOfWeek[event.startTime.getDay()]}`);
      console.log(`date: ${event.startTime.getMonth()}/${event.startTime.getDate()}/${event.startTime.getFullYear()}`);
      console.log(`time: ${event.startTime.getHours()}:${event.startTime.getMinutes()}${(event.startTime.getHours())} `);
      console.log(`creator._id: ${event.creator._id}`);
      console.log(`creator.firstName: ${event.creator.firstName}`);
      console.log(`creator.lastName: ${event.creator.lastName}`);
      console.log(`invitees length: ${event.invitees.length}`);
      if (event.invitees.length > 0) {
        // console.log(`invitee: ${event.invitees[0].member}`)
        console.log(`invitee._id: ${event.invitees[0].member._id}`)
        console.log(`invitee.firstName: ${event.invitees[0].member.firstName}`)
        console.log(`invitee.lastName: ${event.invitees[0].member.lastName}`)
      }

      
    }
  })

  return 42;
  // return tranformedEvents;
}  

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
    // console.log(`Events.js ServerSide householdId is:  ${householdId}`)
    // console.log(`Events.js ServerSide req.body:  ${JSON.stringify(req.body)}`)
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
        // console.log('=================')
        transformEvents(result);
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
