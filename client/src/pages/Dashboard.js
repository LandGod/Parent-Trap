import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";

class Dashboard extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <h1>This is the dashboard page</h1>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Dashboard;