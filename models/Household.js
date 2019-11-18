// Import mongoose
const mongoose = require("mongoose");

// Import Event schema & Member schema
const Event = require('./Event');
const Member = require('./Member');


var HouseholdSchema = new mongoose.Schema({
    // Array of members
    members: [Member],
    // Array of events
    events: [Event]
});

// Create model from schema
const Household = mongoose.model('Household', HouseholdSchema);

// Export model
module.exports = Household;