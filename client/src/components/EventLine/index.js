import React, { Component } from 'react';
import { Col } from "../Grid/index";
import Button from "../Button/index";
//import Icon from "../Icon";
import "./style.css";

class EventLine extends Component {

  state = {
    // iconCompleted: this.props.iconCompleted, // can remove now
    // iconAssigned: this.props.iconAssigned,
    // assigned_id: this.props.assigned_id,
    // assigned: this.props.assigned
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

  // click assign event button 
  // toggle the icon - also need API call to update database accordingly
  // clickCompleteEvent = (event,identifier) => {
    clickAssignEvent = () => {
      // console.log(`you clicked the assign event button, id: ${this.props.event_id} date: ${this.props.eventDate}`);
      if (typeof this.props.onClickAssign === 'function'){
        this.props.onClickAssign(this.props.event_id, this.props.eventDate);
      }
    }


  // click complete event button 
  // toggle the icon - also need API call to update database accordingly
    // clickCompleteEvent = (event,identifier) => {
    clickCompleteEvent = () => {
    // console.log(`you clicked the complete event button, id: ${this.props.event_id} date: ${this.props.eventDate}`);
    // console.log(`you clicked the complete event button & ident is: ${identifier}`);
    if(typeof this.props.onClickComplete === 'function'){
      this.props.onClickComplete(this.props.event_id, this.props.eventDate);
    }
  }

  render() {
    // setting the completed icon class
    const isCompleted = this.props.iconCompleted
    ? "fas fa-check-square fa-lg" : "far fa-check-square fa-lg";
    // console.log(this.props.iconAssigned);

    // setting the assigned icon class
    const isAssigned = this.props.iconAssigned
    ? "fas fa-plus-square fa-lg" : "far fa-plus-square fa-lg" ;
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
            <p>{(this.props.assigned) ? `assigned: ${this.props.assigned}` : 'unassigned'}</p>
          </Col>
          <Col size="1">
            <Button icon={this.props.iconView} clickEvent={this.clickViewEvent}  identifier={this.props.event_id} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={this.props.iconEdit} clickEvent={this.clickEditEvent} identifier={this.props.event_id} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={isAssigned} clickEvent={this.clickAssignEvent} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={isCompleted} clickEvent={this.clickCompleteEvent} title=""></Button>
          </Col>
        </div>
      </div>

    )
  }
}

export default EventLine;