import React, { Component } from "react";
import "./style.css";

// Household create/edit component
class HouseHold extends Component {
  state = {};



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
          {/* Dynamic add/edit lines go here */}
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
