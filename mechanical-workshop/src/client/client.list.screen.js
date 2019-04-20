import React, { Component } from 'react';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';

class ClientListScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            clients: [
                {
                    active: true,
                    address: "",
                    civilStatus: "SOL",
                    cpf: "03441192036",
                    dateBirth: "Fri Apr 19 2019 20:02:52",
                    email: "arthur@gmail.com",
                    genre: "MAS",
                    name: "Arthur",
                    phone: "5199087340",
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Col>  
                    <div style={{marginTop: "20px"}}>
                        <h2 className="float-left">Clientes</h2>
                        <Button variant="primary" className="float-right">
                            Novo Cliente
                        </Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clients.map((client) =>
                                <tr>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.cpf}</td>
                                    <td>{client.phone}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </div>
        );
    }
}

export default ClientListScreen