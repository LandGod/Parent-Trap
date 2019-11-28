import React, { Component } from "react";
import { Container } from "../components/Grid/index.js";
import HouseHold from "../components/HouseHold";
class Signup extends Component {
    render() {
        return (
            <Container>
                <HouseHold 
                createMode={true}
                currentUserId={"5dd6ea9f6c0c7213542d089f"}
                members={[{
                    // Sandbox/Test Code (letting members be undefined crashes the react server)
                    _id: "5dd6ea9f6c0c7213542d089f",
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