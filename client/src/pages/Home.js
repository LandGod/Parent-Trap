import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid/index.js";
import "./style/Home.css";
import SignIn from "../components/Firebase/index";
import { Redirect } from "react-router-dom";
import LoginText from "../components/LoginText";
import posed from "react-pose";

const Content = posed.div({
  closed: { 
      height: 0,
   },
  open: { 
      height: 'auto',
  }
});

class Home extends Component {
  state = {
    redirectDashboard: false, // Set this to true to redirect to dashboard
    redirectSignUp: false, // Set this to true to redirect to signup flow
    open: false // this controls opening and closing the questions
  };

  render() {
    const { open } = this.state;

        let instructions = [{
            title: "How does it work?",
            body: "Simply create a household, add members, and begin populating and taking control of your family's to-do list. *drops mic*"
        }, {
            title: "How did this get started?",
            body: "After searching for ways to easily organize a family's to-do list and coming up empty, four software engineers put their minds together and the rest is history..."
        }]

    if (this.state.redirectDashboard) {
      console.log("Redirect to dashboard");
      return <Redirect to="/dashboard" />;
    }

    if (this.state.redirectSignUp) {
      console.log('redirect to signup')
      return <Redirect to="/signup" />;
    }

    return (
      <section id="home-screen">
        <Container>
            <Row>
              <Col size="md-12">
                <LoginText />
              </Col>
            </Row>
            <div id="gray-card">
            <Row>
              <Col size="md-12">
              <div id="faqs">
                  {instructions.map(({ title, body }, i) => (
                      <div>
                          <h2 className="title" onClick={() => this.setState({ open: open === i ? false : i })}>
                              {title}  
                              {open === i ? <i class="fas fa-angle-double-down icon"></i> : <i class="fas fa-angle-double-up icon"></i>}
                          </h2>
                          <Content className="content" pose={open === i ? 'open' : 'closed'}>
                              <div className="content-wrapper">{body}</div>
                          </Content>
                      </div>
                  ))}
                  </div>
              </Col>
            </Row>
            <Row>
              <Col size="md-12">
                <div id="button"> 
                  <SignIn parent={this} />
                </div>
              </Col>
            </Row>
            </div>
        </Container>
      </section>
    );
  }
}

export default Home;
