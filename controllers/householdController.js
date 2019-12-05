// Get models & utils
const db = require("../models");
const { validateObjectId } = require("./utils");
const { ObjectId } = require("mongoose").Types; // Import mongoose ObjectId for validation, etc

// Define some custom errors
class ValidationError extends Error {}
ValidationError.prototype.message = "BADNAME";

// Define methods for manipulation of Households collection
module.exports = {
  // New household from scratch
  create: function(name) {
    // Return promise of function since it needs to do some asynch stuff
    return new Promise((resolve, reject) => {
      // Validation checks
      if (typeof name !== "string") {
        reject(new ValidationError("Household name must be a string. "));
      }
      // TODO: The following validation code results in triggering the if statement when it should not and I can't figure out why right now. Not really needed for MVP though.
      // if (name === '[object Undefined]' || name === undefined || name === null || isNaN(name)) {
      //   reject(new ValidationError(`"${name}" is not a valid value for Household name.`));
      // }

      // Names must be at least 2 characters long
      if (name.length < 2) {
        reject(new ValidationError("Household name too short"));
      }
      // TODO: Pick a maximum length for household names. We're putting it at 255 right now, but that is not meant to be permanent
      if (name.length > 255) {
        reject(new ValidationError("Household name too long"));
      }

      // Create household using the validated name
      // Users and events are not added at this time, although the model should insert blank arrays for each automatically
      db.Household.create({ name: name })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // Find household that is parent of user object (via user's OauthId)
  findById: function(memberId) {
    // Return rest of function as promise so that it will be 'then-able'
    return new Promise(function(resolve, reject) {
      // Start by validating id object
      if (!(memberId instanceof ObjectId)) {
        reject(
          new ValidationError("MemberId is not a valid mongoose ObjectId")
        );
      }

      // Search households collection for household with that _id in its list of users
      // Return the _id and name of the household
      db.Household.find({ members: memberId }, "_id name", function(
        err,
        householdInfo
      ) {
        // Errors cause promise to be rejected and return that error
        if (err) {
          reject(err);
        }

        // On success we will pass to the 'then' method an ARRAY of OBJECTS in the following format: {_id: useridkeystring, name: householdname}
        else {
          resolve(householdInfo);
        }
      });
    });
  },

  // Add all objetIds in idsArray arugment to the array of memberIds in the household with the given householdId
  addMembers: function(householdId, idsArray) {
    return new Promise(function(resolve, reject) {
      db.Household.update(
        {
          _id: householdId
        },
        {
          $addToSet: { members: { $each: idsArray } }
        }
      )
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // Add all objetIds in idsArray arugment to the array of memberIds in the household with the given householdId
  addEvents: function(householdId, idsArray) {
    return new Promise(function(resolve, reject) {
      db.Household.update(
        {
          _id: householdId
        },
        {
          $addToSet: { events: { $each: idsArray } }
        }
      )
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  },


  // find household by householdid
  findByHouseHoldId: function(householdId) {
    return new Promise(function(resolve, reject) {
      db.Household.find({ _id: householdId })
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          //console.log("catch error message for findByHouseHoldId");
          reject(err);
        });
    });
  }

}
