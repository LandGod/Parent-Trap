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
// const eventData = [
// { date: "Monday 11/18/2019",
//   events: [{status: "closed", title: "Ride to Practice", eventType: "ride", time: "9:00 AM", creator: "Rory", assigned: "Myles"},
//           {status: "closed", title: "Pick up from work", eventType: "ride", time: "9:00 AM", creator: "Rory", assigned: "Myles"},
//           {status: "closed", title: "Sign permission slip", eventType: "task", time: "", creator: "Kyra", assigned: "Sean"},
//           {status: "closed", title: "Pick up from Jane's", eventType: "ride", time: "8:00PM", creator: "Rory", assigned: "Myles"}]},
//   {date: "Wednesday 11/20/2019",
//   events: [{status: "open", title: "Pick up dinner", eventType: "task", time: "5:00 PM", creator: "Sean", assigned: "Myles"}]},
//   {date: "Thursday 11/21/2019",
//   events: [{status: "open", title: "Drop off at meet", eventType: "ride", time: "4:00 PM", creator: "Rory", assigned: ""},
//           {status: "open", title: "Pick up from meet", eventType: "ride", time: "9:00 PM", creator: "Rory", assigned: ""}]}
// ]


class Dashboard extends Component {
  

  // Define state for Dahsboard object
  state = {
    householdName: "No current household", // HouseholdName defaults to an error and should be updated when loading other household info
    //events: eventData
    events: []
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


  // click add event button - botton for dashboard
  // if this is clicked then the edit event modal needs to be
  // shown and if it is not cancelled out then its new event
  // entry will need to be updated in database and this 
  // page will need to be re-rendered since the event could have
  // been added for any existing date or a new date
  clickAddEvent = () => {
    this.modalRef.current.setState({modalType: 'NewEventTable'}, () => {

      this.modalRef.current.toggleModal();
  });
    console.log(`you clicked the add event button`);
  }

  // When the component mounts, get a list of all events
  componentDidMount() {

       // hardcoded test household id: 
       const householdId = "5dd726706ddba45e5d59db35";
       const userId = "5dd596ae8813384487dca853"; // kyra's id
       //const type = "all";
       //const type = "unassigned";
       //const type = "current-user"

       //get the raw parameters submitted. eg. this will be "?view=assigned"
       let queryStringParams = this.props.location.search;
       //get only the "view=[something] part" by matching it with a regex
       let viewParam = queryStringParams.match(/view=[a-zA-Z]+/);
       //viewParam contains an array with all matches
       //Only one match in our case, so it'll look like:
       //["view=assigned"] or ["view=unclaimed"]
       //viewParam will be null if no matches are found
       if(viewParam){
         //We found a view parameter, get its value
         // on split, "view=assigned" becomes:
         //["view","assigned"] 
         viewParam = viewParam[0].split('=')[1];
         if(viewParam == 'assigned'){
           //API call for assigned events
           const type = "current-user"
           API.getHouseholdEvents(householdId,userId,type)
         .then(res => {this.setState({ events: res.data });
         console.log(`Events: ${JSON.stringify(res.data)}`);
         })
         .catch(err => console.log(err));
         }else if(viewParam == 'unclaimed'){
           //API call for unclaimed events
           const type = "unassigned";
           API.getHouseholdEvents(householdId,userId,type)
         .then(res => {this.setState({ events: res.data });
         console.log(`Events: ${JSON.stringify(res.data)}`);
         })
         .catch(err => console.log(err));
         }else{
           //something that doesn't make sense. Default Dashboard.
           const type = "all";
           API.getHouseholdEvents(householdId,userId,type)
         .then(res => {this.setState({ events: res.data });
         console.log(`Events: ${JSON.stringify(res.data)}`);
         })
         .catch(err => console.log(err));
         }
       }else{
         //We didn't find a view parameter, show the default dashboard
         console.log("No parameter. Default dashboard.");
         const type = "all";
         API.getHouseholdEvents(householdId,userId,type)
         .then(res => {this.setState({ events: res.data });
         console.log(`Events: ${JSON.stringify(res.data)}`);
         })
         .catch(err => console.log(err));
       }





    
    // // hardcoded test household id: 
    // const householdId = "5dd726706ddba45e5d59db35"; // moriarty-carey house
    // const userId = "5dd596ae8813384487dca853"; // kyra's id
    // //const type = "all";
    // const type = "unassigned";
    // //const type = "current-user"
    // API.getHouseholdEvents(householdId,userId,type)
    //   .then(res => {this.setState({ events: res.data });
    //   console.log(`Events: ${JSON.stringify(res.data)}`);
    //   })
    //   .catch(err => console.log(err));
  }

  modifyEventAssign = (eventId, eventDate) => {
    const newEvents = [...this.state.events];
    const dateIndex = newEvents.findIndex(event => event.date === eventDate);
    const itemIndex = newEvents[dateIndex].events.findIndex(event => event.event_id === eventId);
    // console.log(`assign click: ${newEvents[dateIndex].events[itemIndex].assigned }`)
    // newEvents[dateIndex].events[itemIndex].assigned = newEvents[dateIndex].events[itemIndex].assigned === undefined ? 'TBD' : undefined;
    if (newEvents[dateIndex].events[itemIndex].assigned) {
      console.log(`was assigned`)
      // console.log(`was assigned`)
      newEvents[dateIndex].events[itemIndex].assigned = undefined;   // name
      newEvents[dateIndex].events[itemIndex].assigned_id = undefined;  // member id
      newEvents[dateIndex].events[itemIndex].assignedStatus = 'unassigned';  // assigned status
      console.log(`event: ${newEvents[dateIndex].events[itemIndex].title} event id: ${newEvents[dateIndex].events[itemIndex].event_id} user: ${newEvents[dateIndex].events[itemIndex].assigned} user_id: ${newEvents[dateIndex].events[itemIndex].assigned_id}`)
      this.setState({events: newEvents});
      // add database update here to remove assignee
      const id = newEvents[dateIndex].events[itemIndex].event_id;
      // const eventData = {assignee: undefined, assignedStatus: "unassigned"}
      const eventData = {$set: {assignedStatus: "unassigned"}, $unset: {assignee: 1}}
      API.updateEvent(id,eventData)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else {
      console.log(`was un-assigned`)
      newEvents[dateIndex].events[itemIndex].assigned = 'current user';  // name
      newEvents[dateIndex].events[itemIndex].assigned_id = 'current userId';  // member id
      newEvents[dateIndex].events[itemIndex].assignedStatus = 'claimed';  // assigned status
      console.log(`event: ${newEvents[dateIndex].events[itemIndex].title} event id: ${newEvents[dateIndex].events[itemIndex].event_id} user: ${newEvents[dateIndex].events[itemIndex].assigned} user_id: ${newEvents[dateIndex].events[itemIndex].assigned_id}`)
      this.setState({events: newEvents});
      // update the database -  hardcode user id to Myles
      // const id = newEvents[dateIndex].events[itemIndex].event_id;
      // const memberId = '5dd596bf8813384487dca854'
      // const eventData = {member: memberId, status: "claimed"}
      // API.addInvitee(id,eventData)
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err))
      const id = newEvents[dateIndex].events[itemIndex].event_id;
      const memberId = '5dd596bf8813384487dca854'
      const eventData = {assignee: memberId, assignedStatus: "claimed"}
      API.updateEvent(id,eventData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      };
  }

  modifyEventStatus = (eventId, eventDate) => {
    const newEvents = [...this.state.events];
    const dateIndex = newEvents.findIndex(event => event.date === eventDate);
    const itemIndex = newEvents[dateIndex].events.findIndex(event => event.event_id === eventId);
    newEvents[dateIndex].events[itemIndex].status = newEvents[dateIndex].events[itemIndex].status === 'closed' ? 'open' : 'closed';
    console.log(`event: ${newEvents[dateIndex].events[itemIndex].title} event id: ${newEvents[dateIndex].events[itemIndex].event_id} status: ${newEvents[dateIndex].events[itemIndex].status}`)
    this.setState({events: newEvents});
    // update the database
    const id = newEvents[dateIndex].events[itemIndex].event_id;
    const eventData = {status: newEvents[dateIndex].events[itemIndex].status}
    API.updateEvent(id,eventData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
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
                  // console.log(`>>>>>>>>>>>>>>>>>`)
                  return (
                    <div>
                      <DashCard
                      key={i + 234}
                      icon="fa fa-calendar-alt"
                      title={eventDate.date}
                      id={(eventDate.events.length > 3) ? "show-more" : undefined }
                      showmoreIcon={(eventDate.events.length > 3) ? "fas fa-angle-double-down fa-lg" : undefined }
                      events={eventDate.events}
                      firstdashcard={(i === 0) ? "first-dashcard" : ""}
                     ></DashCard>
                      {
                        eventDate.events.map((event,i) => {
                          // console.log(`assigned: ${event.assigned} assigned_id: ${event.assigned_id} status: ${event.status} `)
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
                            duration=""
                            creator_id={event.creator_id}
                            creator={event.creator}
                            assigned_id={(event.assigned_id) ? event.assigned_id : undefined}
                            assigned={(event.assigned) ? event.assigned : undefined}
                            iconView="fas fa-info-circle fa-lg"
                            iconEdit="fas fa-edit fa-lg"
                            // iconAssigned={(event.assigned) ? "fas fa-plus-square fa-lg" : "far fa-plus-square fa-lg"}
                            iconAssigned={(event.assigned) ? true : false}
                            iconCompleted={event.status === "closed"}  // sets iconCompleted to true or false
                            note={event.note}
                            onClickComplete={this.modifyEventStatus}
                            onClickAssign={this.modifyEventAssign}
                            eventDate={eventDate.date}
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
                      clickEvent={this.clickAddEvent}
                    ></Button>
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
