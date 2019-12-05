import React, { Component } from "react";
import { Container, Row, Col } from "../Grid";
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
            // console.log(`res.data: ${JSON.stringify(res.data)}`)
            // If status 200, user exists and is good to go
            if (res.status === 200) {
              // grab user ID and household ID found in the database
              // Predefine let variables to avoid scope problems
              let userID;
              let householdID
              // Based on whether or not res.data reurns an array, or a single results, extract data
              if (res.data[0]) {
                userID = res.data[0]._id;
                householdID = res.data[0].households[0]; // Grabs only the first household a user belongs to becuse MVP
              } else {
                userID = res.data._id;
                householdID = res.data.households[0]; // Grabs only the first household a user belongs to becuse MVP
              }

              // store user ID and household ID in session storage
              sessionStorage.setItem("userID", userID);
              sessionStorage.setItem("householdId", householdID);

              this.props.parent.setState({ redirectDashboard: true });
            }
            // If status 204, user does not exist, send to signup flow
            else if (res.status === 204) {
              this.props.parent.setState({ redirectSignUp: true });
            }
            // If neither of those is true, something is broken
            else {
              console.log("Invalid status recieved from res:", res.status);
            }
          })
          .catch(err => console.log(err));
      }
    }
  };

  render() {
    return (
        <Row>
          <Col size="md-12">
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </Col>
        </Row>
    );
  }
}

export default SignIn;
