import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from '../Grid/index';
// import API from '../../utils/API'


export class ViewEvent extends Component {


    // handleSubmit = event => {

    //     event.preventDefault();

    //     const eventData = this.state;

    //     API.createNewEvent({

    //         title: eventData.eventTitle,
    //         eventType: eventData.eventType,
    //         location1: eventData.eventStartLocation,
    //         location2: eventData.eventEndLocation,
    //         startTime: eventData.eventStartTime,
    //         endTime: eventData.eventEndTime,
    //         note: eventData.eventDetails

    //     });

    // };


    render() {

        const data= this.props.event;

        return (
            <Container>
                <Form.Group controlId="eventTitleInput">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="input" placeholder="Soccer Practice" onChange={(e) => this.handleTitleInput(e)} value={data.title} />
                </Form.Group>
                <Form.Group controlId="eventTypeSelector" >
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" placeholder={this.props.event.eventType} onChange={(e) => this.handleTypeSelector(e)} value={this.props.event.eventType}>
                        <option id='eventTask'>Ride</option>
                        <option id='eventRide'>Task</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="eventStartTimeInput">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Group className='row'>
                        <Form.Control type="input" placeholder={this.props.event.startTime} className='col-5' onChange={(e) => this.handleStartTimeInput(e)} value={this.props.event.StartTime} />
                        <Form.Control as="select" className='col-5'>
                            <option id='timeAM'>AM</option>
                            <option id='timePM'>PM</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="eventEndTimeInput">
                    <Form.Label>End Time</Form.Label>
                    <Form.Group className='row'>
                        <Form.Control type="input" placeholder={this.props.event.endTime} className='col-5' onChange={(e) => this.handleEndTimeInput(e)} value={this.props.event.EndTime} />
                        <Form.Control as="select" className='col-5'>
                            <option id='timeAM'>AM</option>
                            <option id='timePM'>PM</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="eventDateInput">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="input" placeholder='11/11/2019' onChange={(e) => this.handleDateInput(e)} value={this.props.event.date} />
                </Form.Group>
                <Form.Group controlId="eventStartLocationInput">
                    <Form.Label>Start Location</Form.Label>
                    <Form.Control type="input" placeholder={this.props.event.location1} onChange={(e) => this.handleStartLocationInput(e)} value={this.props.event.location1} />
                </Form.Group>
                <Form.Group controlId="eventEndLocationInput">
                    <Form.Label>End Location</Form.Label>
                    <Form.Control type="input" placeholder={this.props.event.location2} onChange={(e) => this.handleEndLocationInput(e)} value={this.props.event.location2} />
                </Form.Group>
                <Form.Group controlId="eventDetailsInput">
                    <Form.Label>Details</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder={this.props.event.note} onChange={(e) => this.handleDetailsInput(e)} value={this.props.event.note} />
                </Form.Group>
            </Container>
        );
    }
}

export default ViewEvent;