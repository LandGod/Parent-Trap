import React, { Component } from "react";
import { Container, Row, Col } from "../Grid/index.js";
import MemberFormRow from "./MemberFormRow";
import { getLocalUserInfo } from "../utilityFunctions";
import API from "../../utils/API";
import * as firebase from "firebase";
import { Redirect } from "react-router-dom";
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
    currentUserId: _id from currently logged in user's member document

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
    householdName: this.props.householdName || "",
    members: this.props.members,
    redirectToDashboard: false,
    redirectToHomepage: false
  };

  isCurrentUser = (oauthKey) => {
    // Compare supplied oauthKey to oauthKey of currently logged in user
    // For debug purposes this function will return true for a set value

    let currentUser = getLocalUserInfo();

    if (!currentUser) {
      console.log("No current user!");
      let notLoggedIn = new Error("No user data in session storage.");
      throw notLoggedIn;
    }
    if (oauthKey === currentUser.oauthKey) {
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
      // Create household in database
      API.createHousehold({ name: this.state.householdName })
        .then(results1 => {
          // Add newly created household id to state
          this.setState({ householdId: results1.data._id });
          // Also add it to session storage
          sessionStorage.setItem("householdId", results1.data._id);

          // Continue operation with this then to avoid race condition if householdId isn't returned fast enough
          // Add or update members in database and include household Id
          API.upsertMembers({
            members: this.state.members,
            householdId: results1.data._id
          })
            .then(results2 => {
              // Create list of ids to add to household document
              let idsArray = [];

              // On success, look through results
              results2.data.newIds.forEach(member => {
                // If is current user, add that objectId to session storage
                if (
                  member.userOauthKey &&
                  this.isCurrentUser(member.userOauthKey)
                ) {
                  sessionStorage.setItem("userID", member._id);
                }

                // Add all user ids to an array for update to household members list
                idsArray.push(member._id);
              });

              // Update household with user ids
              API.addHouseholdMembers({
                householdId: results1.data._id,
                idsArray: idsArray
              }).then(result3 => {
                // Redirect to dashboard
                this.setState({ redirectToDashboard: true });
              })
              .catch((err) => {
                console.log(err);
              })
            })
            .catch(function(err) {
              console.log("error with create many members operation");
              console.log(err);
            });
        })
        .catch(err => {
          console.log("ERROR with create household operation");
          console.log(err);
        });
    }
    // If updating and existing household:
    else {
      //TODO: Write api call for udating household
      console.log("Update functionality not yet implemented!");
    }
  };

  handleCancel = event => {
    event.preventDefault();
    console.log('hit handleCancel')

    // clear session storage
    sessionStorage.clear();
    console.log('hit handleCancel')


    // logout of firebase
    firebase.auth().signOut().then(() => {
      console.log('signout successful');
      // redirect to homepage
      this.setState({ redirectToHomepage: true });
    }, function(err) {
      console.log(err);
    });
  }

  render() {
    // If redirect is set to true, redirect to dashboard, else render component
    if (this.state.redirectToDashboard) {
      return <Redirect to="/dashboard" />;
    }

    // If redirect is set to true, redirect to homepage
    if (this.state.redirectToHomepage) {
      return <Redirect to="/" />;
    }

    return (
        <Row>
          <Col size="md-12">
        <form>
          {/* Title */}
          <Row>
            <div className="justify-content-center" id="signupTitle">
              <Col size="md-12">
                <h4 className="text-center">
                  {this.props.createMode ? "Create " : "Edit "} Household
                </h4>
              </Col>
            </div>
          </Row>
          {/* Household Name Input */}
          <Row>
            <Col size="md-12">
              <div className="form-group">
                <h5>Enter a House Name</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="householdNameInput"
                  placeholder="Smith"
                  onChange={this.handleChangeHouseholdName}
                  value={this.state.householdName}
                />
              </div>
            </Col>
          </Row>

          {/* Member input */}
          <Row>
            <Col size="md-12">
              <h5>Add/Edit Members </h5>
            </Col>
          </Row>

          {/* Member cards */}
          <Row>
            <Col size="md-12">
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
                  readOnly={this.isCurrentUser(member.userOauthKey)}
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
            </Col>
          </Row>
          
          
          {/* Form Buttons */}
          <Row>
            <div id="housebuttons">
              <Col size="md-12">
                  <button className="btn btn-success" id="createbutton" onClick={this.submitHouseForm}>
                    {this.props.createMode ? "Create" : "Update"}
                  </button>
                <button className="btn btn-danger" id="cancelbutton" onClick={this.handleCancel}>
                  Cancel
                </button>
              </Col>
              </div>
          </Row> 

          </form>
        </Col>
      </Row>
    );
  }
}

// Set defaults for props:
HouseHold.defaultProps = {
  householdName: ""
};

export default HouseHold;
