import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";
import HouseHold from "../components/HouseHold";
import { getLocalUserInfo } from "../components/utilityFunctions";
import "./style/Signup.css";

class Signup extends Component {
  render() {
    // Get newly generated user info, from firebase, out of session storage
    let currentUser = getLocalUserInfo();

    return (
      <Container>
        <HouseHold
          createMode={true}
          householdName={currentUser.lastName}
          //Add the info from current user to list of members
          members={[
            {
              userOauthKey: currentUser.oauthKey,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              email: currentUser.email,
              status: "full"
            }
          ]}
        />
      </Container>
    );
  }
}

export default Signup;
