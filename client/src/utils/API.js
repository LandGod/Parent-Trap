import axios from "axios";
import { func } from "prop-types";

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
    return axios.post('/api/event', eventData );
  },

  updateEvent: function(id,eventData) {
    return axios.put('/api/event/' + id, eventData );
  },

  getMember: function(id) {
    return axios.get('/api/member/' + id);
  },

  getHousehold: function(id) {
    return axios.get('/api/household/' + id);
  },

  upsertMembers: function(data) {
    return axios.put('/api/member/update-many', data);
  },

  createHousehold: function(body) {
    return axios.post('/api/household/create', body);
  },

  addHouseholdMembers: function(body) {
    return axios.put('/api/household/add-members', body);
  }

  // addInvitee: function(id,eventData) {
  //   return axios.put('/api/event/assign/' + id, eventData );
  // },

  // removeInvitee: function(id,eventData) {
  //   return axios.put('/api/event/unassign/' + id, eventData );
  // }

};
