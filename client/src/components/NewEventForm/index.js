import React, { Component } from "react";
import { Form, Alert } from 'react-bootstrap';
import API from '../../utils/API'
import UtilFunc from "../utilityFunctions";
import '../NewEventForm/style.css'


export class NewEventTable extends Component {

    constructor(props) {

        super(props);

        this.state = {

            eventTitle: '',
            eventType: 'Ride',
            eventStartTime: '8:45',
            eventStartTimeSelector: 'AM',
            eventEndTime: '10:45',
            eventEndTimeSelector: 'AM',
            eventDate: '',
            eventStartLocation: '',
            eventEndLocation: '',
            eventDetails: '',
            startTime: {},
            endTime: {},
            validateTitle: '',


        };

    };

    // toggleErrorModal(){

    //     this.setState({inputErrorAlert: ! this.state.toggleErrorModal});

    // }


    handleChange = (newDate) => {
        console.log("newDate", newDate);
        return this.setState({ date: newDate });
    };

    //onChange handler to update the state of eventType when something is typed into the Type Selector
    handleTypeSelector = event => {

        this.setState({ eventType: event.target.value }, () => {

            console.log(this.state.eventType);

        });

    };

    //onChange handler to update the state of eventTitle when something is typed into the title Input
    handleTitleInput = event => {

        this.setState({ eventTitle: event.target.value.trim() }, () => {

            console.log(this.state.eventTitle);

        });

    };

    //onChange handler to update the state when something is typed into the Start Time Input
    handleStartTimeInput = event => {

        this.setState({ eventStartTime: event.target.value.trim() }, () => {

            console.log(this.state.eventStartTime);

        });

    };

    //onChange handler to update the state when something is typed into the End Time Input
    handleEndTimeInput = event => {

        this.setState({ eventEndTime: event.target.value.trim() }, () => {

            console.log(this.state.eventEndTime);

        });

    };


    //onChange handler to update the state when something is typed into the Start Time Selector
    handleStartTimeSelector = event => {

        this.setState({ eventStartTimeSelector: event.target.value }, () => {

            console.log(this.state.eventStartTimeSelector)

        });

    };

    //onChange handler to update the state when something is typed into the End Time Selector
    handleEndTimeSelector = event => {

        this.setState({ eventEndTimeSelector: event.target.value }, () => {

            console.log(this.state.eventEndTimeSelector);

        });

    };

    //onChange handler to update the state when something is typed into the Details Input
    handleDateInput = event => {

        this.setState({ eventDate: event.target.value }, () => {

            console.log(this.state.eventDate);

        });

    };

    //onChange handler to update the state when something is typed into the Start Location Input
    handleStartLocationInput = event => {

        this.setState({ eventStartLocation: event.target.value }, () => {

            console.log(this.state.eventStartLocation);

        });

    };

    //onChange handler to update the state when something is typed into the End Location Input
    handleEndLocationInput = event => {

        this.setState({ eventEndLocation: event.target.value }, () => {

            console.log(this.state.eventEndLocation);

        });

    };

    //onChange handler to update the state when something is typed into the Details Input
    handleDetailsInput = event => {

        this.setState({ eventDetails: event.target.value }, () => {

            console.log(this.state.eventDetails);

        });

    };

    validateDateAndTime = async (dateString, startTimeString, endTimeString, startSelector, endSelector) => {
        // if any of the following input fields are left blank we will return an error and not submit the event to the database
        if( endSelector === '' || startSelector === '' || startTimeString === '' || endTimeString === ''){

            return false;
        }
        else{
            //basic checks passed. build the date.
            //dateParts is now [month, date, year]
            let dateParts = dateString.split('/');
            let startDate = new Date(dateParts[2]+'/'+dateParts[0]+'/'+dateParts[1]);
            //if the start date is not a number we return an error
            if(isNaN(startDate.getDate())){
                //invalid date
                return false;
            }
            //creating an instance of today's date and time
            let today = new Date();
            //date is valid, now we check for logical errors
            //if the start date is not in the future we return an error
            if(startDate <= today){
                //date is current or in the past
                return false;
            }
            //date is in the future, now validate time
            // does the time string match the correct hh:mm time format
            if(!(startTimeString.match(/^[0-1]?[0-9]:[0-5][0-9]/)) || !(endTimeString.match(/^[0-1]?[0-9]:[0-5][0-9]/))){
                //invalid start or end times
                return false;
            }
            //basic checks pass
            // split the time input into two parts base on the ':'
            let startTimeParts = startTimeString.split(':');
            let endTimeParts = endTimeString.split(':');
            //checking the start selectors and adding 12 if they selected PM and not adding anything if they selected AM
            let startTimeHH = parseInt(startTimeParts[0]) + ((startSelector == 'PM') ? 12 : 0);
            let startTimeMM = parseInt(startTimeParts[1]);
            let endTimeHH = parseInt(endTimeParts[0]) + ((endSelector == 'PM') ? 12 : 0);
            let endTimeMM = parseInt(endTimeParts[1]);

            let startTime = new Date(dateParts[2], dateParts[0] - 1, dateParts[1], startTimeHH, startTimeMM);
            let endTime = new Date(dateParts[2], dateParts[0] - 1, dateParts[1], endTimeHH, endTimeMM);
            console.log(today);
            console.log(startTime);
            console.log(endTime);
            if((endTime > startTime) && (startTime > today)){

                await this.setState({startTime: startTime.toISOString(), endTime: endTime.toISOString()}, () => {
                    console.log(this.state);

                });
                return true;

            }else{

                return false;

            }
        }
    }

    


    handleSubmit = async (event) => {

        event.preventDefault();

        const currentEvent = this.state;

        let startTimeString = currentEvent.eventStartTime;
        let startTimeSelector = currentEvent.eventStartTimeSelector;
        let endTimeString = currentEvent.eventEndTime;
        let endTimeSelector = currentEvent.eventEndTimeSelector;
        let dateString = currentEvent.eventDate;

        let timesAreValid = await this.validateDateAndTime(dateString, startTimeString, endTimeString, startTimeSelector, endTimeSelector);

        if (!timesAreValid) {

            this.setState({toggleErrorModal: !this.state.toggleErrorModal});
            alert('enter a valid time');


        } 
        else {
            var userInfo = UtilFunc.getLocalUserInfo();
            const creatorId = userInfo.memberId;

            API.createEvent({

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


        const { date, format, mode, inputFormat } = this.state;

        return (
            <Form>
                <Form.Group controlId="eventTitleInput">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="input" placeholder="Soccer Practice" onChange={(e) => this.handleTitleInput(e)} value={this.state.title} />
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
                        <Form.Control type="input" placeholder="7:30" className='col-5' onChange={(e) => this.handleStartTimeInput(e)} value={this.state.eventStartTime}/>
                        <Form.Control as="select" className='col-5' onChange={(e) => this.handleStartTimeSelector(e)} value={this.state.eventStartTimeSelector}>
                            <option id='timeAM'>AM</option>
                            <option id='timePM'>PM</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="eventEndTimeInput">
                    <Form.Label>End Time</Form.Label>
                    <Form.Group className='row'>
                        <Form.Control type="input" placeholder="7:30" className='col-5' onChange={(e) => this.handleEndTimeInput(e)} value={this.state.eventEndTime} />
                        <Form.Control as="select" className='col-5' onChange={(e) => this.handleEndTimeSelector(e)} value={this.state.eventEndTimeSelector}>
                            <option id='timeAM'>AM</option>
                            <option id='timePM'>PM</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="eventDateInput">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="input" placeholder="11/11/2019" onChange={(e) => this.handleDateInput(e)} value={this.state.eventDate} />
                    <Form.Text>Please use: MM/DD/YYYY</Form.Text>
                </Form.Group>
                <Form.Group controlId="eventStartLocationInput">
                    <Form.Label>Start Location</Form.Label>
                    <Form.Control type="input" placeholder="Seattle, WA" onChange={(e) => this.handleStartLocationInput(e)} value={this.state.eventStartLocation} />
                </Form.Group>
                <Form.Group controlId="eventEndLocationInput">
                    <Form.Label>End Location</Form.Label>
                    <Form.Control type="input" placeholder="Everett, WA" onChange={(e) => this.handleEndLocationInput(e)} value={this.state.eventEndLocation} />
                </Form.Group>
                <Form.Group controlId="eventDetailsInput">
                    <Form.Label>Details</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder='We are picking up Amy on the way to practice!' onChange={(e) => this.handleDetailsInput(e)} value={this.state.eventDetails} />
                </Form.Group>

                <button className='btn btn-default' onClick={(e) => this.handleSubmit(e)}>Submit</button>

                <button className='btn btn-default' data-dismiss="modal" onClick={(e) => this.props.modalClose(e)} >Cancel</button>

                {/* <Alert color='alert' isOpen={this.state.inputErrorAlert} toggle={this.toggleErrorModal.bind(this)}> Please Check the Input</Alert> */}
            </Form>
        );
    }
}

export default NewEventTable;