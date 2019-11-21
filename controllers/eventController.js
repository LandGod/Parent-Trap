const db = require("../models");
const mongoose = require("mongoose");

// Defining methods for the eventController
module.exports = {
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
