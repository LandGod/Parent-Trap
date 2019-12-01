// Import mongoose
const mongoose = require("mongoose");

var MemberSchema = new mongoose.Schema({
  // user Authentication Key from Firebase (text)
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
  },
  // list of households user is a memebr of
  households: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Household',
      required: true
    }
  ]
});

// Export schema
const Member = mongoose.model("Member", MemberSchema);

// Export schema
module.exports = Member;
