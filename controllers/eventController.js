const db = require("../models");

module.exports = {
  // Return all events for the given household and populate all member references
  // TODO: This method partially works, but populate creator seems broken and populate invitees has not been tested yet
  findAllEventsPopulated: function(householdId) {
    return new Promise((resolve, reject) => {
      db.Household.find({ _id: householdId },{members:0,name:0,_id:0,__v:0 })
        .populate({path: "events", select: ["_id","title","eventType","status","location1","location2",
        "startTime","endTime","note"], options: {sort: {startTime: 1}},
            populate: [{path: "creator", select: ["_id","firstName", "lastName"]},
                        {path: "invitees.member", select: ["_id","firstName","lastName"]}]
    })
        .then(dbEvent => {resolve(dbEvent)})
        .catch(err => {reject(err)});
    });
  },
  
  create: function(req, res) {
    let houseHoldId = req.body.houseHoldId;
    //delete the householdId from the body because it doesn't need to be in the event document
    delete req.body.houseHoldId;
    db.Event.create(req.body)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  
};
