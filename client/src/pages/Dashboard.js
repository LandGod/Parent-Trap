import React, { Component } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid/index";
import DashCard from "../components/DashCard";
import Button from "../components/Button";
import EventLine from "../components/EventLine";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import UtilFunc from "../components/utilityFunctions";
import ModalCardBody from "../components/Modal/modalBody"
import "./style/Dashboard.css";


// mock up date for early testing prior to API route availability 
// const eventData = [
// { date: "Monday 11/18/2019",
//   events: [{event_id: '1', status: "closed", title: "Ride to Practice", eventType: "ride",  time: "9:00 AM", creator: "Rory", assigned: "Myles", location1: 'Mukilteo, WA', location2: 'Snoqualmie, WA', note: 'Picking up the carpool on the way', startTime: '4:47', endTime: '2:27'},
//           {event_id: '2', status: "closed", title: "Pick up from work", eventType: "ride", time: "9:00 AM", creator: "Rory", assigned: "Myles", location1: 'Everett, WA', location2: 'Home', note: "Don't forget you need to be there early to find parking"},
//           {event_id: '3', status: "closed", title: "Sign permission slip", eventType: "task", time: "", creator: "Kyra", assigned: "Sean", location1: 'Home', location2: '', note: 'Please include money for lunch'},
//           {event_id: '4', status: "closed", title: "Pick up from Jane's", eventType: "ride", time: "8:00PM", creator: "Rory", assigned: "Myles", location1: "Jane's House", location2: 'Home', note: ''}]},
//   {date: "Wednesday 11/20/2019",
//   events: [{event_id: '5', status: "open", title: "Pick up dinner", eventType: "task", time: "5:00 PM", creator: "Sean", assigned: "Myles"}]},
//   {date: "Thursday 11/21/2019",
//   events: [{event_id: '6', status: "open", title: "Drop off at meet", eventType: "ride", time: "4:00 PM", creator: "Rory", assigned: ""},
//           {event_id: '7', status: "open", title: "Pick up from meet", eventType: "ride", time: "9:00 PM", creator: "Rory", assigned: ""}]}
// ]


// Define state for Dashboard object
class Dashboard extends Component {
  state = {
    householdName: "No current household", // HouseholdName defaults to an error and should be updated when loading other household info
    householdId: "",
    //events: eventData
    events: [],
    userId: "",
    firstName: "",
    lastName: "",
    viewType: "" // page view type
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


  clickViewEvent = (clickEvent, identifier, viewedEvent) => {

    this.modalRef.current.setState({modalType: 'ViewEvent', event: viewedEvent}, () => {

      this.modalRef.current.toggleModal();
  });
    console.log(`you clicked the view event button`);
    console.log(viewedEvent);
  }

  clickEditEvent = (clickEvent, identifier, viewedEvent) => {

    this.modalRef.current.setState({modalType: 'EditEvent', event: viewedEvent}, () => {

      this.modalRef.current.toggleModal();
  });
    console.log(`you clicked the edit event button`);
    console.log(viewedEvent);
  }

  getHouseholdId = () => {
    return this.state.householdId;
  }

  // When the component mounts, get a list of all events
  componentDidMount() {
      // get user info from session storage
      var userInfo = UtilFunc.getLocalUserInfo();
      //console.log(`userInfo: ${JSON.stringify(userInfo)}`);

       // console.log(`User Id from Session Storage: ${userInfo.memberId}`);
       // console.log(`Household Id from Session Storage: ${userInfo.currentHouseholdId}`)  
       this.setState({userId: userInfo.memberId}); 
       this.setState({householdId: userInfo.currentHouseholdId}); 

       // get the user so we can have the first and last name from the account information
       API.getMember(userInfo.memberId)
       .then(res => {
         // console.log(`Member Lookup: ${res.data[0].firstName}`)
         // capture the user account first & last names
         this.setState({firstName: res.data[0].firstName}); 
         this.setState({lastName: res.data[0].lastName}); 
       })
       .catch(err => console.log(err));

       // get the household so we can have the household name on Nav Bar
       API.getHousehold(userInfo.currentHouseholdId)
       .then(res => {
         // console.log(`Member Lookup: ${res.data[0].firstName}`)
         // capture the user account first & last names
         this.setState({householdName: res.data[0].name}); 
       })
       .catch(err => console.log(err));

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

         // save view type in state
         this.setState({viewType: viewParam});

         // evaluate which view is being rendered
         if(viewParam === 'myevents'){
           //API call for the events the user has created
           const type = "current-user"
           API.getHouseholdEvents(userInfo.currentHouseholdId,userInfo.memberId,type)
              .then(res => {
                // if no data retrieved return empty error for dashboard map render
                if (res.data[0].hasOwnProperty("events")) {
                  this.setState({ events: res.data })
                } else {
                  this.setState({ events: [] })
                }
              })
              .catch(err => console.log(err));
         }else if(viewParam === 'unassigned'){
           //API call for unclaimed events
           const type = "unassigned";
           API.getHouseholdEvents(userInfo.currentHouseholdId,userInfo.memberId,type)
              .then(res => {
                // if no data retrieved return empty error for dashboard map render
                if (res.data[0].hasOwnProperty("events")) {
                  this.setState({ events: res.data })
                } else {
                  this.setState({ events: [] })
                }
              })
              .catch(err => console.log(err));
         }else if(viewParam === 'assigned'){
          //API call for events assigned to the current user
          const type = "assigned";
          API.getHouseholdEvents(userInfo.currentHouseholdId,userInfo.memberId,type)
             .then(res => {
               // if no data retrieved return empty error for dashboard map render
               if (res.data[0].hasOwnProperty("events")) {
                 this.setState({ events: res.data })
               } else {
                 this.setState({ events: [] })
               }
             })
             .catch(err => console.log(err));
          }else{
           //something that doesn't make sense. Default Dashboard.
           const type = "all";
           this.setState({viewType: "all"});
           API.getHouseholdEvents(userInfo.currentHouseholdId,userInfo.memberId,type)
              .then(res => {
                // reformat response data if empty into empty array
                if (res.data[0].hasOwnProperty("events")) {
                    this.setState({ events: res.data })
                } else {
                  this.setState({ events: [] })
                }
              })
              .catch(err => console.log(err));
         }
       }else{
         //We didn't find a view parameter, show the default dashboard
        //  console.log("No parameter. Default dashboard.");
         this.setState({viewType: "all"});
         const type = "all";
         API.getHouseholdEvents(userInfo.currentHouseholdId,userInfo.memberId,type)
            .then(res => {
                // reformat response data if empty into empty array
                if (res.data[0].hasOwnProperty("events")) {
                  this.setState({ events: res.data })
                } else {
                  this.setState({ events: [] })
                };
            })
            .catch(err => console.log(err));
       }
  }

  // manage the show more show less chevron button (appears if > 3 events for date)
  showHideChange = (toggleAction, eventDate) => { 
    // console.log(`In showHidChange EventDate: ${eventDate} toggleAction: ${toggleAction}`);
    const newEvents = [...this.state.events];
    const dateIndex = newEvents.findIndex(event => event.date === eventDate);
    const newShowHideClass = (toggleAction === 'show') ? 'show-event' : 'hide-event';
    // adjusting 4th and greater events for date to either show or hide them
    newEvents[dateIndex].events.map((event,i) => {
      // console.log(`Event is: ${i} event details: ${JSON.stringify(event)}`)
      if (i > 2 ) {
        // console.log(`this is: ${i} event id is ${event.event_id}`)
        const itemIndex = newEvents[dateIndex].events.findIndex(dateEvent => dateEvent.event_id === event.event_id);
        // console.log(`dateIndex: ${dateIndex} item index: ${itemIndex}`)
        newEvents[dateIndex].events[itemIndex].showhideclass = newShowHideClass;  // assigned the toggled showhideclass
      };
      this.setState({events: newEvents});
    })
  };

  // manage the assign event to self button - either assigning to self or removing from self
  modifyEventAssign = (eventId, eventDate) => {
    const newEvents = [...this.state.events];
    const dateIndex = newEvents.findIndex(event => event.date === eventDate);
    const itemIndex = newEvents[dateIndex].events.findIndex(event => event.event_id === eventId);
    // console.log(`assign click: ${newEvents[dateIndex].events[itemIndex].assigned }`)

    // // if Event is assigned then toggle it to unassigned
    // if (newEvents[dateIndex].events[itemIndex].assigned) {
    //   // console.log(`was assigned`)
    //   newEvents[dateIndex].events[itemIndex].assigned = undefined;   // name
    //   newEvents[dateIndex].events[itemIndex].assigned_id = undefined;  // member id
    //   newEvents[dateIndex].events[itemIndex].assignedStatus = 'unassigned';  // assigned status

    //   // console.log(`event: ${newEvents[dateIndex].events[itemIndex].title} 
    //   //              event id: ${newEvents[dateIndex].events[itemIndex].event_id} 
    //   //              user: ${newEvents[dateIndex].events[itemIndex].assigned}
    //   //             user_id: ${newEvents[dateIndex].events[itemIndex].assigned_id}`)
    //   this.setState({events: newEvents});

    //   // update database to remove assignee and set event assigned status to unassigned
    //   const id = newEvents[dateIndex].events[itemIndex].event_id;
    //   const eventData = {$set: {assignedStatus: "unassigned"}, $unset: {assignee: 1}}
    //   API.updateEvent(id,eventData)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err)); 
    // } 

    // if Event is assigned then toggle it to unassigned
    if (newEvents[dateIndex].events[itemIndex].assigned) {
      // console.log(`was assigned`)
      newEvents[dateIndex].events[itemIndex].assigned = undefined;   // name
      newEvents[dateIndex].events[itemIndex].assigned_id = undefined;  // member id
      newEvents[dateIndex].events[itemIndex].assignedStatus = 'unassigned';  // assigned status

      // capture Event id before possible splice out of the events array (if on assigned Events view)
      const id = newEvents[dateIndex].events[itemIndex].event_id;

      // console.log(`event: ${newEvents[dateIndex].events[itemIndex].title} 
      //              event id: ${newEvents[dateIndex].events[itemIndex].event_id} 
      //              user: ${newEvents[dateIndex].events[itemIndex].assigned}
      //             user_id: ${newEvents[dateIndex].events[itemIndex].assigned_id}`)

      if (this.state.viewType === "assigned") {
        // console.log(`unassigning an event on the assigned view`)

        // // show content of events array
        // newEvents[dateIndex].events.map((event,idx) => { 
        //   console.log(`row: ${idx} ${event.showhideclass}  ${event.title} `)
        // });

        // splice out the event from state
        newEvents[dateIndex].events.splice(itemIndex,1);

        // if there are >= 4 rows left & 4th row is hidden then show it to make up
        // for the removal of a row before it
        //console.log(`length: ${newEvents[dateIndex].events.length}`);
        
        // if last event was spliced out then splice out the date header itself
        if (newEvents[dateIndex].events.length === 0) {
          newEvents.splice(dateIndex,1);
        } // reveil the next up event if it is hidden
          else if (newEvents[dateIndex].events.length >= 3 && 
          newEvents[dateIndex].events[2].showhideclass === 'hide-event') {
            newEvents[dateIndex].events[2].showhideclass = 'show-event'
          };
      } 

      // re-render the dom after resetting the state to the reflect 
      // changes in the event assignements
      this.setState({events: newEvents});


      // update database to remove assignee and set event assigned status to unassigned
      const eventData = {$set: {assignedStatus: "unassigned"}, $unset: {assignee: 1}}
      API.updateEvent(id,eventData)
        .then(res => console.log(res))
        .catch(err => console.log(err)); 
    } 
      // Event was unassigned - now assign it
      else {
      // console.log(`State of Member: ${this.state.firstName} ${this.state.lastName} ${this.state.userId}`);
      newEvents[dateIndex].events[itemIndex].assigned = this.state.firstName // 'current user';  // name
      newEvents[dateIndex].events[itemIndex].assigned_id = this.state.userId // 'current userId';  // member id
      newEvents[dateIndex].events[itemIndex].assignedStatus = 'claimed';  // assigned status

      // capture Event id before possible splice out of the events array (if on unassigned Events view)
      const id = newEvents[dateIndex].events[itemIndex].event_id;

      if (this.state.viewType === "unassigned") {
        // console.log(`assigning an event on the Unassigned view`)

        // // show content of events array
        // newEvents[dateIndex].events.map((event,idx) => { 
        //   console.log(`row: ${idx} ${event.showhideclass}  ${event.title} `)
        // });

        // splice out the event from state
        newEvents[dateIndex].events.splice(itemIndex,1);

        // if there are >= 4 rows left & 4th row is hidden then show it to make up
        // for the removal of a row before it
        //console.log(`length: ${newEvents[dateIndex].events.length}`);
        
        // if last event was spliced out then splice out the date header itself
        if (newEvents[dateIndex].events.length === 0) {
          newEvents.splice(dateIndex,1);
        } // reveil the next up event if it is hidden
          else if (newEvents[dateIndex].events.length >= 3 && 
          newEvents[dateIndex].events[2].showhideclass === 'hide-event') {
            newEvents[dateIndex].events[2].showhideclass = 'show-event'
          };
      } 
      // re-render the dom after resetting the state to the reflect 
      // changes in the event assignements
      this.setState({events: newEvents});

      // update database to add assignee and set event assigned status to claimed
      const eventData = {assignee: this.state.userId, assignedStatus: "claimed"}
      API.updateEvent(id,eventData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    };
  }

  // manage the event status button - either marking as closed or open
  modifyEventStatus = (eventId, eventDate) => {
    const newEvents = [...this.state.events];
    const dateIndex = newEvents.findIndex(event => event.date === eventDate);
    const itemIndex = newEvents[dateIndex].events.findIndex(event => event.event_id === eventId);
    newEvents[dateIndex].events[itemIndex].status = newEvents[dateIndex].events[itemIndex].status === 'closed' ? 'open' : 'closed';
    // console.log(`event: ${newEvents[dateIndex].events[itemIndex].title}    
    //              event id: ${newEvents[dateIndex].events[itemIndex].event_id}
    //              status: ${newEvents[dateIndex].events[itemIndex].status}`)
    this.setState({events: newEvents});

    // update the database to set event to open or closed
    const id = newEvents[dateIndex].events[itemIndex].event_id;
    const eventData = {status: newEvents[dateIndex].events[itemIndex].status}
    API.updateEvent(id,eventData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  // render the Dashboard Component
  render() {
    return (
      <section>
        <SideNav ref={this.sidenavRef} />
        {/* The below div exists purely to allow clicking off of the side-nav to close it. Putting that functionality into Container did not work. */}
        <div onClick={this.closeNav}>
          <TopNav 
          slideOut={this.openNav}
          // householdName={this.state.householdName}
          householdName={(this.state.viewType === "all") ? `${this.state.householdName} - All Events`
                          : ((this.state.viewType === "myevents") ? `My Events - ${this.state.firstName}` 
                          : ((this.state.viewType === "assigned") ? `Events Assigned to ${this.state.firstName}`
                          : `${this.state.householdName} - Unassigned Events`))}
          />
          <Container>
            <Row>
              <Col size="md-12 fluid">
                {  
                  // render if dates & event exist else render 'No Event' text - see end of ternary
                  (this.state.events.length > 0) ?
                  this.state.events.map((eventDate,i) => {
                    // console.log(`EVENT: ${JSON.stringify(eventDate.date)}`)
                    return (
                      <div className="date-card-div">
                      <DashCard
                      key={eventDate.date}
                      icon="fa fa-calendar-alt"
                      title={eventDate.date}
                      id={(eventDate.events.length > 3) ? "show-more" : undefined }
                      showmoreIcon={(eventDate.events.length > 3) ? "fas fa-angle-double-down fa-lg" : "" }
                      events={eventDate.events}
                      eventDate={eventDate.date}
                      firstdashcard={(i === 0) ? "first-dashcard" : ""}
                      onClickShowHide={this.showHideChange}
                     ></DashCard>
                      {
                        eventDate.events.map((event,i) => {
                          // console.log(`assigned: ${event.assigned} assigned_id: ${event.assigned_id} status: ${event.status} `)
                          // console.log(`EVENT: ${JSON.stringify(event)}`)
                          return (
                            <EventLine
                            key={event.event_id}
                            showhideclass={event.showhideclass}
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
                            iconView={event.event_id}
                            onClickView={this.clickViewEvent}
                            onClickViewParam={event}
                            iconEdit={event.event_id}
                            onClickEdit={this.clickEditEvent}
                            onClickEditParam={event}
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
                    </div>) 
                  })
                  : <div className="no-events-msg">
                    <h3>Welcome back 😄 </h3>
                    <p>It looks like there aren't any events for this house! To add a new event, click the '+' sign below.</p>
                    </div>
                }
                <div>
                    <Button
                      id="add-event"
                      icon="fas fa-plus-circle fa-3x "
                      clickEvent={this.clickAddEvent}
                    ></Button>
                  </div>
              </Col>
            </Row>
          </Container>
        </div>
        <ModalCardBody getHouseholdIdFunction={this.getHouseholdId} ref={this.modalRef} />
      </section>
    );
  }
}

export default Dashboard;
