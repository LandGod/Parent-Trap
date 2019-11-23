import React, { Component } from "react";
import MemberFormRow from "./MemberFormRow";
import "./style.css";

/* 
    OVERVIEW: 
    In short, this component is initialized with 

    PROPS: 
    createMode: (Boolean) If set to 'true', the component will operate and dispaly in 'create' mode. If false, it will operate in edit mode.
    members: ([Member Object]) This prop MUST recieve an array of member object containing at least one member object
    >> When creating a new household, this would be a single object containing the new user creating the household
    >> When editing an existing household, this would be a list conataining all current members as objects
    >> the members prop is ALLWAYS REQUIRED when creating a new HouseHold component
    householdName: (String) The name of the household. Not required if creating a new household

    STATE:
    householdName: It's the name of the household. If the householdName prop was given a value, the state property will be initialized with that value
    >> otherwise it will be initialized as an empy string.
    >> The householdName state property is automatically updated any time the corestponding text field is updated (using the handleChangeHouseholdName method)
    members: Initialized from props.members as a list of member objects. Components for each member object are generated and updated
    >> dynamically and dynamically update their coresponding user object in the state automatically whenever edited.

    METHODS:
    isCurrentUser: Take in an ObjectId string that points to a 'Member' object. Returns true if that is the same ObjectId as 
    >> the currently signed in user. Returns false if not.
    addMemberRow: Takes in a synthetic event object as its only argument. Adds a new, empty, user object 
    >> to the list of members in the state, causing the page to automatically generate a new coresponding MemberFormRow component
    setIndex: Takes one argument, a number coresponding to an array index. Returns the same number, 
    >> but passed through a const to ensure that the reference will only ever point to that exact number.
    removeRow: Takes 2 argumens, an event, and an index, coresponding to a member object in the state. Adds a 'deleted' property, 
    >> and sets it to 'true' for the coresonding member object. 
    >> This will cause the coresponding MemberFormRow component to no longer be rendered on the page.
    handleHouseholdNameChange: Updates the state with the current value of the householdName input field
    submitHouseForm: Calls the appropriate API method (whether creating or updating) and sends the relevant data to the server


*/

// Household create/edit component
class HouseHold extends Component {
  state = {
    householdName: this.props.householdName || '',
    members: this.props.members
  };

  isCurrentUser = id => {
    // Compare supplied id to id of currently logged in user
    // For debug purposes this function will return true for a set value
    if (id === this.props.currentUserId) {
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
    if (this.props.createMode === true) {
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
                {this.props.createMode ? 'Create' : 'Edit'} Household
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
                  // Pass Parent context to child for ability to hook into parent state from within child
                  currentParent={this}
                />
              );
            }
          })}
          {/* Form Submit Button */}
          <button className="btn btn-primary" onClick={this.submitHouseForm}>
            {this.props.createMode ? "Create" : "Update"}
          </button>
        </form>
      </div>
    );
  }
}

// Set defaults for props:
HouseHold.defaultProps = {
  householdName: ""
};

export default HouseHold;
