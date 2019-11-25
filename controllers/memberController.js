const db = require("../models");
const { ObjectId } = require("mongoose").Types // Import mongoose ObjectId for validation, etc

module.exports = {

// find all members
    findAll: function(req, res) {
        db.Member
        .find()
        .then(dbMember => res.json(dbMember))
        .catch(err => res.status(422).json(err));
    }

// add Oauth key




}