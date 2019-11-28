const db = require("../models");
const { ObjectId } = require("mongoose").Types; // Import mongoose ObjectId for validation, etc

module.exports = {
  // find all members
  findAll: function() {
    return new Promise(function(resolve, reject) {
      db.Member.find()
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // find user by email
  findByEmail: function(email) {
    return new Promise(function(resolve, reject) {
      db.Member.find({ email: email })
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          console.log("catch error message for findByEmail");
          reject(err);
        });
    });
  },

  // update current user
  updateUser: function(id, userData) {
    console.log(id, userData);
    return new Promise(function(resolve, reject) {
      db.Member.update({ _id: id }, userData)
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          console.log("catch error message for UpdateUser");
          reject(err);
        });
    });
  }

  // add Oauth key
};
