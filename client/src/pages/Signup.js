import React, { Component } from "react";
import { Container } from "../components/Grid/index.js";
import HouseHold from "../components/HouseHold";
class Signup extends Component {
    render() {
        return (
            <Container>
                <HouseHold 
                createMode={true}
                members={[{
                    // Sandbox/Test Code (letting members be undefined crashes the react server)
                    firstName: 'James',
                    lastName: 'Holden',
                    email: 'testUser@roci.org',
                    status: 'full'

                }]}
                />
            </Container>
        )
    }
}

export default Signup;