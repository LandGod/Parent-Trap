import React, { Component } from "react";
import MemberFormRow from "./MemberFormRow";
import "./style.css";

// Household create/edit component
class HouseHold extends Component {
  state = {
    mode: this.props.mode || "create",
    members: [
      // Dummy data until API is set up
      {
        _id: "5dd6ea9f6c0c7213542d089a",
        firstName: "James",
        lastName: "Holden",
        email: "captain@rocinante.com",
        status: "full"
      },
      {
        _id: "5dd6ea9f6c0c7213542d089b",
        firstName: "Naomie",
        lastName: "Nagata",
        email: "xo@rocinante.com",
        status: "full"
      },
      {
        _id: "5dd6ea9f6c0c7213542d089c",
        firstName: "Clarisa",
        lastName: "Mao",
        email: "peaches@rocinante.com",
        status: "full"
      }
    ]
  };

  isCurrentUser = id => {
    // Compare supplied id to id of currently logged in user
    // For debug purposes this function will return true for a set value
    if (id === "5dd6ea9f6c0c7213542d089a") {
      return true;
    }
    return false;
  };

  // Adds a blank user object to the state
  addMemberRow = event => {
    event.preventDefault();
    this.setState(currentState => {
      currentState.members.push({
        firstName: "",
        lastName: "",
        email: "",
        status: "invited"
      });

      return currentState;
    });
  };

  // Removes the user object from state which coresponds to the row on which the button was clicked
  removeRow = (event, i) => {
    event.preventDefault();
    this.setState(currentState => {
      currentState.members.splice(i, 1);
      return currentState;
    });
  };

  render() {
    return (
      <div>
        <form>
            {/* Title */}
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h2 className="text-center">
                {this.props.createOrEdit} Household
              </h2>
            </div>
          </div>
          {/* Household Name Input */}
          <div className="form-group row justify-content-center">
            <label
              htmlFor="householdNameInput"
              className="col-sm-2 col-form-label"
            >
              <h5>Household Name:</h5>
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="householdNameInput"
                placeholder="Smith"
              />
            </div>
          </div>
          {/* Member input */}
          <div className="row">
            <h3>Add/Edit Members </h3>
          </div>
          {this.state.members.map((member, i) => {
            return (
              <MemberFormRow
                key={i}
                firstName={member.firstName}
                lastName={member.lastName}
                email={member.email}
                // Add readonly attribute if member object matches currently logged in member (You can't delete yourself)
                readOnly={this.isCurrentUser(member._id)}
                // If this is the last member in the list, show the add button
                // showAddButton={
                //   i + 1 >= this.state.members.length ? true : false
                // }
                showAddButton={!this.isCurrentUser(member._id)}
                addNext={this.addMemberRow}
                removeSelf={event => {
                  this.removeRow(event, i);
                }}
              />
            );
          })}
        </form>
      </div>
    );
  }
}

// Set defaults for props:
HouseHold.defaultProps = {
  createOrEdit: "Create"
};

export default HouseHold;
