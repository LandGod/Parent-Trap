import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";
import DashCard from "../components/DashCard";
import EventLine from "../components/EventLine";

class Dashboard extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <p>This is the Dashboard</p>
                        <DashCard icon="calendar-alt" title="Monday 11-18">
                          <EventLine time="09:00" title="Ride to pratice" 
                                    duration="00:45" requestor="Jane Smith">
                          </EventLine>
                          <EventLine time="12:00" title="Pick up from work" 
                                    duration="00:15" requestor="John Smith">
                          </EventLine>
                          <EventLine time="00:00" title="Signed permission form" 
                                    duration="00:00" requestor="Jane Smith">
                          </EventLine>
                        </DashCard>
                        <DashCard icon="calendar-alt" title="Wednesday 11-20">
                          <EventLine time="17:00" title="Pick up dinner" 
                                    duration="00:30" requestor="Jane Smith">
                          </EventLine>
                        </DashCard>
                        <DashCard icon="calendar-alt" title="Friday 11-21">
                          <EventLine time="16:00" title="Drop off at meet" 
                                    duration="00:45" requestor="Jane Smith">
                          </EventLine>
                          <EventLine time="20:00" title="Pick up from meet" 
                                    duration="00:45" requestor="Jane Smith">
                          </EventLine>
                        </DashCard>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Dashboard;