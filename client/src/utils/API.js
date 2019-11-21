import axios from "axios";

export default {
  // Gets all events
  getAllEvents: function() {
    return axios.get("/api/events/members");
  }
};
