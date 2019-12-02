import React, { Component } from "react";
import * as firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import API from "../../utils/API";
import "../../pages/style/Home.css";

class SignIn extends Component {

  // This is our firebaseui configuration object
  uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: "/dashboard",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        // store the user Auth key in session storage
        sessionStorage.setItem("id", authResult.user.uid);

        // store the user display name
        var displayName = authResult.user.displayName;

        // store the user email
        var email = authResult.user.email;

        // store email in session storage
        sessionStorage.setItem("email", email);

        // split the display name to first and last name
        var displayNameArray = displayName.split(" ");
        var firstName = displayNameArray[0];
        var lastName = displayNameArray[1];

        // store the information in session storage
        sessionStorage.setItem("firstName", firstName);
        sessionStorage.setItem("lastName", lastName);

        // retrive the information from session storage and store in an object to send through the API call
        var userData = {
          id: sessionStorage.getItem("id"),
          firstName: sessionStorage.getItem("firstName"),
          lastName: sessionStorage.getItem("lastName"),
          email: sessionStorage.getItem("email")
        };

        // Send API call to evaluate:
        API.login(userData)
          .then(res => {

            // store user ID found in the database
            let userID = res.data[0]._id

            // store user ID in session storage
            sessionStorage.setItem('userID', userID)

            // If status 200, user exists and is good to go
            if (res.status === 200) {
              this.props.parent.setState({ redirectDashboard: true });
            }
            // If status 204, user does not exist, send to signup flow
            else if (res.status === 204) {
              this.props.parent.setState({ redirectSignUp: true });
            }
            // If neither of those is true, something is broken
            else {
              console.log('Invalid statis recieved from res:', res.status);
            }
          })
          .catch(err => console.log(err));
      }
    }
  };

  render() {

    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default SignIn;
