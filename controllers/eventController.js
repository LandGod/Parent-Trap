const db = require("../models");

// for sand-box only:
const mongoose = require("mongoose");

module.exports = {
  // Return all events for the given household and populate all member references
  // TODO: This method partially works, but populate creator seems broken and populate invitees has not been tested yet
  findAllEventsPopulated: function(householdId) {
    return new Promise((resolve, reject) => {
      db.Household.find({ _id: householdId },{members:0,name:0,_id:0,__v:0 })
        .sort("+startTime")
        .populate({path: "events", select: ["status","_id","title","eventType","startTime"],
            populate: [{path: "creator", select: ["firstName", "lastName"]},
                        {path: "invitees.member", select: ["firstName","lastName"]}]
    })
        .then(dbEvent => {resolve(dbEvent)})
        .catch(err => {reject(err)});
    });
  },

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

  // for sandbox only:
  findAll: function(req, res) {
    db.Event.find(req.query)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  findAllPopulated: function(req, res) {
    db.Event.find(req.query)
      .sort('+startTime')
      .populate("creator")
      .populate("invitees.member")
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Event.findById(req.params.id)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Event.create(req.body)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    db.Event.findOneAndUpdate({ _id: id }, req.body, {new: true})
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Event.findById(req.params.id)
      .then(dbEvent => dbEvent.remove())
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  }

};

// // old controllers for sand-box
// const mongoose = require("mongoose");

// Defining methods for the eventController
// module.exports = {
// };
