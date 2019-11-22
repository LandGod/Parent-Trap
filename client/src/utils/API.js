import axios from "axios";

export default {

  // Gets all events - sand-box edition
  getAllEvents: function() {
    return axios.get("/api/events/members");
  },

  // Gets all events for household
  getAllHouseholdEvents: function(houseData) {
    // console.log(`HouseholdId: ${JSON.stringify(houseData)}`)
    return axios.get("/api/events/all", houseData);
  }


};
