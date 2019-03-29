import React, { Component } from 'react';
import { Navbar, Nav, Link, Brand } from 'react-bootstrap';
import { LinkRoute } from 'react-router-dom/Link'

class MWMenuBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" className="nav-bar">
                    <Navbar.Brand href="#home">Oficina Mecânica</Navbar.Brand>
                    <Nav className="mr-auto float-sm-right">
                        <Nav.Link>
                            <LinkRoute to="/clientes">Clientes</LinkRoute>
                        </Nav.Link>
                        <Nav.Link>
                            <LinkRoute to="/funcionarios">Funcionários</LinkRoute>
                        </Nav.Link>
                        <Nav.Link href="#home">Serviços</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MWMenuBar;