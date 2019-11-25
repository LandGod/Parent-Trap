import React, { Component } from 'react';
import "./style.css";
import ModalCardBody from '../Modal/modalBody';


class Button extends Component {

  // constructor() {

  //   super();

  //   this.state = {

  //     showModal: false,

  //   };

  // };

  // toggleModal = () => {

  //   this.setState({ showModal: !(this.state.showModal) });
  //   console.log(this.state.showModal);
  //   console.log('here for it');

  // };

  // buttonAction = () => {
  //   switch(this.props.id){
  //     case 'add-event': 
  //       this.toggleModal()
  //       break;
  //   }
  // }

  render() {
    return (
      <div>
      <button id={this.props.id} className="" onClick={this.props.callback}>
        <i className={`${this.props.icon}`} 
           aria-hidden="true" /> {this.props.title}
      </button>
      </div>
    )
  }
}

export default Button