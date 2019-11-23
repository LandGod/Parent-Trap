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
  ],   
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      
      // store the user Auth key in session storage
      sessionStorage.setItem('userAuth',authResult.user.uid);
      
      // store the user display name
      var displayName = authResult.user.displayName

      // store the user email
      var email = authResult.user.email

      // store email in session storage
      sessionStorage.setItem('email', email);
      
      // split the display name to first and last name
      var displayNameArray = displayName.split(" ");
      var firstName = displayNameArray[0];
      var lastName = displayNameArray[1];

      // store the information in session storage
      sessionStorage.setItem('firstName', firstName);
      sessionStorage.setItem('lastName', lastName);

      // TODO: send API call to evaluate:
        // if user exists and has a household send to dashboard
        // if user is new send to create household screen
        // if user has been invited but does have a household send to dasboard
      
      
      
      // this.props.history.push('/dashboard');
      // return false
    }
  }
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
    