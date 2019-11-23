import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index";
import DashCard from "../components/DashCard";
import Button from "../components/Button";
import EventLine from "../components/EventLine";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import "./style/dashboard.css";

import HouseHold from "../components/HouseHold";

class Dashboard extends Component {

  // Define state for Dahsboard object
  state = {
    householdName: "No current household", // HouseholdName defaults to an error and should be updated when loading other household info
  };

  // Attaching ref to SideNav so that we can access its internal state
  // We can now access functions from SideNav using: this.SideNav.current.someFunction()
  sidenavRef = React.createRef();

  // Function for closing the side nav panel. Only does anything if the nav is currently open
  closeNav = () => {
    if (this.sidenavRef.current.state.open) {
      this.sidenavRef.current.closeNav();
    }
  };

  openNav = () => {
    this.sidenavRef.current.openNav();
  };

  render() {
    return (
      <div>
        <SideNav ref={this.sidenavRef} />
        {/* The below div exists purely to allow clicking off of the side-nav to close it. Putting that functionality into Container did not work. */}
        <div onClick={this.closeNav}>
          <TopNav 
          slideOut={this.openNav}
          householdName={this.state.householdName}
          />
          <Container>
            <Row>
              <Col size="md-12 fluid">
                <p>This is the Dashboard</p>
                <DashCard
                  icon="fa fa-calendar-alt"
                  title="Monday 11-18-19"
                  id="show-more"
                  showmoreIcon="fas fa-angle-double-down fa-lg"
                >
                  <EventLine
                    time="9:00 AM"
                    title="Ride to pratice"
                    duration="00:45"
                    requestor="(Rory)"
                    assigned="assigned: Myles"
                    icon1="fas fa-plus-square fa-lg"
                    icon2="fas fa-check-square fa-lg"
                  ></EventLine>
                  <EventLine
                    time="12:00 PM"
                    title="Pick up from work"
                    duration="00:15"
                    requestor="(Kyra)"
                    assigned="assigned: Myles"
                    icon1="fas fa-plus-square fa-lg"
                    icon2="fas fa-check-square fa-lg"
                  ></EventLine>
                  <EventLine
                    time=""
                    title="Signed permission form"
                    duration=""
                    requestor="(Kyra)"
                    assigned="assigned: Sean"
                    icon1="fas fa-plus-square fa-lg"
                    icon2="fas fa-check-square fa-lg"
                  ></EventLine>
                </DashCard>
                <DashCard icon="fa fa-calendar-alt" title="Wednesday 11-20-19">
                  <EventLine
                    time="5:00 PM"
                    title="Pick up dinner"
                    duration="00:30"
                    requestor="(Sean)"
                    assigned="assigned: Myles"
                    icon1="fas fa-plus-square fa-lg"
                    icon2="far fa-check-square fa-lg"
                  ></EventLine>
                </DashCard>
                <DashCard icon="fa fa-calendar-alt" title="Friday 11-21-19">
                  <EventLine
                    time="4:00 PM"
                    title="Drop off at meet"
                    duration="00:45"
                    requestor="(Rory)"
                    assigned="unassigned"
                    icon1="far fa-plus-square fa-lg"
                    icon2="far fa-check-square fa-lg"
                  ></EventLine>
                  <EventLine
                    time="8:00 PM"
                    title="Pick up from meet"
                    duration="00:45"
                    requestor="(Rory)"
                    assigned="unassigned"
                    icon1="far fa-plus-square fa-lg"
                    icon2="far fa-check-square fa-lg"
                  ></EventLine>
                </DashCard>
                <DashCard icon="fa fa-calendar-alt" title="Wednesday 11-26-19">
                  <EventLine
                    time="6:00 PM"
                    title="Pick up from practice"
                    duration="00:45"
                    requestor="(Rory)"
                    assigned="unassigned"
                    icon1="far fa-plus-square fa-lg"
                    icon2="far fa-check-square fa-lg"
                  ></EventLine>
                  <EventLine
                    time="8:00 PM"
                    title="Pick up from meet"
                    duration="00:45"
                    requestor="(Rory)"
                    assigned="unassigned"
                    icon1="far fa-plus-square fa-lg"
                    icon2="far fa-check-square fa-lg"
                  ></EventLine>
                </DashCard>
                <DashCard icon="fa fa-calendar-alt" title="Friday 11-28-19">
                  <EventLine
                    time="8:00 AM"
                    title="Drop off at High School"
                    duration="00:45"
                    requestor="(Kyra)"
                    assigned="assigned: Myles"
                    icon1="fas fa-plus-square fa-lg"
                    icon2="far fa-check-square fa-lg"
                  ></EventLine>
                  <EventLine
                    time="10:00 AM"
                    title="Drop off at parade"
                    duration="00:45"
                    requestor="(Sean)"
                    assigned="assigned: Myles"
                    icon1="fas fa-plus-square fa-lg"
                    icon2="far fa-check-square fa-lg"
                  ></EventLine>
                  <div>
                    <Button
                      id="add-event"
                      icon="fas fa-plus-circle fa-3x"
                    ></Button>
                  </div>
                </DashCard>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Dashboard;
