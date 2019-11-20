import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class LoginWithGoogle extends Component {
    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;

    return (
        <div className="App">
          <header className="App-header">
            {
              user
                ? <p>Hello, {user.displayName}</p>
                : <p>Please sign in.</p>
            }
  
            {
              user
                ? <button onClick={signOut}>Sign out</button>
                : <button onClick={signInWithGoogle}>Sign in with Google</button>
            }
          </header>
        </div>
      );
    }
}

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(LoginWithGoogle);