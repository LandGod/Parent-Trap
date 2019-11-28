import React, { Component } from "react";
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

  render() {
    return (
      <div id="mySidenav" className="sidenav" style={this.state.navWidth}>
        <button className="closebtn" onClick={this.closeNav}>
          &times; {/* X symbol html code */}
        </button>
        <button> <a href='/dashboard'>All Household Events</a> </button>
        <button> <a href='/dashboard?view=assigned'>My Events</a> </button>
        <button> <a href='/dashboard?view=unclaimed'>Unassigned Events</a> </button>
      </div>
    );
  }
}

export default SideNav;
