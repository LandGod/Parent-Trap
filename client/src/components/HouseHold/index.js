import React, { Component } from "react";
import MemberFormRow from "./MemberFormRow";
import "./style.css";

// Household create/edit component
class HouseHold extends Component {
  state = {

  };

  render() {
    return (
      <div>
        <form>
            <div className="row">
                <h2>{this.props.createOrEdit} Household</h2>
            </div>
          <div className="form-group row">
            <label for="householdNameInput" className="col-sm-2 col-form-label">
              Household Name:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="householdNameInput"
                placeholder="Smith"
              />
            </div>
          </div>
          <div className="row">
            <h3>Add/Edit Members </h3>
          </div>
          {/* Add top row with current user info that is already locked in if this is the create page */}
          <MemberFormRow 
            firstName={'James'}
            lastName={'Holden'}
            email={'captain@rocinante.org'}
            readOnly={true}
            showAddButton={false}
          />
          {/* Dynamic add/edit lines go here */}
          <MemberFormRow 
            firstName={'Fred'}
            lastName={'Johnson'}
            email={'F.Johnson@tycho.com'}
            showAddButton={true}
            addNext={() => {console.log('Add new row button activated!')}}
            removeSelf={() => {console.log('Remove self button activated!')}}
          />
        </form>
      </div>
    );
  }
}

// Set defaults for props:
HouseHold.defaultProps = { 
    createOrEdit = 'Create'
 }

export default SideNav;
