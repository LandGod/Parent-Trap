import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";
import "./style/Home.css";
import SignIn from "../components/Firebase/index";
import { Redirect } from "react-router-dom";

class Home extends Component {
  state = {
    redirectDashboard: false, // Set this to true to redirect to dashboard
    redirectSignUp: false, // Set this to true to redirect to signup flow
    loading: false
  };

  // Used to display a loading message after login, but before redirect
  setLoadingStatus = () => {
      this.setState({loading: true})
  };

  render() {
    if (this.state.redirectDashboard) {
      console.log("Redirect to dahsbard");
      return <Redirect to="/dashboard" />;
    }

    if (this.state.redirectSignUp) {
      return <Redirect to="/signup" />;
    }

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
              <p>Welcome to parent trap!</p>
            </Col>
          </Row>
          <Row>
            <SignIn parent={this} />
            <p hidden={this.state.loading}>Redirecting you now...</p>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Home;
