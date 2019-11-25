import React, { Component } from 'react';
import "./style.css";

class Button extends Component {

  render() {
    // console.log(this.props);
    return (
      
      <button id={this.props.id} onClick={(event) => this.props.clickEvent(event,this.props.indentifier)} className="">
        <i className={`${this.props.icon}`} 
           aria-hidden="true" /> {this.props.title}
      </button>
    )
  }
}

export default Button