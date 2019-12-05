import React from "react";
import "./style.css";

function TopNav(props) {
  return (
    <div>

      {/* Bootstrap navbar */}
      <nav className="navbar banner">
          
        {/* Hamburger menue button which activates popout side-nav */}
        <button className="btn navselector icongreen" onClick={props.slideOut}>
          {/* Font awesome hamburger/bars menue icon */}
          <i className="fas fa-bars "></i>
        </button>

        <span className="navbar-brand mb-0 h1 housename">{props.householdName}</span>

        {/* This blank span keeps title centered with current row justifcation settings */}
        <span></span>
      </nav>
    </div>
  );
}

export default TopNav;
