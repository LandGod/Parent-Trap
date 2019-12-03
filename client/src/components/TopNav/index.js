import React from "react";
import "../../pages/style/Signup.css";

function TopNav(props) {
  return (
    <div>

      {/* Bootstrap navbar */}
      <nav className="navbar greenBackground">
          
        {/* Hamburger menue button which activates popout side-nav */}
        <button className="btn" onClick={props.slideOut}>
          {/* Font awesome hamburger/bars menue icon */}
          <i className="fas fa-bars whiteFont"></i>
        </button>

        <span className="navbar-brand mb-0 h1 whiteFont">{props.householdName}</span>

        {/* This blank span keeps title centered with current row justifcation settings */}
        <span> </span>
      </nav>
    </div>
  );
}

export default TopNav;
