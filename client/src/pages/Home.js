import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";


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
                    <Col size="md-12">
                        <p>Making your family's busy schedules a breeze.</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;