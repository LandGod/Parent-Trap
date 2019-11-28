module.exports = {
  // Get user info object from client storage
  // The oauthKey can be accessed from the returned object using [oauthKey] or [id] to allow for
  // personal preference and avoid confusion (since it is called different things in different places)
  getLocalUserInfo: function() {
    return {
      firstName: sessionStorage.getItem("firstName"),
      lastName: sessionStorage.getItem("lastName"),
      email: sessionStorage.getItem('email'),
      oauthKey: sessionStorage.getItem("id"),
      id: sessionStorage.getItem("id")
    };
  }
};
