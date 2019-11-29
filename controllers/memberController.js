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

      // Define new bulk database operation queue
      var bulk = db.users.initializeUnorderedBulkOp();

      // Create db query for each member object in array
      membersArray.forEach(memberObj => {
        // Create find filter: look for existing account with matching email:
        let filter = { email: memberObj.email };

        // Create update package
        let update = {
          firstName: memberObj.firstName,
          lastName: memberObj.lastName,
          email: memberObj.email
        };

        // Add oauth key to update package, if it exists. Also set user status accordingly.
        if (memberObj.userOauthKey) {
          update["userOauthKey"] = memberObj.userOauthKey;
          update["status"] = "full";
        }

        // If no oauth key, instead set user status to invited.
        else {
          update["status"] = "invited";
        }

        // Finalize db query and add to bulk operation queue
        bulk.findOneAndUpdate(filter, update, {
          new: true, // Return modified document
          upsert: true // Make this update into an upsert
        });
      });

      // Excute bulk db action
      bulk.execute()
      .then((results) => {
        console.log('**************************')
        console.log('It worked???')
        console.log(results)

        resolve(results)

      })
      .catch((err) => {
        console.log('*****ERRR*****')
        console.log(err)
        reject(err)
      })

    });
  }
};
