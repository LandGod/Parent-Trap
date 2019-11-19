// Get models
const db = require("../models");

// Define some custom errors
class ValidationError extends Error { code = "BADNAME" };

// Define methods for manipulation of Households collection
module.exports = {

  // New household from scratch
  create: function (name) {

    // Return promise of function since it needs to do some asynch stuff
    return new Promise((resolve, reject) => {

      // Cast name to string and then perform more validation
      try {
        name = toString(name);
      } catch (e) {
        throw ValidationError("Household name was not able to be cast to string");
      }
      if (name == '[object Undefined]' || name == undefined || name == null || isNaN(name)) {
        throw ValidationError("Household name was not able to be cast to string");
      }
      if (name.length < 3) {
        throw ValidationError("Household name too short");
      }
      if (name.length > 255) {
        throw ValidationError("Household name too long");
      }

      // Create household using the validated name
      // Users and events are not added at this time, although the model should insert blank arrays for each automatically
      db.Household.create({ name: name })
        .then(result => {
          resolve('Success');
        })
        .catch(err => {
          reject(err);
        });
    })
  },

  // Find household that is parent of user object (via user's OauthId)
  findByOauth: function (oauthKey) {}

};