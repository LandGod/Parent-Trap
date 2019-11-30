// Get models & utils
const db = require("../models");
const { validateObjectId } = require("./utils");
const { ObjectId } = require("mongoose").Types // Import mongoose ObjectId for validation, etc
const mongoose = require("mongoose");


// Define some custom errors
class ValidationError extends Error {};
ValidationError.prototype.message = "BADNAME";

// Define methods for manipulation of Households collection
module.exports = {

  findAll: function(req, res) {
    db.Household.find(req.query)
      .then(dbHousehold => res.json(dbHousehold))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Household.findById(req.params.id)
      .then(dbHousehold => res.json(dbHousehold))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Household.create(req.body)
      .then(dbHousehold => res.json(dbHousehold))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    db.Household.findOneAndUpdate({ _id: id }, req.body, {new: true})
      .then(dbHousehold => res.json(dbHousehold))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Household.findById(req.params.id)
      .then(dbHousehold => dbHousehold.remove())
      .then(dbHousehold => res.json(dbHousehold))
      .catch(err => res.status(422).json(err));
  }
  
};
