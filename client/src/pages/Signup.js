import React, { Component } from "react";
import { Container } from "../components/Grid/index.js";
import HouseHold from "../components/HouseHold";
class Signup extends Component {
    render() {
        return (
            <Container>
                <HouseHold createMode={true}/>
            </Container>
        )
    }
}

export default Signup;