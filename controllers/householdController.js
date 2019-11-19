// Get models & utils
const db = require("../models");
const {validateObjectId} = require("./utils");

// Define some custom errors
class ValidationError extends Error { code = "BADNAME" };

// Define methods for manipulation of Households collection
module.exports = {

  // New household from scratch
  create: function (name) {

    // Return promise of function since it needs to do some asynch stuff
    return new Promise((resolve, reject) => {

      // Validation checks
      if (typeof(name) !== 'string') {
        reject(new ValidationError("Household name must be a string. "));
      }
      // TODO: The following validation code results in triggering the if statement when it should not and I can't figure out why right now. Not really needed for MVP though.
      // if (name === '[object Undefined]' || name === undefined || name === null || isNaN(name)) {
      //   reject(new ValidationError(`"${name}" is not a valid value for Household name.`));
      // }
      if (name.length < 3) {
        reject(new ValidationError("Household name too short"));
      }
      if (name.length > 255) {
        reject(new ValidationError("Household name too long"));
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
  findByOauth: function (oauthKey) { 

    // 

   }

};