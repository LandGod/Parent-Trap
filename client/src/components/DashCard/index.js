import React, { Component } from 'react';
import Button from "../Button/index";
import "./style.css";

class DashCard extends Component {

  state = {
    showmoreIcon: this.props.showmoreIcon,
  }

  // click show more/less event button
  // toggle the icon - also need CSS to open or close the div to show or hide the
  // events beyond the 3rd event
  clickShowMoreLessEvent = () => {
    console.log(`you clicked the show more/less event button`);
    var newState = (this.state.showmoreIcon === "fas fa-angle-double-down fa-lg") 
    ? "fas fa-angle-double-up fa-lg" : "fas fa-angle-double-down fa-lg";
    if (newState === "fas fa-angle-double-up fa-lg") {
      console.log(`Here is where CSS/classes needs to close the div to show only 3 events`);
    } else {
      console.log(`Here is where CSS/classes needs to open the div to show more than 3 events`);
    };
    this.setState({showmoreIcon: newState })
    var toggleAction = (newState === "fas fa-angle-double-up fa-lg") ? "show" : "hide";
    if(typeof this.props.onClickShowHide === 'function'){
      this.props.onClickShowHide(toggleAction, this.props.eventDate);
    }
  }

  render() {
    return (
      <div className="card mt-4">
        <div className={`card-header ${this.props.firstdashcard}`}>
          <h3>
            <i className={this.props.icon} 
                aria-hidden="true" /> {this.props.title}
            <Button id={this.props.id} icon={this.state.showmoreIcon} clickEvent={this.clickShowMoreLessEvent}title=""></Button>
          </h3>
        </div>
        <div className="card-body-fluid">{this.props.children}</div>
    </div>
    )
  }
}

export default DashCard


