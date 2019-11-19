import React, { Component } from 'react';
import { Col } from "../Grid/index";
import Button from "../Button/index";
//import Icon from "../Icon";
import "./style.css";

class EventLine extends Component {

  render() {
    return (
      <div className="event-div border rounded-sm">
        {/* <p className='col-5'>{this.props.title}</p> */}
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
            <p>{this.props.requestor}</p>
          </Col>
          <Col size="4">
            <p>{this.props.assigned}</p>
          </Col>
          <Col size="2">
            <Button icon={this.props.icon1} title=""></Button>
          </Col>
          <Col size="2">
            <Button icon={this.props.icon2}  title=""></Button>
          </Col>
        </div>
      </div>

/* <Button icon="far fa-check-circle fa-lg"  title=""></Button> */
      // <div className='row'>
      //   <p className='col-2'>{this.props.time}
      //   </p>
      //   <p className='col-5'>{this.props.title}
      //   </p>
      //   <p className='col-2'>{this.props.duration}
      //   </p>
      //   <p className='col-2'>{this.props.requestor}
      //   </p>
      //   {/* <Icon size={this.props.size} iconclass={this.props.icon1class}></Icon>
      //   <Icon size={this.props.size} iconclass={this.props.icon2class}></Icon> */}
      //   {/* <i className={`col-${this.props.size} ${this.props.iconclass}`} aria-hidden="true" /> */}
      // </div>
    )
  }
}

export default EventLine;