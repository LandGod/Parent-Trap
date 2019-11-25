import axios from "axios";

export default {

  // Gets all events - sand-box edition
  getAllEvents: function() {
    return axios.get("/api/events/members");
  },

  // Gets all events for household
  getAllHouseholdEvents: function(id) {
    console.log(`HouseholdId: ${id}`)
    return axios.get("/api/events/all/" + id);
  },

  // determing login route
  login: function(userData) {
    return axios.get("/api/member");
  }

};
