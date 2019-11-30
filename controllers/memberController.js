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
              email: memberObj.email
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

        // Add constructed query to array
        bulkOps.push(upsertQuery);
      });

      // Excute bulk db action
      db.Member.bulkWrite(bulkOps)
        .execute()
        .then(results => {
          console.log("**************************");
          console.log("It worked???");
          console.log(results);

          resolve(results);
        })
        .catch(err => {
          console.log("*****ERRR*****");
          console.log(err);
          reject(err);
        });
    });
  }
};
