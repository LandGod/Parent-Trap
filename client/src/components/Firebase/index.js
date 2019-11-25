import React, { Component } from 'react';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import API from "../../utils/API";
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
      sessionStorage.setItem('id',authResult.user.uid);
      
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

      // retrive the information from session storage and store in an object to send through the API call
      var userData = {
        id: sessionStorage.getItem('id'),
        firstName: sessionStorage.getItem('firstName'),
        lastName: sessionStorage.getItem('lastName'),
        email: sessionStorage.getItem('email')
      }

      // Send API call to evaluate:
      API.login(userData)
        .then(res => {console.log('success', res);
        })
        .catch(err => console.log(err));
      
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
    