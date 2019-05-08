import React, { Component } from 'react';
import { Navbar, Nav, Link, Brand } from 'react-bootstrap';
import { Link as LinkRoute } from 'react-router-dom'

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
                        <Nav.Link>
                            <LinkRoute to="/servicos">Serviços</LinkRoute>
                        </Nav.Link>
                        <Nav.Link>
                            <LinkRoute to="/agendamentos">Agendamentos</LinkRoute>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MWMenuBar;