const db = require('../models');

module.exports = {

    // Return all events for the given household and populate all member references
    findAllEventsPopulated: function(householdId) {
        db.Household.find({_id: householdId})
          .sort('+startTime')
          .populate("events")
          .populate("creator")
          .populate("invitees.member")
          .then(dbEvent => res.json(dbEvent))
          .catch(err => res.status(422).json(err));
      },

};
