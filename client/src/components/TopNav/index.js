import React from "react";

function TopNav(props) {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
          <button onClick={props.slideOut}>NavPanel</button>
        <span className="navbar-brand mb-0 h1 text-center">HouseholdName</span>
      </nav>
    </div>
  );
}

export default TopNav;
