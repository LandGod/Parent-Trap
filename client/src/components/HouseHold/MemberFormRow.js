import React from "react";
import { Container, Row, Col } from "../Grid/index.js";
import "./style.css";

class MemberFormRow extends React.Component {
  /* 
    OVERVIEW:
    The component will consist of 3 inputs: First Name, Last Name, Email
    Each input has its value tracked continuously by the state, such that the parent compononent can pull that info
    when the entire form, of which this component will be only one part, is ready to be submitted. By using optional
    props, we can intialize the component with values already filled in and/or set it to read-only such that the values
    can never be edited.

    PROPS:
    firstName: Autofills the First Name input with the supplied value, defaults to blank
    lastName: Same as firstName, but for the last name input
    email: Same as above, for email
    readOnly: 'true': Sets all 3 inputs to read-only mode, 'false': does nothing. Defaults to 'false'. Remove button will also be hidden for read-only rows.
    showAddButton: 'true': show add new row button, 'false': Do not show add new row button. Defaults to 'false'
    removeSelf: Requires a function which will remove this component instance from its parent. If no functino is supplied the remove button will not render.
    addNext: Requires a function which will create a new instance of this component underneath itslef. If none is supplied then the add button will be diabled (if shown).
    >>NOTE - both addNext & removeSelf buttons will need to contain event.preventDefault() or equivalent. They will be passed an event object.
    currentParent: Takes the 'this' of the parent. The household object state can only be properly updated if this is supplied at creation time.

    STATE:
    Note that not all props have a coresponding value in the state, as things like function references should not change after component creation
    firstName: Will always contain the current value in the First Name input, whether edited by the user or not
    lastName: Same as above, but for last name
    email: Again, same thing
    showAddButton: Toggles whether or not the add button is visable. true: visable, false: hidden
    

  */

  // The state is initialized based on values for props if given.
  // The state of this object will always contain the current values for the form fields
  // so we can then grab them any time we want from the parent when we're ready to submit the whole form
  state = {
    firstName: this.props.firstName || "",
    lastName: this.props.lastName || "",
    email: this.props.email || "",
    showAddButton: this.props.showAddButton || false
  };

  // Calls updateState on parent state and changes the given key/value pair for the member representing this object.
  updateParentMemberState(key, value) {
    this.props.currentParent.setState(parentState => {
      parentState.members[this.props.indexInState][key] = value;
      return parentState;
    });
  }

  // These function track the value of the input fields and keep the state updated continuously with that information
  handleChangeFirstName = event => {
    let val = event.target.value;
    this.setState({ firstName: val });
    this.updateParentMemberState("firstName", val);
  };
  handleChangeLastName = event => {
    let val = event.target.value;
    this.setState({ lastName: val });
    this.updateParentMemberState("lastName", val);
  };
  handleChangeEmail = event => {
    let val = event.target.value;
    this.setState({ email: val });
    this.updateParentMemberState("email", val);
  };

  render() {
    return (
      <Container>
      <Row>
        <Col size="md-12">
          <div className="member-card">

            {/* First/Last name row */}
              <Row>
                {/* First name */}
                <Col size="md-4">
                  <div className="form-group firstName">
                    <label>First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={this.state.firstName}
                      onChange={this.handleChangeFirstName}
                      readOnly={this.props.readOnly}
                    />
                  </div>
                </Col>
                {/* Last name */}
                <Col size="md-4">
                  <div className="form-group lastName">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={this.state.lastName}
                      onChange={this.handleChangeLastName}
                      readOnly={this.props.readOnly}
                    />
                  </div>
                </Col>
              </Row>

              {/* Email row */}
              <Row>
                <Col size="md-12">
                  <div className="form-group email">
                    <label>Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail}
                      readOnly={this.props.readOnly}
                    />
                  </div>
                </Col>
              </Row>

              {/* Button Row */}
              <Row>
                <Col size="md-12">
                <div className="buttons">
                  <button
                className="btn btn-sm btn-dark mr-1"
                onClick={event => {
                  this.props.removeSelf(event, this.props.indexInState);
                }}
                hidden={this.props.readOnly}
                disabled={!this.props.removeSelf}
              >
                <i className="fas fa-minus"></i>
              </button>
              <button
                className="btn btn-sm btn-dark"
                onClick={this.props.addNext}
                hidden={!this.state.showAddButton}
                disabled={!this.props.addNext}
              >
                <i className="fas fa-plus"></i>
              </button>
              </div>
                </Col>
              </Row>
            </div>
        </Col>
      </Row>
      </Container>
    );
  }
}

export default MemberFormRow;
