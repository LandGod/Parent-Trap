import React, { Component } from 'react';
import { Row, Col } from "../Grid/index";
import Button from "../Button/index";
//import Icon from "../Icon";
import "./style.css";

class EventLine extends Component {

  state = {
  }

  // click view event button 
  // clickViewEvent = () => {

  //   if (typeof this.props.clickViewEvent === 'function') {

  //     this.props.clickViewEvent(this.props.event_id);
  //     console.log('here i am')

  //   }
  // }

  // click edit event button 
  // see comments above on clickViewEvent
  clickEditEvent = (event, identifier) => {
    console.log(`you clicked the edit event button & ident is: ${identifier}`);
  }

  // click assign event button 
  clickAssignEvent = () => {
    // console.log(`you clicked the assign event button, id: ${this.props.event_id} date: ${this.props.eventDate}`);
    if (typeof this.props.onClickAssign === 'function') {
      this.props.onClickAssign(this.props.event_id, this.props.eventDate);
    }
  }


  // click complete event button 
  clickCompleteEvent = () => {
    // console.log(`you clicked the complete event button, id: ${this.props.event_id} date: ${this.props.eventDate}`);
    // console.log(`you clicked the complete event button & ident is: ${identifier}`);
    if (typeof this.props.onClickComplete === 'function') {
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
    ? "fas fa-user-check fa-lg" : "far fa-user fa-lg" ;
    // ? "fas fa-plus-square fa-lg" : "far fa-plus-square fa-lg" ;

    // show hide class
    // const showhide = this.props.showhideclass;
    //  ? "fas fa-plus-square fa-lg" : "far fa-plus-square fa-lg";

    // setting the viewEvent icon class
    const viewEvent = this.props.iconView
      ? "fas fa-info-circle fa-lg" : "fas fa-info-circle fa-lg";

    // setting the editEvent icon class
    const editEvent = this.props.iconEdit
      ? "fas fa-edit fa-lg" : "fas fa-edit fa-lg";

    

    return (
      // <div className="event-div border rounded-sm">
      <Row>
        <Col size="md-12">
          <div className={`event-div border rounded-sm ${this.props.showhideclass}`}>
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
                <Button icon={viewEvent} clickEvent={this.props.onClickView} clickEventParam={this.props.onClickViewParam} title=""></Button>
              </Col>
              <Col size="1">
                <Button icon={editEvent} clickEvent={this.props.onClickEdit} clickEventParam={this.props.onClickEditParam} title=""></Button>
              </Col>
              <Col size="1">
                <Button icon={isAssigned} clickEvent={this.clickAssignEvent} title=""></Button>
              </Col>
              <Col size="1">
                <Button icon={isCompleted} clickEvent={this.clickCompleteEvent} title=""></Button>
              </Col>
            </div>
          </div>
        </Col>
      </Row>

    )
  }
}

export default EventLine;