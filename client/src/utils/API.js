import axios from "axios";

export default {

  // Gets all events - sand-box edition
  getAllEvents: function() {
    return axios.get("/api/events/members");
  },

  // Gets all events for household
  getAllHouseholdEvents: function(id) {
    console.log(`HouseholdId: ${id}`)
    return axios.get("/api/event/all/" + id);
  },

  createEvent: function(eventData) {

    return axios.post('/api/event', eventData );
  }

};
