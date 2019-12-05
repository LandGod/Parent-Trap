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
        <button onClick={() => {this.props.clicker()}}>All Household Events</button>
        <button onClick={() => {this.props.clicker('myevents')}}>My Events</button>
        <button onClick={() => {this.props.clicker('assigned')}}>Assigned To Me</button>
        <button onClick={() => {this.props.clicker('unassigned')}}>Unassigned Events</button>
        <button onClick={this.handleLogout}id="logoutbutton"> <a href="/">Logout</a> </button>
      </div>
    );
  }
}

export default SideNav;
