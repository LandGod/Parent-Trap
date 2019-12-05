import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import { Container, Row, Col } from '../Grid/index';
import API from '../../utils/API'
import UtilFunc from "../../components/utilityFunctions";


export class EditEvent extends Component {

    constructor(props) {

        super(props);
        let startTimeArr = this.ConvertTime(props.event.startTime);
        let endTimeArr = this.ConvertTime(props.event.endTime);
        this.state = {
            eventId: props.event.event_id,
            eventTitle: props.event.title.trim(),
            eventType: this.AddEventType(props.event.eventType),
            eventStartTime: startTimeArr[0],
            eventStartTimeSelector: startTimeArr[1],
            eventEndTime: endTimeArr[0],
            eventEndTimeSelector: endTimeArr[1],
            eventDate: this.ConvertDate(props.event.startTime),
            eventStartLocation: props.event.location1,
            eventEndLocation: props.event.location2,
            eventDetails: props.event.note,
            startTime: {},
            endTime: {},

        };

    };

    AddEventType(str){

        if (str === 'ride') {
            return 'Ride';

        } else if (str === 'task') {
            return 'Task';

        }


    }

    ConvertTime(str){
        let time = new Date(str);
        let newTime = time.toLocaleTimeString('en-US', { timeStyle: 'short' });
        let amPmStr = newTime.includes('AM') ? 'AM' : 'PM';
        newTime = newTime.replace(/[AP]M/, '').trim();
        return [newTime, amPmStr];
    }

    ConvertDate(str) {
        let date = new Date(str);
        let newDate = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit',year: 'numeric' });
        return newDate;
    }


    handleTypeSelector = event => {

        this.setState({ eventType: event.target.value }, () => {

            console.log(this.state.eventType);

        });

    };

    handleTitleInput = event => {

        this.setState({ eventTitle: event.target.value }, () => {

            console.log(this.state.eventTitle);

        });

    };

    handleStartTimeInput = event => {

        this.setState({ eventStartTime: event.target.value.trim() }, () => {

            console.log(this.state.eventStartTime);

        });

    };

    handleEndTimeInput = event => {

        this.setState({ eventEndTime: event.target.value.trim() }, () => {

            console.log(this.state.eventEndTime);

        });

    };


    handleStartTimeSelector = event => {

        this.setState({ eventStartTimeSelector: event.target.value }, () => {

            console.log(this.state.eventStartTimeSelector)

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

    validateDateAndTime = async (dateString, startTimeString, endTimeString, startTimeSelector, endTimeSelector) => {
        if (endTimeSelector === '' || startTimeSelector === '' || startTimeString === '' || endTimeString === '') {
            console.log(dateString, startTimeString, endTimeString);
            alert('false 1');
           return false;
        }
        else {
            //basic checks passed. build the date.
            //dateParts is now [month, date, year]
            let dateParts = dateString.split('/');
            let startDate = new Date(dateParts[2] + '/' + dateParts[0] + '/' + dateParts[1]);
            if (isNaN(startDate.getDate())) {
                //invalid date
                alert('false 2');
                return false;
            }
            let today = new Date();
            //date is valid, now we check for logical errors
            if (startDate <= today) {
                //date is current or in the past
                alert('false 3');
                return false;
            }
            //date is in the future, now validate time
            if (!(startTimeString.match(/^[0-1]?[0-9]:[0-5][0-9]/)) || !(endTimeString.match(/^[0-1]?[0-9]:[0-5][0-9]/))) {
                //invalid start or end times
                alert('false 4');
                return false;
            }
            //basic checks pass
            let startTimeParts = startTimeString.split(':');
            let endTimeParts = endTimeString.split(':');
            let startTimeHH = parseInt(startTimeParts[0]) + ((startTimeSelector === 'PM') ? 12 : 0);
            let startTimeMM = parseInt(startTimeParts[1]);
            let endTimeHH = parseInt(endTimeParts[0]) + ((endTimeSelector === 'PM') ? 12 : 0);
            let endTimeMM = parseInt(endTimeParts[1]);

            let startTime = new Date(dateParts[2], dateParts[0] - 1, dateParts[1], startTimeHH, startTimeMM);
            let endTime = new Date(dateParts[2], dateParts[0] - 1, dateParts[1], endTimeHH, endTimeMM);

    
    
    
            if ((endTime > startTime) && (startTime > today)) {

                await this.setState({ startTime: startTime.toISOString(), endTime: endTime.toISOString() }, () => {

                });
                return true;

            } else {
                alert('false 5');
                return false;

            }
        }
    }




    handleSubmit = async (event) => {


        const currentEvent = this.state;

        let startTimeString = currentEvent.eventStartTime;
        let startTimeSelector = currentEvent.eventStartTimeSelector;
        let endTimeString = currentEvent.eventEndTime;
        let endTimeSelector = currentEvent.eventEndTimeSelector;
        let dateString = currentEvent.eventDate;

        console.log(dateString, startTimeString, endTimeString, startTimeSelector, endTimeSelector);
        let timesAreValid = await this.validateDateAndTime(dateString, startTimeString, endTimeString, startTimeSelector, endTimeSelector);
        
        if (!timesAreValid) {

            alert('enter a valid time not at all');

        }
        else {

            var userInfo = UtilFunc.getLocalUserInfo();
            const creatorId = userInfo.memberId;
            API.updateEvent(this.state.eventId,{

                title: this.state.eventTitle,
                eventType: this.state.eventType.toLowerCase(),
                location1: this.state.eventStartLocation,
                location2: this.state.eventEndLocation,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                note: this.state.eventDetails,
                creator: creatorId,
                houseHoldId: this.props.getHouseholdIdFunction()

            });

            this.props.modalClose()

            window.location.reload(false)
        }   


    };


    render() {

        return (
            <Container>
                <Form.Group controlId="eventTitleInput">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="input" onChange={(e) => this.handleTitleInput(e)} value={this.state.eventTitle} />
                </Form.Group>
                <Form.Group controlId="eventTypeSelector" >
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" onChange={(e) => this.handleTypeSelector(e)} value={this.state.eventType}>
                        <option id='eventTask'>Ride</option>
                        <option id='eventRide'>Task</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="eventStartTimeInput">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Group className='row'>
                        <Form.Control type="input" className='col-5' onChange={(e) => this.handleStartTimeInput(e)} value={this.state.eventStartTime} />
                        <Form.Control as="select" className='col-5' onChange={(e) => this.handleStartTimeSelector(e)} value={this.state.eventStartTimeSelector}>
                            <option id='timeAM'>AM</option>
                            <option id='timePM'>PM</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="eventEndTimeInput">
                    <Form.Label>End Time</Form.Label>
                    <Form.Group className='row'>
                        <Form.Control type="input" className='col-5' onChange={(e) => this.handleEndTimeInput(e)} value={this.state.eventEndTime} />
                        <Form.Control as="select" className='col-5' onChange={(e) => this.handleEndTimeSelector(e)} value={this.state.eventEndTimeSelector}>
                            <option id='timeAM'>AM</option>
                            <option id='timePM'>PM</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="eventDateInput">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="input" onChange={(e) => this.handleDateInput(e)} value={this.state.eventDate} />
                </Form.Group>
                <Form.Group controlId="eventStartLocationInput">
                    <Form.Label>Start Location</Form.Label>
                    <Form.Control type="input" onChange={(e) => this.handleStartLocationInput(e)} value={this.state.eventStartLocation} />
                </Form.Group>
                <Form.Group controlId="eventEndLocationInput">
                    <Form.Label>End Location</Form.Label>
                    <Form.Control type="input" onChange={(e) => this.handleEndLocationInput(e)} value={this.state.eventEndLocation} />
                </Form.Group>
                <Form.Group controlId="eventDetailsInput">
                    <Form.Label>Details</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={(e) => this.handleDetailsInput(e)} value={this.state.eventDetails} />
                </Form.Group>

                <button className='btn btn-default' onClick={(e) => this.handleSubmit(e)}>Submit</button>

                <button className='btn btn-default' data-dismiss="modal" onClick={(e) => this.props.modalClose(e)}>Cancel</button>
            </Container>
        );
    }
}

export default EditEvent;