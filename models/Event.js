// Import mongoose
const mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
    // Title (Text)
    title: {
        type: String,
        required: true
    },
    // Type ('task'/'ride') *Changed to 'eventType' since type is a reserved word for mongoose
    eventType: {
        type: String,
        enum: ['task', 'ride'],
        required: true
    },
    // Status ('open'/'claimed'/'closed')
    status: {
        type: String,
        enum: ['open', 'claimed', 'closed'],
        default: 'open',
        required: true
    },
    // Location1
    location1: {
        type: String
    },
    // Location2
    location2: {
        type: String
    },
    // Time
    //  start (ISO DATETIME)
    //  end   (ISO DATETIME)
    startTime: {
        type: mongoose.Schema.Types.Date
    },
    endTime: {
        type: mongoose.Schema.Types.Date
    },
    // Creator (Family Member ID)
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    // Invitees (Array of subdocuments)
    // member = ObjectId of Member
    // statuses = 'claimed', 'declined', 'invited'
    invitees: [InviteeSchema],
    // Note (Text)
    note: {
        type: String
    }

});

// Create model from schema
const Event = mongoose.model('Event', EventSchema);

// Export model
module.exports = Event;


// This schema is only used as a subdocument for Events, so it will just be defined here and not exported
var InviteeSchema = new mongoose.Schema({
    member: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['claimed', 'declined', 'invited'],
        required: true
    },
});