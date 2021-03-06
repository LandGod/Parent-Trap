import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import NewEventTable from '../NewEventForm';
import EditEvent from '../EditEvent/index';
import ViewEvent from '../ViewEvent/index';



export class ModalCardBody extends Component {

  constructor() {

    super();

    this.state = {

      showModal: false,
      modalType: 'NewEventTable',
      event: {}

    };

  };
  
  toggleModal = () => {

    this.setState({ showModal: !(this.state.showModal) });
    console.log(this.state.showModal);
    console.log('here for it');

  };

  render() {

    if(this.state.modalType === 'NewEventTable'){

    return (

       <div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title id='.'>{this.props.title} Create New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewEventTable getHouseholdIdFunction={this.props.getHouseholdIdFunction} modalClose={this.toggleModal}/>
          </Modal.Body>
        </Modal>
      </div>

    )}
    else if(this.state.modalType === 'ViewEvent'){
      return (
        <div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title id='.'>{this.state.event.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewEvent event={this.state.event}/>
          </Modal.Body>
        </Modal>
      </div>
      )
    }
    else if(this.state.modalType === 'EditEvent'){
      return (
        <div>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
          <Modal.Title id='.'>{this.state.event.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditEvent event={this.state.event} getHouseholdIdFunction={this.props.getHouseholdIdFunction} modalClose={this.toggleModal}/>
          </Modal.Body>
        </Modal>
      </div>
      )}
  }
}

export default ModalCardBody;