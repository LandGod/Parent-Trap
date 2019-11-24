import React, { Component } from 'react';
import { Col } from "../Grid/index";
import Button from "../Button/index";
//import Icon from "../Icon";
import "./style.css";

class EventLine extends Component {

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
            <p>{this.props.creator}</p>
          </Col>
          <Col size="4">
            <p>{this.props.assigned}</p>
          </Col>
          <Col size="2">
            <Button icon={this.props.iconAssigned} title=""></Button>
          </Col>
          <Col size="2">
            <Button icon={this.props.iconCompleted}  title=""></Button>
          </Col>
        </div>
      </div>

    )
  }
}

export default EventLine;