import React, { Component } from 'react'

class EventLine extends Component {

  render() {
    return (
      <div>
        <p>{this.props.time}  {this.props.title}   {this.props.duration}
              {this.props.requestor}
        </p>
      </div>
    )
  }
}

export default EventLine;