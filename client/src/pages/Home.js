import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";
import "./style/Home.css";
import SignIn from "../components/Firebase/index";
import { Redirect } from "react-router-dom";
import LoginText from "../components/LoginText";

class Home extends Component {
  state = {
    redirectDashboard: false, // Set this to true to redirect to dashboard
    redirectSignUp: false, // Set this to true to redirect to signup flow
  };

  render() {
    if (this.state.redirectDashboard) {
      console.log("Redirect to dashboard");
      return <Redirect to="/dashboard" />;
    }

    if (this.state.redirectSignUp) {
      console.log('redirect to signup')
      return <Redirect to="/signup" />;
    }

    return (
      <Container>
          <Row>
            <Col size="md-12">
              <LoginText />
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <SignIn parent={this} />
            </Col>
          </Row>
      </Container>
    );
  }
}

export default Home;
