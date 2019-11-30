import axios from "axios";

export default {

  // Gets all events for household
  getHouseholdEvents: function(householdId,userId,type) {
    console.log(`HouseholdId: ${householdId} userid: ${userId} type: ${type}`)
    switch (type) {
      case "all": 
        return axios.get(`/api/event/all/${householdId}`);
        break;
      case "unassigned":
        return axios.get(`/api/event/unassigned/${householdId}`);
        break;  
      case "current-user": 
        return axios.get(`/api/event/current-user/${householdId}/${userId}`);
        break;   
      default:
          break; 
    }
  },

  // determing login route
  login: function(userData) {
    return axios.put("/api/member/login", userData);
  },

  createEvent: function(eventData) {
    return axios.post('/api/createEvent', eventData );
  },

  updateEvent: function(id,eventData) {
    return axios.put('/api/event/' + id, eventData );
  },

  // addInvitee: function(id,eventData) {
  //   return axios.put('/api/event/assign/' + id, eventData );
  // },

  // removeInvitee: function(id,eventData) {
  //   return axios.put('/api/event/unassign/' + id, eventData );
  // }

};
