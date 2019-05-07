import React, { Component } from 'react';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import { Link as LinkRoute } from 'react-router-dom'
import EmployeeService from '../service/employee/employeeService'

class EmployeeListScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            clients: [],
            isInactives: true,
        }
    }

    componentDidMount() {
        this.loadClients()
    }

    handleChange = async (event) => {
        await this.setState({ isInactives: event.target.value == "INA" })
        await this.loadClients(this.state.isInactives)
    }

    loadClients(isInactives) {
        let clients = EmployeeService.findByInactive(isInactives)
        this.setState({ clients: clients })
    }

    loadClient(id) {
        this.props.history.push(`/funcionario/${id}`)
    }

    onClickDeleteClient(id) {
        EmployeeService.delete(id)
        this.loadClients()
    }

    render() {
        return (
            <div>
                <Col>
                    <div style={{ marginTop: "20px" }}>
                        <h2 className="">Funcionários</h2>
                        <Form.Group controlId="formBasicFilter" className="float-left">
                            <Form.Label>Situação</Form.Label>
                            <Form.Control as="select"
                                name="filter"
                                defaultValue={this.state.isInactives}
                                onChange={this.handleChange}>
                                <option value="ATI">Ativo</option>
                                <option value="INA">Inativo</option>
                            </Form.Control>
                        </Form.Group>
                        <LinkRoute to="/funcionario">
                            <Button variant="primary" className="float-right">
                                Novo Cliente
                            </Button>
                        </LinkRoute>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Ativo</th>
                                <th>Ações</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clients.map((client) =>
                                <tr>
                                    <td onClick={() => this.loadClient(client.id)}
                                        style={{ cursor: "pointer" }}>
                                        {client.id}
                                    </td>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.cpf}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.active ? "Sim" : "Não"}</td>
                                    <td style={{ width: "10px" }}>
                                        <Button variant="danger" size="sm"
                                            onClick={() => this.onClickDeleteClient(client.id)}>
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </div>
        );
    }
}

export default EmployeeListScreen