import React, { Component } from "react";
import "./style.css";

class SideNav extends Component {

    state = {
        open: true,
        navWidth: {'width': '250px'}
    };

    openNav = () => {
        this.setState({ navWidth: {'width': '250px'}, open: true })
    };

    closeNav = () => {
        this.setState({ navWidth: {'width': '0'}, open: false })
    };

    render() {
        return (
            
            <div id="mySidenav" className="sidenav" style={this.state.navWidth}>

                <a className="closebtn" onClick={this.closeNav}>&times;</a>
                <a>A Link</a>
                <a>Another Link</a>
                <a>Link 3</a>

            </div>

        )
    }
}

export default SideNav;