import React, { Component } from 'react';
import { Col } from "../Grid/index";
import Button from "../Button/index";
//import Icon from "../Icon";
import "./style.css";

class EventLine extends Component {

  state = {
    iconCompleted: this.props.iconCompleted, // can remove now
    iconAssigned: this.props.iconAssigned,
    assigned_id: this.props.assigned_id,
    assigned: this.props.assigned
    // will need to add the remaining Event props so they
    // can be passed to the Edit modal and be returned
    // as set of data for state changes 
  }

  // click view event button 
  // may end up only having this view modal and have it have 
  // its own edit button - then this event would handle
  // the state changes if edit was used
    clickViewEvent = (event,identifier) => {
    console.log(`you clicked the view event button & ident is: ${identifier}`);
  }

  // click edit event button 
  // see comments above on clickViewEvent
    clickEditEvent = (event,identifier) => {
    console.log(`you clicked the edit event button & ident is: ${identifier}`);
  }

  // click asssign event button 
  // toggle the icon - also need API call to update database accordingly
    clickAssignEvent = (event,identifier) => {
    console.log(`you clicked the assign event button & ident is: ${identifier}`);
    var newState = (this.state.iconAssigned === "far fa-plus-square fa-lg") 
                    ? "fas fa-plus-square fa-lg" : "far fa-plus-square fa-lg";
    if (newState === "far fa-plus-square fa-lg") {
      console.log(`this will be unassigned`);
      this.setState({assigned_id: ""});
      this.setState({assigned: ""}); 
    } else {
      console.log(`assigning to you <current user name/id goes here>`);
    };
    this.setState({iconAssigned: newState })
  }

  // click complete event button 
  // toggle the icon - also need API call to update database accordingly
    clickCompleteEvent = (event,identifier) => {
    // console.log(`you clicked the complete event button & ident is: ${identifier}`);
    // var newState = (this.state.iconCompleted === "far fa-check-square fa-lg") 
    //                 ? "fas fa-check-square fa-lg" : "far fa-check-square fa-lg";
    // this.setState({iconCompleted: newState })
    if(typeof this.props.onClickComplete === 'function'){
      this.props.onClickComplete(this.props.event_id, this.props.eventDate);
    }
  }

  render() {
    const isCompleted = this.props.iconCompleted
    ? "fas fa-check-square fa-lg" : "far fa-check-square fa-lg";
    return (
      <div className="event-div border rounded-sm">
        <div className='row no-gutters'>
          <Col size="6">
            <p>{this.props.title}</p>
          </Col>
          <Col size="3">
            <p>{this.props.time}</p>
          </Col>
          <Col size="3">
            <p>{this.props.duration}</p>
          </Col>
        </div>
        <div className='row no-gutters'>
          <Col size="4">
            <p> ({this.props.creator})</p>
          </Col>
          <Col size="4">
            {/* <p>{(this.props.assigned) ? `assigned: ${this.props.assigned}` : 'unassigned'}</p> */}
            <p>{(this.state.assigned) ? `assigned: ${this.state.assigned}` : 'unassigned'}</p>
            {/* <p>{this.state.assigned}</p> */}
          </Col>
          <Col size="1">
            <Button icon={this.props.iconView} clickEvent={this.clickViewEvent}  indentifier={this.props.event_id} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={this.props.iconEdit} clickEvent={this.clickEditEvent} indentifier={this.props.event_id} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={this.state.iconAssigned} clickEvent={this.clickAssignEvent}  indentifier={this.props.event_id} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={isCompleted} clickEvent={this.clickCompleteEvent} indentifier={this.props.event_id} title=""></Button>
          </Col>
        </div>
      </div>

    )
  }
}

export default EventLine;