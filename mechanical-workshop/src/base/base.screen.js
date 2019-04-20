import React, { Component } from 'react';
import { Col, Container } from 'react-bootstrap';

export class BaseScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container fluid="true">
                    <div>
                        {this.props.child}
                    </div>
                </Container>
            </div>
        );
    }
}
