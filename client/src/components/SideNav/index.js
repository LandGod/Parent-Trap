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
        <button>Link 1</button>
        <button>Link 2</button>
        <button>Link 3</button>
      </div>
    );
  }
}

export default SideNav;
