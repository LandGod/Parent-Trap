import React, { Component } from 'react';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "../../pages/style/Home.css"


// This is our firebaseui configuration object
const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/dashboard',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

class SignIn extends Component {
      render() {
        return (
          <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        )
      }
}

export default SignIn
    