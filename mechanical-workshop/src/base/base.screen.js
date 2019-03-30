import React, { Component } from 'react';
import { Navbar, Nav, Link, Brand, Container } from 'react-bootstrap';

export class BaseScreen extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Container fluid="true">
                    {this.props.child}
                </Container>
            </div>
        );
    }
}
