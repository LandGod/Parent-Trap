import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";
import "./Home.css";
import LoginWithGoogle from "../components/Firebase/index"

class Home extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <h1>ParentTrap</h1>
                    </Col>
                </Row>
                <Row>
                    < LoginWithGoogle />
                </Row>

            </Container>
        )
    }
}

export default Home