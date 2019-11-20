const db = require("../models");
const mongoose = require("mongoose");

// Defining methods for the eventController
module.exports = {
  findAll: function(req, res) {
    db.Member.find(req.query)
      .then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Member.findById(req.params.id)
      .then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Member.create(req.body)
      .then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    db.Member.findOneAndUpdate({ _id: id }, req.body, {new: true})
      .then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Member.findById(req.params.id)
      .then(dbMember => dbMember.remove())
      .then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  }
};
