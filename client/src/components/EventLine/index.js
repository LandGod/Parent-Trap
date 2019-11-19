import React, { Component } from 'react';
import "./style.css";

class EventLine extends Component {

  render() {
    return (
      <div className='row'>
        <p className='col-2'>{this.props.time}
        </p>
        <p className='col-5'>{this.props.title}
        </p>
        <p className='col-2'>{this.props.duration}
        </p>
        <p className='col-3'>{this.props.requestor}
        </p>
        <i className={`fa fa-${this.props.icon}`} aria-hidden="true" />
      </div>
    )
  }
}

export default EventLine;