import React, { Component } from "react";
import MemberFormRow from "./MemberFormRow";
import "./style.css";

// Household create/edit component
class HouseHold extends Component {
  state = {
    mode: this.props.mode || "create",
    householdName: this.props.householdName,
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

  // Takes an iterator value and freezes it as a const and returns that const
  // This allows us to store the array index of the object, without being worried that we're pointing to a dynamic variable whos
  // value might change.
  setIndex = index => {
    const frozenIndex = index;
    return frozenIndex;
  };

  // Removes the user object from state which coresponds to the row on which the button was clicked
  removeRow = (event, i) => {
    event.preventDefault();
    this.setState(currentState => {
      currentState.members[i].deleted = true;
      return currentState;
    });
  };

  // Updates the householdName in the state any time the input field for household name is updated
  handleChangeHouseholdName = event => {
    let val = event.target.value;
    this.setState({ householdName: val });
  };

  // Submit/update household
  submitHouseForm = event => {
    event.preventDefault();

    // If creating new household:
    if (this.props.createOrEdit === "Create") {
        //TODO: Write api call for creating household (and user)
    }
    // If updating and existing household:
    else {
      //TODO: Write api call for udating household
    }
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
                onChange={this.handleChangeHouseholdName}
                value={this.state.householdName}
              />
            </div>
          </div>
          {/* Member input */}
          <div className="row">
            <h3>Add/Edit Members </h3>
          </div>
          {this.state.members.map((member, i) => {
            // If we've set the deleted key in the member object that coresponds to this component to 'true', don't render it
            if (!member.deleted) {
              return (
                <MemberFormRow
                  key={this.setIndex(i)}
                  firstName={member.firstName}
                  lastName={member.lastName}
                  email={member.email}
                  // Add readonly attribute if member object matches currently logged in member (You can't delete yourself)
                  readOnly={this.isCurrentUser(member._id)}
                  // While the component allows for dynamically hiding the add button. There is no good reason to do so at this time.
                  showAddButton={true}
                  // Hook into function for adding new member form rows
                  addNext={this.addMemberRow}
                  // Save and lock in index in list of member objects that this component is attached to
                  indexInState={this.setIndex(i)}
                  // Hook into function for removing form row (the indexInState value will be passed in along with the event)
                  removeSelf={this.removeRow}
                  // Pass Parent context to child for ability to hook into parent state
                  currentParent={this}
                />
              );
            }
          })}
          {/* Form Submit Button */}
          <button className="btn btn-primary" onClick={this.submitHouseForm}>
            {this.props.createOrEdit === "Create" ? "Create" : "Update"}
          </button>
        </form>
      </div>
    );
  }
}

// Set defaults for props:
HouseHold.defaultProps = {
  createOrEdit: "Create",
  householdName: ""
};

export default HouseHold;
