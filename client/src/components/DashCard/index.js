import React, { Component } from 'react';
import Button from "../Button/index";
import "./style.css";

class DashCard extends Component {


  // click show more/less event button
  clickShowMoreLessEvent = () => {
    console.log(`you clicked the show more/less event button`);
  }

  render() {
    return (
      <div className="card mt-4">
        <div className={`card-header ${this.props.firstdashcard}`}>
          <h3>
            <i className={this.props.icon} 
                aria-hidden="true" /> {this.props.title}
            <Button id={this.props.id} icon={this.props.showmoreIcon} clickEvent={this.clickShowMoreLessEvent}title=""></Button>
          </h3>
        </div>
        <div className="card-body-fluid">{this.props.children}</div>
    </div>
    )
  }
}

export default DashCard


