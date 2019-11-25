import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import NewEventTable from '../NewEventForm/newEventTable';
import "./style.css";

export class ModalCardBody extends Component {

  constructor() {

    super();

    this.state = {

      showModal: false,
      modalType: 'NewEventTable'

    };

  };
  
  toggleModal = () => {

    this.setState({ showModal: !(this.state.showModal) });
    console.log(this.state.showModal);
    console.log('here for it');

  };

  render() {

    if(this.state.modalType == 'NewEventTable'){

    return (

       <div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title id='.'>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewEventTable />
          </Modal.Body>
        </Modal>
      </div>

    )}
    else{
      return (
        <div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title id='.'>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>hahahahahahahahahah</h1>
          </Modal.Body>
        </Modal>
      </div>
      )
    }

  }
}

export default ModalCardBody;