// This file contains utility functions that may be useful across multiple controllers

// Dependencies
const ObjectId = require('mongoose').Types.ObjectId;


// The following function checks if the provided string or object is a valid MongoDB ObjectId
function validateObjectId(id) {

    // We'll do 3 different things based on whether we get a string, mongoose object, or unknown type
    switch (typeof (id)) {

        // If string, we cast it to a mongoose ObjectId and then see a) is it valid, b) did casting it change it
        // While a string of the correct length might still show as valid to Mongoos's builtin function, the act of casting it to an object would change it in that case
        case 'string':
            let obj;
            try { obj = new ObjectId(id) }
            catch (e) { return false }

            if (id === obj.toString() && ObjectId.isValid(id)) { 
                return true;
            };

            break;

        // If it's already an object, we'll just use mongoose's built in validator method
        case 'object':
            if (ObjectId.isValid(id)) {return true};

            break;

        // If it's neither an object nor a string, then it will be considered to be invalid input
        default:
            throw new TypeError("Input must be string or Mongoose ObjectId");
    }

    // If no case returned true, then return false
    return false;

}

module.exports = { validateObjectId };