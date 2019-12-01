import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "../Grid";
import posed from "react-pose";
import './style.css';

const Content = posed.div({
    closed: { 
        height: 0,
     },
    open: { 
        height: 'auto',
    }
});

class LoginText extends Component {
    state = { open: false }

    render() {
        const { open } = this.state;

        let instructions = [{
            title: "How does it work?",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae dolorum eligendi iste excepturi vero nobis veritatis illum iusto minus, obcaecati, culpa dolores dicta aliquam. Quia beatae totam perspiciatis consectetur libero?"
        }, {
            title: "How did this get started?",
            body: "After searching for ways to and coming up empty, an idea was sprouted to create an app to empower any family to stay on top of their busy schedule. This idea came to life when four software engineers put their minds together and the rest is history..."
        }]
    
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
                    <Row>
                        <Col size="md-12">
                            {instructions.map(({ title, body }, i) => (
                                <div>
                                    <h2 className="title" onClick={() => this.setState({ open: open === i ? false : i })}>
                                        {open === i ? "-                               " : "+                               "}
                                        {title}  
                                    </h2>
                                    <Content className="content" pose={open === i ? 'open' : 'closed'}>
                                        <div className="content-wrapper">{body}</div>
                                    </Content>
                                </div>
                            ))}
                        </Col>
                    </Row>
            </Container>
        );
    }
}

export default LoginText;