import React, { Component } from 'react';
import "./style.css";

class Button extends Component {

  render() {
    return (
      <button id={this.props.id} className="">
        <i className={`${this.props.icon}`} 
           aria-hidden="true" /> {this.props.title}
      </button>
    )
  }
}

export default Button