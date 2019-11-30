// Import mongoose
const mongoose = require("mongoose");


var HouseholdSchema = new mongoose.Schema({
    // name of household
    name: {
      type: String,
      required: true
    },
    // Array of refferences to member objects
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member'
        }
    ],
    // Array of references to event objects
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

// Create model from schema
const Household = mongoose.model('Household', HouseholdSchema);

// Export model
module.exports = Household;