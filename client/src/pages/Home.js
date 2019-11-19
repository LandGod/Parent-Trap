import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";
import "./Home.css";


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
                        <div class="card">
                            <div class="card-body">
                                This is some text within a card body.
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;