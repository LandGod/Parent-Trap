import React, { Component } from 'react';
import Button from "../Button/index";
import "./style.css";

class DashCard extends Component {

  render() {
    return (
      <div className="card mt-4 dashcard">
        <div className="card-header">
          <h3>
            <i className={this.props.icon} 
                aria-hidden="true" /> {this.props.title}
            <Button id={this.props.id} icon={this.props.showmoreIcon} title=""></Button>
          </h3>
        </div>
        <div className="card-body-fluid">{this.props.children}</div>
    </div>
    )
  }
}

export default DashCard


