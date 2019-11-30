const db = require("../models");
const mongoose = require("mongoose");


// TO-DO - the 3 DB Read operations are very similiar
// if time permits refactor into 1 function using parameter
// based Match clause object on the populate Events line

module.exports = {
  // Return all events for the given household and populate all member references
  findAllEventsPopulated: function(householdId) {
    return new Promise((resolve, reject) => {
      db.Household.find({ _id: householdId },{members:0,name:0,_id:0,__v:0,invitees:0 })
        .populate({path: "events", options: {sort: {startTime: 1}},
            populate: [{path: "creator", select: ["_id","firstName", "lastName"]},
                       {path: "assignee", select: ["_id","firstName", "lastName"]}
                      ]
   
            // populate: [{path: "invitees", select: ["_id"]},]           
        })
        .then(dbEvent => {resolve(dbEvent)})
        .catch(err => {reject(err)});
    });
  }, 

  // Return unassigned events for the given household and populate all member references
  findUnassignedEventsPopulated: function(householdId) {
    return new Promise((resolve, reject) => {
      db.Household.find({ _id: householdId },{members:0,name:0,_id:0,__v:0,invitees:0 })
        .populate({path: "events", match: {assignedStatus: "unassigned"}, options: {sort: {startTime: 1}},
            populate: [{path: "creator", select: ["_id","firstName", "lastName"]},
                        {path: "assignee", select: ["_id","firstName", "lastName"]}
                      ]
    
            // populate: [{path: "invitees", select: ["_id"]},]           
        })
        .then(dbEvent => {resolve(dbEvent)})
        .catch(err => {reject(err)});
    });
  }, 

  // Return user's events for the given household and populate member references
  // match: {assigneeStatus: "claimed"},
  //, match: {assignedStatus: "unclaimed"}
  findUserEventsPopulated: function(householdId,userId) {
    return new Promise((resolve, reject) => {
      db.Household.find({ _id: householdId },{members:0,name:0,_id:0,__v:0,invitees:0 })
        .populate({path: "events", match: {creator: userId}, options: {sort: {startTime: 1}},
            populate: [{path: "creator", select: ["_id","firstName", "lastName"]},
                        {path: "assignee", select: ["_id","firstName", "lastName"]}
                      ]
    
            // populate: [{path: "invitees", select: ["_id"]},]           
        })
        .then(dbEvent => {resolve(dbEvent)})
        .catch(err => {reject(err)});
    });
  }, 
  
  // old version when invitees what used - keep in case of reviving invitee model
  // findAllEventsPopulated: function(householdId) {
  //   return new Promise((resolve, reject) => {
  //     db.Household.find({ _id: householdId },{members:0,name:0,_id:0,__v:0 })
  //       .populate({path: "events", select: ["_id","title","eventType","status","location1","location2",
  //       "assignedState","startTime","endTime","note","invitees._id"], options: {sort: {startTime: 1}},
  //           populate: [{path: "creator", select: ["_id","firstName", "lastName"]},
                       
  //                      {path: "invitees.member", select: ["_id","firstName","lastName"]}],
  //           // populate: [{path: "invitees", select: ["_id"]},]           
  //   })
  //       .then(dbEvent => {resolve(dbEvent)})
  //       .catch(err => {reject(err)});
  //   });
  // },

  // Add a new event to the database using an already validated body (probably the req.body of the api route) and the _id value of the creator
  create: function(body, creator) {
    return new Promise((resolve, reject) => {
      db.Event.create({
        // Any missing fields will be passed null instead of undefined 
        // Any missing fields that are required will reject the promise with a message
        title: body.title || reject('Missing title'),
        eventType: body.type || reject('Missing type for event'),
        status: "open",
        location1: body.location1 || body.location || null, // If only one location is provided, it may be passed as 'location1' or simply 'locaiton'
        location2: body.location2 || null,
        startTime: body.startTime,
        endTime: body.endTime || body.startTime, // If the event has no end time, the end time will be set equal to the start time.
        creator: creator || reject('Missing creator'),
        note: body.note || null
      })
      // The results of the operation will be be sent to resolve the promise or reject it with an error
      .then((result) => {resolve(result)})
      .catch((err) => {reject(err)});
    });
  },

  // quick version of update until it can be refactored into the go-forward pattern
  update: function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    db.Event.findOneAndUpdate({ _id: id }, req.body, {new: true})
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },


  // // quick version of find and remove invitee subdocument until it can be refactored into the go-forward pattern
  // addAssigned: function (req, res) {
  //   var eventId = mongoose.Types.ObjectId(req.params.id);
  //   const memberId = '5dd596bf8813384487dca854'
  //   db.Event.update(
  //     { _id: eventId },
  //     { $push: { invitees: { member: memberId, status: "claimed"} } },
  //   //  { upsert: true},
  //     { new: true },
  //     function(err) {
  //         if (err) { console.log(err) }
  //     }
  //   )
  // },

  // // quick version of find and remove invitee subdocument until it can be refactored into the go-forward pattern
  // removeAssigned: function (req, res) {
  //   var eventId = mongoose.Types.ObjectId(req.params.id);
  //   // var inviteeId = mongoose.Types.ObjectId(req.params.id2);
  //   //var eventId = "5dd59e7c8813384487dca857"
  //   var inviteeId = "5dd5a51ef7b2cb4517d0c2a1"
  //   db.Event.findOneAndUpdate(
  //     { _id: eventId },
  //     { $pull: { invitees: { _id: inviteeId} } },
  //     { new: true },
  //     function(err) {
  //         if (err) { console.log(err) }
  //     }
  //   )
  // }

};
