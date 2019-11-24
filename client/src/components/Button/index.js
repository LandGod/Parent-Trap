import React, { Component } from 'react';
import "./style.css";
import ModalCardBody from '../Model/modalBody';


class Button extends Component {

  constructor() {

    super();

    this.state = {

      showModal: false,

    };

  };

  toggleModal = () => {

    this.setState({ showModal: !(this.state.showModal) });
    console.log(this.state.showModal);
    console.log('here for it');

  };

  render() {
    return (
      <div>
      <button id={this.props.id} className="" onClick={this.toggleModal.bind(this)}>
        <i className={`${this.props.icon}`} 
           aria-hidden="true" /> {this.props.title}
      </button>

      <ModalCardBody showModal={this.state.showModal} toggleModalFunction={this.toggleModal}  modalType='NewEventTable' />

      </div>
    )
  }
}

export default Button