import React from "react";
import "./style.css";

function TopNav(props) {
  return (
    <div>

      {/* Bootstrap navbar */}
      <nav className="navbar navbar-light bg-light">
          
        {/* Hamburger menue button which activates popout side-nav */}
        <button className="btn btn-secondary" onClick={props.slideOut}>
          {/* Font awesome hamburger/bars menue icon */}
          <i className="fas fa-bars"></i>
        </button>

        <span className="navbar-brand mb-0 h1">{props.householdName}</span>

        {/* This blank span keeps title centered with current row justifcation settings */}
        <span> </span>
      </nav>
    </div>
  );
}

export default TopNav;
