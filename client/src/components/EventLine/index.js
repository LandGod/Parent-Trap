import React, { Component } from 'react';
import { Col } from "../Grid/index";
import Button from "../Button/index";
//import Icon from "../Icon";
import "./style.css";

class EventLine extends Component {


  // click add event button - botton for dashboard
    clickViewEvent = (event,identifier) => {
    console.log(`you clicked the view event button & ident is: ${identifier}`);
  }

  // click add event button - botton for dashboard
    clickEditEvent = (event,identifier) => {
    console.log(`you clicked the edit event button & ident is: ${identifier}`);
  }

  // click add event button - botton for dashboard
    clickAssignEvent = (event,identifier) => {
    console.log(`you clicked the assign event button & ident is: ${identifier}`);
  }

  // click add event button - botton for dashboard
    clickCompleteEvent = (event,identifier) => {
    console.log(`you clicked the complete event button & ident is: ${identifier}`);
  }

  render() {
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
          {/* id={(eventDate.events.length > 3) ? "show-more" : undefined } */}
            <p>{(this.props.assigned) ? `assigned: ${this.props.assigned}` : 'unassigned'}</p>
          </Col>
          <Col size="1">
            <Button icon={this.props.iconView} clickEvent={this.clickViewEvent}  indentifier={this.props.event_id} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={this.props.iconEdit} clickEvent={this.clickEditEvent} indentifier={this.props.event_id} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={this.props.iconAssigned} clickEvent={this.clickAssignEvent}  indentifier={this.props.event_id} title=""></Button>
          </Col>
          <Col size="1">
            <Button icon={this.props.iconCompleted} clickEvent={this.clickCompleteEvent} indentifier={this.props.event_id} title=""></Button>
          </Col>
        </div>
      </div>

    )
  }
}

export default EventLine;