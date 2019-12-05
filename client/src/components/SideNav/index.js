import React, { Component } from "react";
import * as firebase from "firebase";
import "./style.css";

class SideNav extends Component {
  state = {
    open: false, // Defaults to closed state
    navWidth: { width: "0" } // Defaults to closed state (open state is 250px)
  };

  openNav = () => {
    this.setState({ navWidth: { width: "250px" }, open: true });
  };

  closeNav = () => {
    this.setState({ navWidth: { width: "0" }, open: false });
  };

  handleLogout = () => {

    // clear session storage
    sessionStorage.clear();

    // logout of firebase
    firebase.auth().signOut().then(function() {
      console.log('signout succesful');
    }, function(err) {
      console.log(err);
    }
    
    )}

  render() {
    return (
      <div id="mySidenav" className="sidenav" style={this.state.navWidth}>
        <button className="closebtn" onClick={this.closeNav}>
          &times; {/* X symbol html code */}
        </button>
        <div id="filterDivider">FILTERS</div>
        <button> <a href='/dashboard'>All Household Events</a> </button>
        <button> <a href='/dashboard?view=myevents'>My Events</a> </button>
        <button> <a href='/dashboard?view=assigned'>Assigned To Me</a> </button>
        <button> <a href='/dashboard?view=unassigned'>Unassigned Events</a> </button>
        <button onClick={this.handleLogout} className="fas fa-arrow-circle-right" id="logoutbutton"> <a href="/">Logout</a> </button>
      </div>
    );
  }
}

export default SideNav;
