import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";
import "./style/Home.css";
import SignIn from "../components/Firebase/index"

class Home extends Component {
    render() {
        return (
            <Container>
                <div className="wrapper">
                    <Row>
                        <Col size="md-12">
                            <h1>ParentTrap</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="md-12">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga facere error quod voluptas repudiandae voluptate! Eos corporis ipsum, laudantium quod quam maxime eligendi nobis beatae illum, asperiores consequatur eaque iusto.</p>
                        </Col>
                    </Row>
                    <Row>
                        <SignIn />
                    </Row>
                </div>
            </Container>
        )
    }
}

export default Home;