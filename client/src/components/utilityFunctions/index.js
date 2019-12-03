module.exports = {
  // Get user info object from client storage
  getLocalUserInfo: function() {
    return {
      firstName: sessionStorage.getItem("firstName"),
      lastName: sessionStorage.getItem("lastName"),
      email: sessionStorage.getItem('email'),
      oauthKey: sessionStorage.getItem("id"), // Oauth id
      memberId: sessionStorage.getItem("userID"), // Mongoose object id for memeber document
      currentHouseholdId: sessionStorage.getItem("householdId") // Mongoose object id for current household
    };
  }
};
