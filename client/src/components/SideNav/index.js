import React, { Component } from "react";
import "./style.css";

class SideNav extends Component {

    state = {
        navWidth='0'
    };

    openNav = () => {
        this.setState({ navWidth: '250px' })
    };

    closeNav = () => {
        this.setState({ navWidth: '0' })
    };

    render() {
        return (

            <div id="mySidenav" class="sidenav" style={navWidth}>
                
                <a href="javascript:void(0)" class="closebtn" onclick={closeNav()}>&times;</a>
                <p>Side Nav example text</p>

            </div>

        )
    }
}

export default SideNav;