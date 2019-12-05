import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "../Grid";
import './style.css';


class LoginText extends Component {

    render() {
        
        return (
            <Container>
                    <Row>
                        <Col size="md-12">
                            <div className="header">
                                <h3>Welcome to ParentTrap.</h3>
                                <p className="description">Designed to simplify your family's busy schedule.</p>
                            </div>
                        </Col>
                    </Row>
            </Container>
        );
    }
}

export default LoginText;