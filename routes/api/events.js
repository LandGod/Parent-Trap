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
  var currentStartDate  = "";
  var currentDateEvents = {};
  result[0].events.map((event,i) => {
    var newEventStartDate = (`${daysOfWeek[event.startTime.getDay()]} ${event.startTime.getMonth()}/${event.startTime.getDate()}/${event.startTime.getFullYear()}`);
    console.log(`Current Date is: ${currentStartDate} New Date is: ${newEventStartDate}`);
    if (i === 0) {  // need to create first object
      currentDateEvents = {date: newEventStartDate};
      currentStartDate = newEventStartDate;
      console.log(`Current Date is: ${currentStartDate} New Date is: ${newEventStartDate}`);
      console.log(`1.object is: ${JSON.stringify(currentDateEvents)}`);
    } else if (newEventStartDate === currentStartDate) {
      console.log(`process an event for the current date`)
    } else {
      currentStartDate = newEventStartDate;
      // push current object into master array then create new object
      transformedData.push(currentDateEvents)
      console.log(`2.object is: ${JSON.stringify(currentDateEvents)}`);
      currentDateEvents = {date: newEventStartDate};
      console.log(`3.object is: ${JSON.stringify(currentDateEvents)}`);
    }
  });
  transformedData.push(currentDateEvents);
  console.log(`4.object is: ${JSON.stringify(currentDateEvents)}`);
  console.log(`Transformed Data: ${JSON.stringify(transformedData)}`);
  

}


    
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>");
      // var eventStartDate = (`${daysOfWeek[event.startTime.getDay()]} ${event.startTime.getMonth()}/${event.startTime.getDate()}/${event.startTime.getFullYear()}`);
      // console.log(`starttime is: ${event.startTime}`);
      // console.log(`date is: ${eventStartDate}`);

      // console.log(`status: ${event.status}`);
      // console.log(`_id: ${event._id}`);
      // console.log(`title: ${event.title}`);
      // console.log(`eventType: ${event.eventType}`);
      // console.log(`location1: ${event.location1}`);
      // console.log(`location2: ${event.location2}`);
      // console.log(`startTime: ${event.startTime}`);
      // console.log(`endTime: ${event.endTime}`);
      // if (event.startTime) {
      //   console.log(`s-day: ${daysOfWeek[event.startTime.getDay()]}`);
      //   console.log(`s-date: ${event.startTime.getMonth()}/${event.startTime.getDate()}/${event.startTime.getFullYear()}`);
      //   console.log(`s-time: ${event.startTime.getHours()}:${event.startTime.getMinutes()}${(event.startTime.getHours())} `);
      // }
      // if (event.endTime) {
      //   console.log(`e-day: ${daysOfWeek[event.endTime.getDay()]}`);
      //   console.log(`e-date: ${event.endTime.getMonth()}/${event.endTime.getDate()}/${event.endTime.getFullYear()}`);
      //   console.log(`e-time: ${event.endTime.getHours()}:${event.endTime.getMinutes()}${(event.endTime.getHours())} `);
      // }
      // console.log(`creator._id: ${event.creator._id}`);
      // console.log(`creator.firstName: ${event.creator.firstName}`);
      // console.log(`creator.lastName: ${event.creator.lastName}`);
      // console.log(`invitees length: ${event.invitees.length}`);
      // if (event.invitees.length > 0) {
      //   // console.log(`invitee: ${event.invitees[0].member}`)
      //   console.log(`invitee._id: ${event.invitees[0].member._id}`)
      //   console.log(`invitee.firstName: ${event.invitees[0].member.firstName}`)
      //   console.log(`invitee.lastName: ${event.invitees[0].member.lastName}`)
      // };
      // console.log(`note: ${event.note}`);
      

      
 


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
