import React, { Component } from 'react';
import { Navbar, Nav, Link, Brand, Container } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';

class ClientScreen extends BaseScreen {
    render() {
        return (
            <div>
                <h2>Clientes</h2>
            </div>
        );
    }
}

export default ClientScreen;