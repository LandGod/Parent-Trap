import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import API from '../../AjaxCalls/API'


export class NewEventTable extends Component {

    constructor(props){

        super(props);

        this.state = {

            eventTitle: '',
            eventType: 'Ride',
            eventStartTime: '',
            eventStartTimeSelector: '',            
            eventEndTime: '',
            eventEndTimeSelector: '',
            eventDate: '',
            eventStartLocation: '',
            eventEndLocation: '',
            eventDetails: '',
    
        };

    };

    handleTypeSelector = event => {

        this.setState({ eventType: event.target.value}, () => {

            console.log(this.state.eventType);

        });
    };

    handleTitleInput = event => {

        this.setState({ eventTitle: event.target.value.trim()}, () => {

            console.log(this.state.eventTitle);

        });

    };

    handleStartTimeInput = event => {

        this.setState({ eventStartTime: event.target.value.trim()}, () => {

            console.log(this.state.eventStartTime);

        });

    };

    handleEndTimeInput = event => {

        this.setState({ eventEndTime: event.target.value.trim()}, () => {

            console.log(this.state.eventEndTime);

        });

    };


    handleStartTimeSelector = event => {

        this.setState({ eventStartTimeSelector: event.target.value }, () => {

            console.log(this.state.eventStartTimeSelector);

        });

    };

    handleEndTimeSelector = event => {

        this.setState({ eventEndTimeSelector: event.target.value }, () => {

            console.log(this.state.eventEndTimeSelector);

        });

    };

    handleDateInput = event => {

        this.setState({ eventDate: event.target.value }, () => {

            console.log(this.state.eventDate);

        });

    };

    handleStartLocationInput = event => {

        this.setState({ eventStartLocation: event.target.value }, () => {

            console.log(this.state.eventStartLocation);

        });

    };

    handleEndLocationInput = event => {

        this.setState({ eventEndLocation: event.target.value }, () => {

            console.log(this.state.eventEndLocation);

        });

    };

    handleDetailsInput = event => {

        this.setState({ eventDetails: event.target.value }, () => {

            console.log(this.state.eventDetails);

        });

    };

    
    handleSubmit = event => {

        event.preventDefault();

        const eventData = this.state;

        API.createNewEvent({

            title: eventData.eventTitle,
            eventType: eventData.eventType,
            location1: eventData.eventStartLocation,
            location2: eventData.eventEndLocation,
            startTime: eventData.eventStartTime,
            endTime: eventData.eventEndTime,
            note: eventData.eventDetails

        });

    };

    render() {

        return (
            <Form>
                <Form.Group controlId="eventTypeSelector" >
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" onChange={ (e) => this.handleTypeSelector(e) } value={this.state.eventType}>
                        <option id='eventTask'>Ride</option>
                        <option id='eventRide'>Task</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="eventTitleInput">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="input" placeholder="Soccer Practice" onChange={ (e) => this.handleTitleInput(e) } value={this.state.title} />
                </Form.Group>
                <Form.Group controlId="eventStartTimeInput">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Group className='row'>
                    <Form.Control type="input" placeholder="7:30" className='col-5' onChange={ (e) => this.handleStartTimeInput(e) } value={this.state.eventStartTime}/>
                    <Form.Control as="select" className='col-5' onChange={ (e) => this.handleStartTimeSelector(e) } value={this.state.eventStartTimeSelector}>
                        <option id='timeAM'>AM</option>
                        <option id='timePM'>PM</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="eventEndTimeInput">
                    <Form.Label>End Time</Form.Label>
                    <Form.Group className='row'>
                    <Form.Control type="input" placeholder="7:30" className='col-5' onChange={ (e) => this.handleEndTimeInput(e) } value={this.state.eventEndTime}/>
                    <Form.Control as="select" className='col-5' onChange={ (e) => this.handleEndTimeSelector(e) } value={this.state.endTimeSelector}>
                        <option id='timeAM'>AM</option>
                        <option id='timePM'>PM</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="eventDateInput">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="input" placeholder="11/11/2019" onChange={ (e) => this.handleDateInput(e) }  value={this.state.eventDate}/>
                </Form.Group>
                <Form.Group controlId="eventStartLocationInput">
                    <Form.Label>Start Location</Form.Label>
                    <Form.Control type="input" placeholder="Seattle, WA" onChange={ (e) => this.handleStartLocationInput(e) } value={this.state.eventStartLocation}/>
                </Form.Group>
                <Form.Group controlId="eventEndLocationInput">
                    <Form.Label>End Location</Form.Label>
                    <Form.Control type="input" placeholder="Everett, WA" onChange={ (e) => this.handleEndLocationInput(e) } value={this.state.eventEndLocation}/>
                </Form.Group>
                <Form.Group controlId="eventDetailsInput">
                    <Form.Label>Details</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder='We are picking up Amy on the way to practice!'onChange={ (e) => this.handleDetailsInput(e) } value={this.state.eventDetails}/>
                </Form.Group>

                <button className='btn btn-default' >Submit</button>

                <button className='btn btn-default'  data-dismiss="modal" >Cancel</button>

            </Form>
        );
    }
}

export default NewEventTable;