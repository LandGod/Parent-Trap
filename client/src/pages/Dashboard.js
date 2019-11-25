import React, { Component } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid/index";
import DashCard from "../components/DashCard";
import Button from "../components/Button";
import EventLine from "../components/EventLine";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import ModalCardBody from "../components/Modal/modalBody"


// mock up date for early testing prior to API route availability 
const eventData = [
{ date: "Monday 11/18/2019",
  events: [{status: "closed", title: "Ride to Practice", eventType: "ride", time: "9:00 AM", creator: "Rory", assigned: "Myles"},
          {status: "closed", title: "Pick up from work", eventType: "ride", time: "9:00 AM", creator: "Rory", assigned: "Myles"},
          {status: "closed", title: "Sign permission slip", eventType: "task", time: "", creator: "Kyra", assigned: "Sean"},
          {status: "closed", title: "Pick up from Jane's", eventType: "ride", time: "8:00PM", creator: "Rory", assigned: "Myles"}]},
  {date: "Wednesday 11/20/2019",
  events: [{status: "open", title: "Pick up dinner", eventType: "task", time: "5:00 PM", creator: "Sean", assigned: "Myles"}]},
  {date: "Thursday 11/21/2019",
  events: [{status: "open", title: "Drop off at meet", eventType: "ride", time: "4:00 PM", creator: "Rory", assigned: ""},
          {status: "open", title: "Pick up from meet", eventType: "ride", time: "9:00 PM", creator: "Rory", assigned: ""}]}
]


class Dashboard extends Component {
  

  // Define state for Dahsboard object
  state = {
    householdName: "No current household", // HouseholdName defaults to an error and should be updated when loading other household info
    events: eventData
    //events: []
  };


  // Attaching ref to SideNav so that we can access its internal state
  // We can now access functions from SideNav using: this.SideNav.current.someFunction()
  sidenavRef = React.createRef();

  //Attaching modal ref
  modalRef = React.createRef();

  // Function for closing the side nav panel. Only does anything if the nav is currently open
  closeNav = () => {
    if (this.sidenavRef.current.state.open) {
      this.sidenavRef.current.closeNav();
    }
  };

  openNav = () => {
    this.sidenavRef.current.openNav();
  };


  // click add event button - bottom for dashboard
  clickAddEvent = () => {
    this.modalRef.current.setState({modalType: 'NewEventTable'}, () => {

      this.modalRef.current.toggleModal();
  });
    console.log(`you clicked the add event button`);
  }

  // When the component mounts, get a list of all events
  componentDidMount() {
    // hardcoded test household id: 
    const id = "5dd726706ddba45e5d59db35";
    API.getAllHouseholdEvents(id)
      .then(res => {this.setState({ events: res.data });
      console.log(`Events: ${JSON.stringify(res.data)}`);
      })
      .catch(err => console.log(err));
  }

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
                {this.state.events.map((eventDate,i) => {
                  return (
                    <div>
                      <DashCard
                      key={i}
                      icon="fa fa-calendar-alt"
                      title={eventDate.date}
                      id={(eventDate.events.length > 3) ? "show-more" : undefined }
                      showmoreIcon={(eventDate.events.length > 3) ? "fas fa-angle-double-down fa-lg" : undefined }
                      events={eventDate.events}
                      firstdashcard={(i === 0) ? "first-dashcard" : ""}
                     ></DashCard>
                      {
                        eventDate.events.map(event => {
                          return (
                            <EventLine
                            key={event.event_id}
                            event_id={event.event_id}
                            title={event.title}
                            eventType={event.eventType}
                            status={event.status}
                            location1={event.location1}
                            location2={event.location2}
                            time={(event.time) ? event.time : undefined}
                            startTime={event.startTime}
                            endTime={event.endTime}
                            duration="00:00"
                            creator_id={event.creator_id}
                            creator={event.creator}
                            assigned_id={(event.assigned_id) ? event.assigned_id : undefined}
                            assigned={(event.assigned) ? event.assigned : undefined}
                            iconAssigned={(event.assigned) ? "fas fa-plus-square fa-lg" : "far fa-plus-square fa-lg"}
                            iconCompleted={(event.status) === "closed" ? "fas fa-check-square fa-lg" : "far fa-check-square fa-lg"}
                            note={event.note}
                          />
                          )
                        })
                      }
                    </div>
                  ) 
                })}
                <div>
                    <Button
                      id="add-event"
                      icon="fas fa-plus-circle fa-3x"
                      callback={this.clickAddEvent}
                    >
                    </Button>
                  </div>
              </Col>
            </Row>
          </Container>
        </div>
        <ModalCardBody ref={this.modalRef} />
      </div>
    );
  }
}

export default Dashboard;
