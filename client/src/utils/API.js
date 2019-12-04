import axios from "axios";

export default {

  // Gets all events - sand-box edition
  getAllEvents: function() {
    return axios.get("/api/event/members");
  },

  // Gets all events for household
  getAllHouseholdEvents: function(id) {
    console.log(`HouseholdId: ${id}`)
    return axios.get("/api/event/all/" + id);
  },

  // determing login route
  login: function(userData) {
    return axios.put("/api/member/login", userData);
  },

  createEvent: function(eventData) {

    return axios.post('/api/event', eventData );
  },

  updateEvent: function(id,eventData) {

    return axios.put('/api/event/'+id, eventData );
  }

};
