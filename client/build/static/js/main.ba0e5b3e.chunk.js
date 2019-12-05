(this["webpackJsonpparent-trap"]=this["webpackJsonpparent-trap"]||[]).push([[0],{103:function(e,t,a){},104:function(e,t,a){},106:function(e,t,a){},114:function(e,t,a){},115:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(20),s=a.n(r),l=a(8),i=a(9),c=a(11),u=a(10),d=a(12),m=a(121),h=a(122),p=a(123),v=a(37),f=a(16),E=a.n(f),g={getHouseholdEvents:function(e,t,a){switch(a){case"all":return E.a.get("/api/event/all/".concat(e));case"unassigned":return E.a.get("/api/event/unassigned/".concat(e));case"assigned":return E.a.get("/api/event/current-user-assigned/".concat(e,"/").concat(t));case"current-user":return E.a.get("/api/event/current-user/".concat(e,"/").concat(t))}},login:function(e){return E.a.put("/api/member/login",e)},createEvent:function(e){return E.a.post("/api/event",e)},updateEvent:function(e,t){return E.a.put("/api/event/"+e,t)},getMember:function(e){return E.a.get("/api/member/byId/"+e)},getHousehold:function(e){return E.a.get("/api/household/byId/"+e)},upsertMembers:function(e){return E.a.put("/api/member/update-many",e)},createHousehold:function(e){return E.a.post("/api/household/create",e)},addHouseholdMembers:function(e){return E.a.put("/api/household/add-members",e)}};function b(e){var t=e.fluid,a=e.children;return o.a.createElement("div",{className:"container".concat(t?"-fluid":"")},a)}function S(e){var t=e.fluid,a=e.children;return o.a.createElement("div",{className:"row".concat(t?"-fluid":"")},a)}function y(e){var t=e.size,a=e.children;return o.a.createElement("div",{className:t.split(" ").map((function(e){return"col-"+e})).join(" ")},a)}a(84);var I=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("button",{id:this.props.id,onClick:function(t){return e.props.clickEvent(t,e.props.identifier,e.props.clickEventParam)},className:""},o.a.createElement("i",{className:"".concat(this.props.icon),"aria-hidden":"true"})," ",this.props.title)}}]),t}(n.Component),N=(a(85),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={showmoreIcon:a.props.showmoreIcon},a.clickShowMoreLessEvent=function(){var e="fas fa-angle-double-down fa-lg"===a.state.showmoreIcon?"fas fa-angle-double-up fa-lg":"fas fa-angle-double-down fa-lg";a.setState({showmoreIcon:e});var t="fas fa-angle-double-up fa-lg"===e?"show":"hide";"function"===typeof a.props.onClickShowHide&&a.props.onClickShowHide(t,a.props.eventDate)},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.showmoreIcon!==this.props.showmoreIcon&&this.setState({showmoreIcon:e.showmoreIcon})}},{key:"render",value:function(){return o.a.createElement("div",{className:"card mt-4"},o.a.createElement("div",{className:"card-header ".concat(this.props.firstdashcard)},o.a.createElement("h3",null,o.a.createElement("i",{className:this.props.icon,"aria-hidden":"true"})," ",this.props.title,o.a.createElement(I,{id:this.props.id,icon:this.state.showmoreIcon,clickEvent:this.clickShowMoreLessEvent,title:""}))),o.a.createElement("div",{className:"card-body-fluid"},this.props.children))}}]),t}(n.Component)),w=(a(86),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={},a.clickEditEvent=function(e,t){console.log("you clicked the edit event button & ident is: ".concat(t))},a.clickAssignEvent=function(){"function"===typeof a.props.onClickAssign&&a.props.onClickAssign(a.props.event_id,a.props.eventDate)},a.clickCompleteEvent=function(){"function"===typeof a.props.onClickComplete&&a.props.onClickComplete(a.props.event_id,a.props.eventDate)},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props.iconCompleted?"fas fa-check-square fa-lg":"far fa-check-square fa-lg",t=this.props.iconAssigned?"fas fa-user-check fa-lg":"far fa-user fa-lg",a=(this.props.iconView,"fas fa-info-circle fa-lg"),n=(this.props.iconEdit,"fas fa-edit fa-lg");return o.a.createElement("div",{className:"event-div border rounded-sm ".concat(this.props.showhideclass)},o.a.createElement("div",{className:"row no-gutters"},o.a.createElement(y,{size:"6"},o.a.createElement("p",null,this.props.title)),o.a.createElement(y,{size:"3"},o.a.createElement("p",null,this.props.time)),o.a.createElement(y,{size:"3"},o.a.createElement("p",null,this.props.duration))),o.a.createElement("div",{className:"row no-gutters"},o.a.createElement(y,{size:"4"},o.a.createElement("p",null," (",this.props.creator,")")),o.a.createElement(y,{size:"4"},o.a.createElement("p",null,this.props.assigned?"assigned: ".concat(this.props.assigned):"unassigned")),o.a.createElement(y,{size:"1"},o.a.createElement(I,{icon:a,clickEvent:this.props.onClickView,clickEventParam:this.props.onClickViewParam,title:""})),o.a.createElement(y,{size:"1"},o.a.createElement(I,{icon:n,clickEvent:this.clickEditEvent,title:""})),o.a.createElement(y,{size:"1"},o.a.createElement(I,{icon:t,clickEvent:this.clickAssignEvent,title:""})),o.a.createElement(y,{size:"1"},o.a.createElement(I,{icon:e,clickEvent:this.clickCompleteEvent,title:""}))))}}]),t}(n.Component)),C=a(23),T=(a(96),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={open:!1,navWidth:{width:"0"}},a.openNav=function(){a.setState({navWidth:{width:"250px"},open:!0})},a.closeNav=function(){a.setState({navWidth:{width:"0"},open:!1})},a.handleLogout=function(){sessionStorage.clear(),C.auth().signOut().then((function(){console.log("signout succesful")}),(function(e){console.log(e)}))},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{id:"mySidenav",className:"sidenav",style:this.state.navWidth},o.a.createElement("button",{className:"closebtn",onClick:this.closeNav},"\xd7 "),o.a.createElement("div",{id:"filterDivider"},"FILTERS"),o.a.createElement("button",null," ",o.a.createElement("a",{href:"/dashboard"},"All Household Events")," "),o.a.createElement("button",null," ",o.a.createElement("a",{href:"/dashboard?view=myevents"},"My Events")," "),o.a.createElement("button",null," ",o.a.createElement("a",{href:"/dashboard?view=assigned"},"Assigned To Me")," "),o.a.createElement("button",null," ",o.a.createElement("a",{href:"/dashboard?view=unassigned"},"Unassigned Events")," "),o.a.createElement("div",{id:"accountDivider"},"ACCOUNT"),o.a.createElement("button",null," ",o.a.createElement("a",{href:"/"},"Edit Household")," "),o.a.createElement("button",{onClick:this.handleLogout}," ",o.a.createElement("a",{href:"/"},"Logout")," "))}}]),t}(n.Component));a(97);var O=function(e){return o.a.createElement("div",null,o.a.createElement("nav",{className:"navbar banner"},o.a.createElement("button",{className:"btn navselector",onClick:e.slideOut},o.a.createElement("i",{className:"fas fa-bars "})),o.a.createElement("span",{className:"navbar-brand mb-0 h1 housename"},e.householdName),o.a.createElement("span",null)))},k=a(25),j=a.n(k),D=a(118),L=a(31),A=a.n(L),M=a(40),H=a(119),x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){return console.log("newDate",e),a.setState({date:e})},a.handleTypeSelector=function(e){a.setState({eventType:e.target.value},(function(){console.log(a.state.eventType)}))},a.handleTitleInput=function(e){a.setState({eventTitle:e.target.value.trim()},(function(){console.log(a.state.eventTitle)}))},a.handleStartTimeInput=function(e){a.setState({eventStartTime:e.target.value.trim()},(function(){console.log(a.state.eventStartTime)}))},a.handleEndTimeInput=function(e){a.setState({eventEndTime:e.target.value.trim()},(function(){console.log(a.state.eventEndTime)}))},a.handleStartTimeSelector=function(e){a.setState({eventStartTimeSelector:e.target.value},(function(){console.log(a.state.eventStartTimeSelector)}))},a.handleEndTimeSelector=function(e){a.setState({eventEndTimeSelector:e.target.value},(function(){console.log(a.state.eventEndTimeSelector)}))},a.handleDateInput=function(e){a.setState({eventDate:e.target.value},(function(){console.log(a.state.eventDate)}))},a.handleStartLocationInput=function(e){a.setState({eventStartLocation:e.target.value},(function(){console.log(a.state.eventStartLocation)}))},a.handleEndLocationInput=function(e){a.setState({eventEndLocation:e.target.value},(function(){console.log(a.state.eventEndLocation)}))},a.handleDetailsInput=function(e){a.setState({eventDetails:e.target.value},(function(){console.log(a.state.eventDetails)}))},a.validateDateAndTime=function(){var e=Object(M.a)(A.a.mark((function e(t,n,o,r,s){var l,i,c,u,d,m,h,p,v,f,E;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==s&&""!==r&&""!==n&&""!==o){e.next=4;break}return e.abrupt("return",!1);case 4:if(l=t.split("/"),i=new Date(l[2]+"/"+l[0]+"/"+l[1]),!isNaN(i.getDate())){e.next=8;break}return e.abrupt("return",!1);case 8:if(c=new Date,!(i<=c)){e.next=11;break}return e.abrupt("return",!1);case 11:if(n.match(/^[0-1]?[0-9]:[0-5][0-9]/)&&o.match(/^[0-1]?[0-9]:[0-5][0-9]/)){e.next=13;break}return e.abrupt("return",!1);case 13:if(u=n.split(":"),d=o.split(":"),m=parseInt(u[0])+("PM"==r?12:0),h=parseInt(u[1]),p=parseInt(d[0])+("PM"==s?12:0),v=parseInt(d[1]),f=new Date(l[2],l[0],l[1],m,h),E=new Date(l[2],l[0],l[1],p,v),console.log(c),console.log(f),console.log(E),!(E>f&&f>c)){e.next=30;break}return e.next=27,a.setState({startTime:f.toISOString(),endTime:E.toISOString()},(function(){console.log(a.state)}));case 27:return e.abrupt("return",!0);case 30:return e.abrupt("return",!1);case 31:case"end":return e.stop()}}),e)})));return function(t,a,n,o,r){return e.apply(this,arguments)}}(),a.handleSubmit=function(){var e=Object(M.a)(A.a.mark((function e(t){var n,o,r,s,l,i,c;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=a.state,o=n.eventStartTime,r=n.eventStartTimeSelector,s=n.eventEndTime,l=n.eventEndTimeSelector,i=n.eventDate,e.next=9,a.validateDateAndTime(i,o,s,r,l);case 9:(c=e.sent)?(console.log("999999999"),console.log(c),"5dd596ae8813384487dca853",g.createEvent({title:a.state.eventTitle,eventType:a.state.eventType.toLowerCase(),location1:a.state.eventStartLocation,location2:a.state.eventEndLocation,startTime:a.state.startTime,endTime:a.state.endTime,note:a.state.eventDetails,creator:"5dd596ae8813384487dca853",houseHoldId:a.props.getHouseholdIdFunction()}),a.props.modalClose()):alert("enter a valid time");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.state={eventTitle:"",eventType:"Ride",eventStartTime:"8:45",eventStartTimeSelector:"AM",eventEndTime:"10:45",eventEndTimeSelector:"AM",eventDate:"",eventStartLocation:"",eventEndLocation:"",eventDetails:"",startTime:{},endTime:{}},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state;t.date,t.format,t.mode,t.inputFormat;return o.a.createElement(H.a,null,o.a.createElement(H.a.Group,{controlId:"eventTitleInput"},o.a.createElement(H.a.Label,null,"Title"),o.a.createElement(H.a.Control,{type:"input",placeholder:"Soccer Practice",onChange:function(t){return e.handleTitleInput(t)},value:this.state.title})),o.a.createElement(H.a.Group,{controlId:"eventTypeSelector"},o.a.createElement(H.a.Label,null,"Type"),o.a.createElement(H.a.Control,{as:"select",onChange:function(t){return e.handleTypeSelector(t)},value:this.state.eventType},o.a.createElement("option",{id:"eventTask"},"Ride"),o.a.createElement("option",{id:"eventRide"},"Task"))),o.a.createElement(H.a.Group,{controlId:"eventStartTimeInput"},o.a.createElement(H.a.Label,null,"Start Time"),o.a.createElement(H.a.Group,{className:"row"},o.a.createElement(H.a.Control,{type:"input",placeholder:"7:30",className:"col-5",onChange:function(t){return e.handleStartTimeInput(t)},value:this.state.eventStartTime}),o.a.createElement(H.a.Control,{as:"select",className:"col-5",onChange:function(t){return e.handleStartTimeSelector(t)},value:this.state.eventStartTimeSelector},o.a.createElement("option",{id:"timeAM"},"AM"),o.a.createElement("option",{id:"timePM"},"PM")))),o.a.createElement(H.a.Group,{controlId:"eventEndTimeInput"},o.a.createElement(H.a.Label,null,"End Time"),o.a.createElement(H.a.Group,{className:"row"},o.a.createElement(H.a.Control,{type:"input",placeholder:"7:30",className:"col-5",onChange:function(t){return e.handleEndTimeInput(t)},value:this.state.eventEndTime}),o.a.createElement(H.a.Control,{as:"select",className:"col-5",onChange:function(t){return e.handleEndTimeSelector(t)},value:this.state.eventEndTimeSelector},o.a.createElement("option",{id:"timeAM"},"AM"),o.a.createElement("option",{id:"timePM"},"PM")))),o.a.createElement(H.a.Group,{controlId:"eventDateInput"},o.a.createElement(H.a.Label,null,"Date"),o.a.createElement(H.a.Control,{type:"input",placeholder:"11/11/2019",onChange:function(t){return e.handleDateInput(t)},value:this.state.eventDate})),o.a.createElement(H.a.Group,{controlId:"eventStartLocationInput"},o.a.createElement(H.a.Label,null,"Start Location"),o.a.createElement(H.a.Control,{type:"input",placeholder:"Seattle, WA",onChange:function(t){return e.handleStartLocationInput(t)},value:this.state.eventStartLocation})),o.a.createElement(H.a.Group,{controlId:"eventEndLocationInput"},o.a.createElement(H.a.Label,null,"End Location"),o.a.createElement(H.a.Control,{type:"input",placeholder:"Everett, WA",onChange:function(t){return e.handleEndLocationInput(t)},value:this.state.eventEndLocation})),o.a.createElement(H.a.Group,{controlId:"eventDetailsInput"},o.a.createElement(H.a.Label,null,"Details"),o.a.createElement(H.a.Control,{as:"textarea",rows:"3",placeholder:"We are picking up Amy on the way to practice!",onChange:function(t){return e.handleDetailsInput(t)},value:this.state.eventDetails})),o.a.createElement("button",{className:"btn btn-default",onClick:function(t){return e.handleSubmit(t)}},"Submit"),o.a.createElement("button",{className:"btn btn-default","data-dismiss":"modal"},"Cancel"))}}]),t}(n.Component),P=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.event;return o.a.createElement(b,null,o.a.createElement(H.a.Group,{controlId:"eventTitleInput"},o.a.createElement(H.a.Label,null,"Title"),o.a.createElement(H.a.Control,{type:"input",placeholder:"Soccer Practice",onChange:function(t){return e.handleTitleInput(t)},value:t.title})),o.a.createElement(H.a.Group,{controlId:"eventTypeSelector"},o.a.createElement(H.a.Label,null,"Type"),o.a.createElement(H.a.Control,{as:"select",placeholder:this.props.event.eventType,onChange:function(t){return e.handleTypeSelector(t)},value:this.props.event.eventType},o.a.createElement("option",{id:"eventTask"},"Ride"),o.a.createElement("option",{id:"eventRide"},"Task"))),o.a.createElement(H.a.Group,{controlId:"eventStartTimeInput"},o.a.createElement(H.a.Label,null,"Start Time"),o.a.createElement(H.a.Group,{className:"row"},o.a.createElement(H.a.Control,{type:"input",placeholder:this.props.event.startTime,className:"col-5",onChange:function(t){return e.handleStartTimeInput(t)},value:this.props.event.StartTime}),o.a.createElement(H.a.Control,{as:"select",className:"col-5"},o.a.createElement("option",{id:"timeAM"},"AM"),o.a.createElement("option",{id:"timePM"},"PM")))),o.a.createElement(H.a.Group,{controlId:"eventEndTimeInput"},o.a.createElement(H.a.Label,null,"End Time"),o.a.createElement(H.a.Group,{className:"row"},o.a.createElement(H.a.Control,{type:"input",placeholder:this.props.event.endTime,className:"col-5",onChange:function(t){return e.handleEndTimeInput(t)},value:this.props.event.EndTime}),o.a.createElement(H.a.Control,{as:"select",className:"col-5"},o.a.createElement("option",{id:"timeAM"},"AM"),o.a.createElement("option",{id:"timePM"},"PM")))),o.a.createElement(H.a.Group,{controlId:"eventDateInput"},o.a.createElement(H.a.Label,null,"Date"),o.a.createElement(H.a.Control,{type:"input",placeholder:"11/11/2019",onChange:function(t){return e.handleDateInput(t)},value:this.props.event.date})),o.a.createElement(H.a.Group,{controlId:"eventStartLocationInput"},o.a.createElement(H.a.Label,null,"Start Location"),o.a.createElement(H.a.Control,{type:"input",placeholder:this.props.event.location1,onChange:function(t){return e.handleStartLocationInput(t)},value:this.props.event.location1})),o.a.createElement(H.a.Group,{controlId:"eventEndLocationInput"},o.a.createElement(H.a.Label,null,"End Location"),o.a.createElement(H.a.Control,{type:"input",placeholder:this.props.event.location2,onChange:function(t){return e.handleEndLocationInput(t)},value:this.props.event.location2})),o.a.createElement(H.a.Group,{controlId:"eventDetailsInput"},o.a.createElement(H.a.Label,null,"Details"),o.a.createElement(H.a.Control,{as:"textarea",rows:"3",placeholder:this.props.event.note,onChange:function(t){return e.handleDetailsInput(t)},value:this.props.event.note})))}}]),t}(n.Component),R=(a(103),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).toggleModal=function(){e.setState({showModal:!e.state.showModal}),console.log(e.state.showModal),console.log("here for it")},e.state={showModal:!1,modalType:"NewEventTable",event:{}},e}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return"NewEventTable"===this.state.modalType?o.a.createElement("div",null,o.a.createElement(D.a,{show:this.state.showModal,onHide:this.toggleModal},o.a.createElement(D.a.Header,{closeButton:!0},o.a.createElement(D.a.Title,{id:"."},this.props.title," Create New Event")),o.a.createElement(D.a.Body,null,o.a.createElement(x,{getHouseholdIdFunction:this.props.getHouseholdIdFunction,modalClose:this.toggleModal})))):"ViewEvent"===this.state.modalType?o.a.createElement("div",null,o.a.createElement(D.a,{show:this.state.showModal,onHide:this.toggleModal},o.a.createElement(D.a.Header,{closeButton:!0},o.a.createElement(D.a.Title,{id:"."},this.state.event.title)),o.a.createElement(D.a.Body,null,o.a.createElement(P,{event:this.state.event})))):void 0}}]),t}(n.Component)),z=(a(104),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={householdName:"No current household",householdId:"",events:[],userId:"",firstName:"",lastName:"",viewType:""},a.sidenavRef=o.a.createRef(),a.modalRef=o.a.createRef(),a.closeNav=function(){a.sidenavRef.current.state.open&&a.sidenavRef.current.closeNav()},a.openNav=function(){a.sidenavRef.current.openNav()},a.clickAddEvent=function(){a.modalRef.current.setState({modalType:"NewEventTable"},(function(){a.modalRef.current.toggleModal()})),console.log("you clicked the add event button")},a.clickViewEvent=function(e,t,n){a.modalRef.current.setState({modalType:"ViewEvent",event:n},(function(){a.modalRef.current.toggleModal()})),console.log("you clicked the view event button"),console.log(n)},a.getHouseholdId=function(){return a.state.householdId},a.showHideChange=function(e,t){var n=Object(v.a)(a.state.events),o=n.findIndex((function(e){return e.date===t})),r="show"===e?"show-event":"hide-event";n[o].events.map((function(e,t){if(t>2){var s=n[o].events.findIndex((function(t){return t.event_id===e.event_id}));n[o].events[s].showhideclass=r}a.setState({events:n})}))},a.modifyEventAssign=function(e,t){var n=Object(v.a)(a.state.events),o=n.findIndex((function(e){return e.date===t})),r=n[o].events.findIndex((function(t){return t.event_id===e}));if(n[o].events[r].assigned){n[o].events[r].assigned=void 0,n[o].events[r].assigned_id=void 0,n[o].events[r].assignedStatus="unassigned";var s=n[o].events[r].event_id;"assigned"===a.state.viewType&&(n[o].events.splice(r,1),0===n[o].events.length?n.splice(o,1):n[o].events.length>=3&&"hide-event"===n[o].events[2].showhideclass&&(n[o].events[2].showhideclass="show-event")),a.setState({events:n});g.updateEvent(s,{$set:{assignedStatus:"unassigned"},$unset:{assignee:1}}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}else{n[o].events[r].assigned=a.state.firstName,n[o].events[r].assigned_id=a.state.userId,n[o].events[r].assignedStatus="claimed";var l=n[o].events[r].event_id;"unassigned"===a.state.viewType&&(n[o].events.splice(r,1),0===n[o].events.length?n.splice(o,1):n[o].events.length>=3&&"hide-event"===n[o].events[2].showhideclass&&(n[o].events[2].showhideclass="show-event")),a.setState({events:n});var i={assignee:a.state.userId,assignedStatus:"claimed"};g.updateEvent(l,i).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}},a.modifyEventStatus=function(e,t){var n=Object(v.a)(a.state.events),o=n.findIndex((function(e){return e.date===t})),r=n[o].events.findIndex((function(t){return t.event_id===e}));n[o].events[r].status="closed"===n[o].events[r].status?"open":"closed",a.setState({events:n});var s=n[o].events[r].event_id,l={status:n[o].events[r].status};g.updateEvent(s,l).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=j.a.getLocalUserInfo();this.setState({userId:t.memberId}),this.setState({householdId:t.currentHouseholdId}),g.getMember(t.memberId).then((function(t){e.setState({firstName:t.data[0].firstName}),e.setState({lastName:t.data[0].lastName})})).catch((function(e){return console.log(e)})),g.getHousehold(t.currentHouseholdId).then((function(t){e.setState({householdName:t.data[0].name})})).catch((function(e){return console.log(e)}));var a=this.props.location.search.match(/view=[a-zA-Z]+/);if(a)if(a=a[0].split("=")[1],this.setState({viewType:a}),"myevents"===a){g.getHouseholdEvents(t.currentHouseholdId,t.memberId,"current-user").then((function(t){t.data[0].hasOwnProperty("events")?e.setState({events:t.data}):e.setState({events:[]})})).catch((function(e){return console.log(e)}))}else if("unassigned"===a){g.getHouseholdEvents(t.currentHouseholdId,t.memberId,"unassigned").then((function(t){t.data[0].hasOwnProperty("events")?e.setState({events:t.data}):e.setState({events:[]})})).catch((function(e){return console.log(e)}))}else if("assigned"===a){g.getHouseholdEvents(t.currentHouseholdId,t.memberId,"assigned").then((function(t){t.data[0].hasOwnProperty("events")?e.setState({events:t.data}):e.setState({events:[]})})).catch((function(e){return console.log(e)}))}else{this.setState({viewType:"all"}),g.getHouseholdEvents(t.currentHouseholdId,t.memberId,"all").then((function(t){t.data[0].hasOwnProperty("events")?e.setState({events:t.data}):e.setState({events:[]})})).catch((function(e){return console.log(e)}))}else{this.setState({viewType:"all"});g.getHouseholdEvents(t.currentHouseholdId,t.memberId,"all").then((function(t){t.data[0].hasOwnProperty("events")?e.setState({events:t.data}):e.setState({events:[]})})).catch((function(e){return console.log(e)}))}}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(T,{ref:this.sidenavRef}),o.a.createElement("div",{onClick:this.closeNav},o.a.createElement(O,{slideOut:this.openNav,householdName:"all"===this.state.viewType?"".concat(this.state.householdName," - All Events"):"myevents"===this.state.viewType?"My Events - ".concat(this.state.firstName):"assigned"===this.state.viewType?"Events Assigned to ".concat(this.state.firstName):"".concat(this.state.householdName," - Unassigned Events")}),o.a.createElement(b,null,o.a.createElement(S,null,o.a.createElement(y,{size:"md-12 fluid"},this.state.events.length>0?this.state.events.map((function(t,a){return o.a.createElement("div",{className:"date-card-div"},o.a.createElement(N,{key:t.date,icon:"fa fa-calendar-alt",title:t.date,id:t.events.length>3?"show-more":void 0,showmoreIcon:t.events.length>3?"fas fa-angle-double-down fa-lg":"",events:t.events,eventDate:t.date,firstdashcard:0===a?"first-dashcard":"",onClickShowHide:e.showHideChange}),t.events.map((function(a,n){return o.a.createElement(w,{key:a.event_id,showhideclass:a.showhideclass,event_id:a.event_id,title:a.title,eventType:a.eventType,status:a.status,location1:a.location1,location2:a.location2,time:a.time?a.time:void 0,startTime:a.startTime,endTime:a.endTime,duration:"",creator_id:a.creator_id,creator:a.creator,assigned_id:a.assigned_id?a.assigned_id:void 0,assigned:a.assigned?a.assigned:void 0,iconView:a.event_id,iconEdit:a.event_id,onClickView:e.clickViewEvent,onClickViewParam:a,iconAssigned:!!a.assigned,iconCompleted:"closed"===a.status,note:a.note,onClickComplete:e.modifyEventStatus,onClickAssign:e.modifyEventAssign,eventDate:t.date})})))})):o.a.createElement("div",{className:"no-events-msg"},o.a.createElement("h3",null,"Welcome back \ud83d\ude04 "),o.a.createElement("p",null,"It looks like there aren't any events for this house! To add a new event, click the '+' sign below.")),o.a.createElement("div",null,o.a.createElement(I,{id:"add-event",icon:"fas fa-plus-circle fa-3x ",clickEvent:this.clickAddEvent})))))),o.a.createElement(R,{getHouseholdIdFunction:this.getHouseholdId,ref:this.modalRef}))}}]),t}(n.Component)),_=(a(51),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={firstName:a.props.firstName||"",lastName:a.props.lastName||"",email:a.props.email||"",showAddButton:a.props.showAddButton||!1},a.handleChangeFirstName=function(e){var t=e.target.value;a.setState({firstName:t}),a.updateParentMemberState("firstName",t)},a.handleChangeLastName=function(e){var t=e.target.value;a.setState({lastName:t}),a.updateParentMemberState("lastName",t)},a.handleChangeEmail=function(e){var t=e.target.value;a.setState({email:t}),a.updateParentMemberState("email",t)},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"updateParentMemberState",value:function(e,t){var a=this;this.props.currentParent.setState((function(n){return n.members[a.props.indexInState][e]=t,n}))}},{key:"render",value:function(){var e=this;return o.a.createElement(b,null,o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement("div",{className:"member-card"},o.a.createElement(S,null,o.a.createElement(y,{size:"md-4"},o.a.createElement("div",{className:"form-group firstName"},o.a.createElement("label",null,"First Name:"),o.a.createElement("input",{type:"text",className:"form-control",placeholder:"First Name",value:this.state.firstName,onChange:this.handleChangeFirstName,readOnly:this.props.readOnly}))),o.a.createElement(y,{size:"md-4"},o.a.createElement("div",{className:"form-group lastName"},o.a.createElement("label",null,"Last Name:"),o.a.createElement("input",{type:"text",className:"form-control",placeholder:"Last Name",value:this.state.lastName,onChange:this.handleChangeLastName,readOnly:this.props.readOnly})))),o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement("div",{className:"form-group email"},o.a.createElement("label",null,"Email:"),o.a.createElement("input",{type:"email",className:"form-control",placeholder:"Email",value:this.state.email,onChange:this.handleChangeEmail,readOnly:this.props.readOnly})))),o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement("div",{className:"buttons"},o.a.createElement("button",{className:"btn btn-sm btn-dark mr-1",onClick:function(t){e.props.removeSelf(t,e.props.indexInState)},hidden:this.props.readOnly,disabled:!this.props.removeSelf},o.a.createElement("i",{className:"fas fa-minus"})),o.a.createElement("button",{className:"btn btn-sm btn-dark",onClick:this.props.addNext,hidden:!this.state.showAddButton,disabled:!this.props.addNext},o.a.createElement("i",{className:"fas fa-plus"})))))))))}}]),t}(o.a.Component)),G=a(120),U=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={householdName:a.props.householdName||"",members:a.props.members,redirectToDashboard:!1,redirectToHomepage:!1},a.isCurrentUser=function(e){var t=Object(k.getLocalUserInfo)();if(!t)throw console.log("No current user!"),new Error("No user data in session storage.");return e===t.oauthKey},a.addMemberRow=function(e){e.preventDefault(),a.setState((function(e){return e.members.push({firstName:"",lastName:"",email:"",status:"invited"}),e}))},a.setIndex=function(e){return e},a.removeRow=function(e,t){e.preventDefault(),a.setState((function(e){return e.members[t].deleted=!0,e}))},a.handleChangeHouseholdName=function(e){var t=e.target.value;a.setState({householdName:t})},a.submitHouseForm=function(e){e.preventDefault(),!0===a.props.createMode?g.createHousehold({name:a.state.householdName}).then((function(e){a.setState({householdId:e.data._id}),sessionStorage.setItem("householdId",e.data._id),g.upsertMembers({members:a.state.members,householdId:e.data._id}).then((function(t){var n=[];t.data.newIds.forEach((function(e){e.userOauthKey&&a.isCurrentUser(e.userOauthKey)&&sessionStorage.setItem("userID",e._id),n.push(e._id)})),g.addHouseholdMembers({householdId:e.data._id,idsArray:n}).then((function(e){a.setState({redirectToDashboard:!0})})).catch((function(e){console.log(e)}))})).catch((function(e){console.log("error with create many members operation"),console.log(e)}))})).catch((function(e){console.log("ERROR with create household operation"),console.log(e)})):console.log("Update functionality not yet implemented!")},a.handleCancel=function(e){e.preventDefault(),console.log("hit handleCancel"),sessionStorage.clear(),console.log("hit handleCancel"),C.auth().signOut().then((function(){console.log("signout successful"),a.setState({redirectToHomepage:!0})}),(function(e){console.log(e)}))},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return this.state.redirectToDashboard?o.a.createElement(G.a,{to:"/dashboard"}):this.state.redirectToHomepage?o.a.createElement(G.a,{to:"/"}):o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement("form",null,o.a.createElement(S,null,o.a.createElement("div",{className:"justify-content-center",id:"signupTitle"},o.a.createElement(y,{size:"md-12"},o.a.createElement("h4",{className:"text-center"},this.props.createMode?"Create ":"Edit "," Household")))),o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement("div",{className:"form-group"},o.a.createElement("h5",null,"Enter a House Name")))),o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement("div",null,o.a.createElement("input",{type:"text",className:"form-control",id:"householdNameInput",placeholder:"Smith",onChange:this.handleChangeHouseholdName,value:this.state.householdName})))),o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement("h5",null,"Add/Edit Members "))),o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},this.state.members.map((function(t,a){if(!t.deleted)return o.a.createElement(_,{key:e.setIndex(a),firstName:t.firstName,lastName:t.lastName,email:t.email,readOnly:e.isCurrentUser(t.userOauthKey),showAddButton:!0,addNext:e.addMemberRow,indexInState:e.setIndex(a),removeSelf:e.removeRow,currentParent:e})})))),o.a.createElement(S,null,o.a.createElement("div",{id:"housebuttons"},o.a.createElement(y,{size:"md-12"},o.a.createElement("button",{className:"btn btn-success",id:"createbutton",onClick:this.submitHouseForm},this.props.createMode?"Create":"Update"),o.a.createElement("button",{className:"btn btn-danger",id:"cancelbutton",onClick:this.handleCancel},"Cancel")))))))}}]),t}(n.Component);U.defaultProps={householdName:""};var B=U,F=(a(106),function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=Object(k.getLocalUserInfo)();return o.a.createElement("section",null,o.a.createElement(b,null,o.a.createElement(B,{createMode:!0,householdName:e.lastName,members:[{userOauthKey:e.oauthKey,firstName:e.firstName,lastName:e.lastName,email:e.email,status:"full"}]})))}}]),t}(n.Component)),W=(a(52),a(57)),V=a.n(W),K=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).uiConfig={signInFlow:"redirect",signInSuccessUrl:"/dashboard",signInOptions:[C.auth.GoogleAuthProvider.PROVIDER_ID],callbacks:{signInSuccessWithAuthResult:function(e,t){sessionStorage.setItem("id",e.user.uid);var n=e.user.displayName,o=e.user.email;sessionStorage.setItem("email",o);var r=n.split(" "),s=r[0],l=r[1];sessionStorage.setItem("firstName",s),sessionStorage.setItem("lastName",l);var i={id:sessionStorage.getItem("id"),firstName:sessionStorage.getItem("firstName"),lastName:sessionStorage.getItem("lastName"),email:sessionStorage.getItem("email")};g.login(i).then((function(e){var t,n;200===e.status?(e.data[0]?(t=e.data[0]._id,n=e.data[0].households[0]):(t=e.data._id,n=e.data.households[0]),sessionStorage.setItem("userID",t),sessionStorage.setItem("householdId",n),a.props.parent.setState({redirectDashboard:!0})):204===e.status?a.props.parent.setState({redirectSignUp:!0}):console.log("Invalid status recieved from res:",e.status)})).catch((function(e){return console.log(e)}))}}},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(b,null,o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement(V.a,{uiConfig:this.uiConfig,firebaseAuth:C.auth()}))))}}]),t}(n.Component),q=a(60),J=(a(114),q.a.div({closed:{height:0},open:{height:"auto"}})),$=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={open:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state.open;return o.a.createElement(b,null,o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement("div",{className:"header"},o.a.createElement("h3",null,"Welcome to ParentTrap."),o.a.createElement("p",{className:"description"},"Designed to simplify your family's busy schedule.")))),o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},[{title:"How does it work?",body:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae dolorum eligendi iste excepturi vero nobis veritatis illum iusto minus, obcaecati, culpa dolores dicta aliquam. Quia beatae totam perspiciatis consectetur libero?"},{title:"How did this get started?",body:"After searching for ways to and coming up empty, an idea was sprouted to create an app to empower any family to stay on top of their busy schedule. This idea came to life when four software engineers put their minds together and the rest is history..."}].map((function(a,n){var r=a.title,s=a.body;return o.a.createElement("div",null,o.a.createElement("h2",{className:"title",onClick:function(){return e.setState({open:t!==n&&n})}},t===n?"-                               ":"+                               ",r),o.a.createElement(J,{className:"content",pose:t===n?"open":"closed"},o.a.createElement("div",{className:"content-wrapper"},s)))})))))}}]),t}(n.Component),Q=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={redirectDashboard:!1,redirectSignUp:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return this.state.redirectDashboard?(console.log("Redirect to dashboard"),o.a.createElement(G.a,{to:"/dashboard"})):this.state.redirectSignUp?(console.log("redirect to signup"),o.a.createElement(G.a,{to:"/signup"})):o.a.createElement("section",{id:"home-screen"},o.a.createElement(b,null,o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement($,null))),o.a.createElement(S,null,o.a.createElement(y,{size:"md-12"},o.a.createElement(K,{parent:this})))))}}]),t}(n.Component),Z=a(59),X=a(5),Y=(a(53),{apiKey:"AIzaSyC4cgBn3J_wiua8oGfpdHuCBtsrHy58Bnc",authDomain:"parent-trap-a7eed.firebaseapp.com",databaseURL:"https://parent-trap-a7eed.firebaseio.com",projectId:"parent-trap-a7eed",storageBucket:"parent-trap-a7eed.appspot.com",messagingSenderId:"122704905189",appId:"1:122704905189:web:a87d77d6555fa220d8e50c",measurementId:"G-B3K4D8QFS4"}),ee=X.initializeApp(Y),te=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(m.a,null,o.a.createElement("div",null,o.a.createElement(h.a,null,o.a.createElement(p.a,{exact:!0,path:"/",component:Q}),o.a.createElement(p.a,{exact:!0,path:"/dashboard",component:z}),o.a.createElement(p.a,{exact:!0,path:"/signup",component:F}))))}}]),t}(n.Component),ae=ee.auth(),ne={googleProvider:new X.auth.GoogleAuthProvider},oe=Object(Z.a)({providers:ne,firebaseAppAuth:ae})(te);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(oe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},25:function(e,t){e.exports={getLocalUserInfo:function(){return{firstName:sessionStorage.getItem("firstName"),lastName:sessionStorage.getItem("lastName"),email:sessionStorage.getItem("email"),oauthKey:sessionStorage.getItem("id"),memberId:sessionStorage.getItem("userID"),currentHouseholdId:sessionStorage.getItem("householdId")}}}},51:function(e,t,a){},52:function(e,t,a){},62:function(e,t,a){e.exports=a(115)},84:function(e,t,a){},85:function(e,t,a){},86:function(e,t,a){},96:function(e,t,a){},97:function(e,t,a){}},[[62,1,2]]]);
//# sourceMappingURL=main.ba0e5b3e.chunk.js.map