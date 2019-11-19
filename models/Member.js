// Import mongoose
const mongoose = require("mongoose");

var MemberSchema = new mongoose.Schema({
    // OAuth key? (text)
    // TODO: This should be unique, but we also need to allow it to be null when the user is invited, but hasn't created thier account yet
    // not sure how to do that yet.
    userOauthKey: {
        type: String 

    },
    // email (text)
    email: {
        type: String,
        required: true,
        unique: true
    },
    // firtName (text)
    firstName: {
        type: String,
        required: true
    },
    // lastName (test)
    lastName: {
        type: String
    },
    // status ('invited', 'full')
    status: {
        type: String,
        required: true
    }

});

// Export schema
const Member = mongoose.model('Member', MemberSchema);

// Export schema
module.exports = Member;