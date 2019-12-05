import React, { Component } from 'react';
import Button from "../Button/index";
import "./style.css";

class DashCard extends Component {

  state = {
    showmoreIcon: this.props.showmoreIcon,
  }

  // reset state if the seeded prop is updated
  // note: setting state from props can be considered
  // anti-pattern in react - but due to a design issue
  // with the layout of this component and its multi
  // effected show-more/show-less icon (changes if icon is 
  // toggled but also if rows are removed on the Unassigned event
  // page - thus this is necessary
  // until more time allows for a better solution
  componentWillReceiveProps(nextProps){
    if (nextProps.showmoreIcon !== this.props.showmoreIcon) {
      this.setState({ showmoreIcon: nextProps.showmoreIcon })
    }
  }

  // click show more/less event button -toggle the icon 
  clickShowMoreLessEvent = () => {
    // console.log(`you clicked the show more/less event button`);
    var newState = (this.state.showmoreIcon === "fas fa-angle-double-down fa-sm") 
    ? "fas fa-angle-double-up fa-sm" : "fas fa-angle-double-down fa-sm";

    this.setState({showmoreIcon: newState })
    var toggleAction = (newState === "fas fa-angle-double-up fa-sm") ? "show" : "hide";
    if(typeof this.props.onClickShowHide === 'function'){
      this.props.onClickShowHide(toggleAction, this.props.eventDate);
    }
  }

  render() {
    // console.log(`props: ${this.props.showmoreIcon}`)
    return (
      <div className="card ">
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


