import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import NewEventTable from '../NewEventForm/newEventTable';
import "./style.css";

export class ModalCardBody extends Component {

  render() {

    if(this.props.modalType == 'NewEventTable'){

    return (

       <div>
        <Modal show={this.props.showModal} onHide={this.props.toggleModalFunction}>
          <Modal.Header closeButton>
            <Modal.Title id='.'>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewEventTable />
          </Modal.Body>
        </Modal>
      </div>

    )}

  }
}

export default ModalCardBody;