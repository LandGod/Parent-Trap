import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./components/Firebase/firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Router history={hasHistory}>
        <Route path="/" component={Home}>
          <IndexRoute component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
        </Route>
      </Router>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
