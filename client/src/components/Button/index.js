import React, { Component } from 'react';
import "./style.css";
import ModalCardBody from '../Modal/modalBody';


class Button extends Component {

  render() {
    return (
      <div>
      <button id={this.props.id} onClick={(event) => this.props.clickEvent(event,this.props.identifier)} className="">
        <i className={`${this.props.icon}`} 
           aria-hidden="true" /> {this.props.title}
      </button>
      </div>
    )
  }
}

export default Button