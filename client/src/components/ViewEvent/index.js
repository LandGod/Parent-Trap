import React, { Component, useState } from "react";
import { Container, Row, Col } from '../Grid/index';
// import API from '../../utils/API'


export class ViewEvent extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
            eventDate: '',
            eventStartLocation: props.event.location1,
            eventEndLocation: props.event.location2,
            eventDetails: '',
            mode: 'hide',
            
        };

    };



    Capitalize(str){
        console.log(this.state.eventStartLocation)
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    ConvertTime(str){
        let time = new Date(str);
        let newTime = time.toLocaleTimeString('en-US',{timeStyle: 'short'}) ;
        console.log(time);
        return newTime;
    }

    ConvertDate(str){
        let date = new Date(str);
        let newDate = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit',year: 'numeric' });
        console.log(newDate);
        return newDate;
    }

    SetToHide(str){

        if(str === this.state.location1){

            return '';

        }else{

            return 'Start Location: ';
        }

    }


    renderInputField() {

        if(this.state.mode === '') {
            
          return ;
        } else if(this.state.mode === 'Location: '){

          return;
        }
      }

    render() {

        const data= this.props.event;
        return (
            <Container>
                <Row>
                    <Col size='10'>
                        <h4>{this.Capitalize(data.eventType)}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col size='10'>
                        <h4>Start Time:</h4>
                    </Col>
                </Row>
                <Row>
                    <Col size='10'>
                        <h4>{this.ConvertTime(data.startTime)}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col size='10'>
                        <h4>End Time:</h4>
                    </Col>
                </Row>
                <Row>
                    <Col size='10'>
                        <h4>{this.ConvertTime(data.endTime)}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col size='10'>
                        <h4>Date:</h4>
                    </Col>
                </Row>
                <Row>
                    <Col size='10'>
                        <h4>{this.ConvertDate(data.startTime)}</h4>
                    </Col>
                </Row>

                {data.location1 ? <Row><Col size='10'><h4>Start Location: {data.location1}</h4></Col></Row> : ''}

                {data.location2 ? <Row><Col size='10'><h4>End Location: {data.location2}</h4></Col></Row> : ''}

                {data.note ? <Row><Col size='10'><h4>Notes: {data.note}</h4></Col></Row> : ''}

            </Container>
        );
    }
}

export default ViewEvent;