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
  },

  // Bulk add or update new member/user
  createMany: function(membersArray) {
    // Return the rest of the function's actions as a promise to make it thenable
    return new Promise(function(resolve, reject) {

      // Track which user is given which index during bulk write (so we know which results corespond to which users)
      let userOrder = [];

      // Define array to add all our operations to
      var bulkOps = [];

      // Create db query for each member object in array
      membersArray.forEach(memberObj => {
        let upsertQuery = {
          // Each of these queries is an update of a single document
          updateOne: {
            // We're mathing to the email, since user may not have an oauth key and we may not know the id
            filter: { email: memberObj.email },
            // We'll add most of the update now, but some conditional elements later
            update: {
              firstName: memberObj.firstName,
              lastName: memberObj.lastName,
              email: memberObj.email,
              userOauthKey: memberObj.userOauthKey || null
            },
            // Create if not found and return updated document
            upsert: true,
            new: true
          }
        };

        // Add oauth key to update package, if it exists. Also set user status accordingly.
        if (memberObj.userOauthKey) {
          upsertQuery.updateOne.update["userOauthKey"] = memberObj.userOauthKey;
          upsertQuery.updateOne.update["status"] = "full";
        }

        // If no oauth key, instead set user status to invited.
        else {
          upsertQuery.updateOne.update["status"] = "invited";
        }

        // Add user object to userOrder array for tracking purposes
        userOrder.push(upsertQuery.updateOne.update)

        // Add constructed query to array
        bulkOps.push(upsertQuery);
      });

      // Excute bulk db action
      db.Member.bulkWrite(bulkOps)
        .then(results => {
          /* The results object will look something like this: 
          "ok": 1,
          "writeErrors": [],
          "writeConcernErrors": [],
          "insertedIds": [],
          "nInserted": 0,
          "nUpserted": 3,
          "nMatched": 0,
          "nModified": 0,
          "nRemoved": 0,
          "upserted": [
              {
                  "index": 0,
                  "_id": "5de2f4732ff6095090939464"
              },
              {
                  "index": 1,
                  "_id": "5de2f4732ff6095090939465"
              },
              {
                  "index": 2,
                  "_id": "5de2f4732ff6095090939466"
              }
          ]
          */

          // Create custom results report from raw mongoose results
          let report = {};

          // If entries were upserted, return the entire object, as inserted into DB (ie: show us the objId + what we already had)
          if (results.result.upserted.length > 0) {

            report.newIds = [];

            results.result.upserted.forEach(function(item, index) {

              let objIndex = item.index
              let corespondingUser = userOrder[objIndex]

              report.newIds[objIndex] = {
                _id: item._id || corespondingUser._id,
                userOauthKey: item.userOauthKey || corespondingUser.userOauthKey || null,
                firstName: corespondingUser.firstName,
                lastName: corespondingUser.lastName,
                email: corespondingUser.email
              }

            })
          }

          // Report total number of entries upserted, matched, errored
          report.added = results.result.nUpserted || 0; 
          report.alreadyExisted = results.result.nMatched;
          report.errors = results.result.writeErrors;

          // Attach raw results object as well, just in case we ever need that info
          report.rawResults = results.result;

          // Resolve result with generated report
          resolve(report);
        })
        // Handle errors
        .catch(err => {
          console.log("*****ERRR*****");
          console.log(err);
          reject(err);
        });
    });
  }
};
