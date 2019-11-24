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
      console.log('signInSuccessWithAuthResult',authResult.user.uid);
      console.log(authResult.user.displayName + ' , ' + authResult.user.email);
      this.props.history.push('/dashboard');
      return false
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
    