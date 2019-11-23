import React, { Component } from 'react';
import "./style.css";

class Button extends Component {

  render() {
    return (
      <button id={this.props.id} onClick={() => this.props.clickAddEvent()} className="">
        <i className={`${this.props.icon}`} 
           aria-hidden="true" /> {this.props.title}
      </button>
    )
  }
}

export default Button