import React, { Component } from 'react';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import { Link as LinkRoute } from 'react-router-dom'
import OfficeService from '../service/office/officeService'

class OfficeListScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            offices: [],
            isInactives: true,
        }
    }

    componentDidMount() {
        this.loadOffices()
    }

    handleChange = async (event) => {
        await this.setState({ isInactives: event.target.value == "INA" })
        await this.loadOffices(this.state.isInactives)
    }

    loadOffices(isInactives) {
        let offices = OfficeService.findByInactive(isInactives)
        console.log("offices: ", offices);
        this.setState({ offices: offices })
    }

    loadOffice(id) {
        this.props.history.push(`/servico/${id}`)
    }

    onClickDeleteOffice(id) {
        OfficeService.delete(id)
        this.loadOffices()
    }

    render() {
        return (
            <div>
                <Col>
                    <div style={{ marginTop: "20px" }}>
                        <h2 className="">Serviços</h2>
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
                        <LinkRoute to="/servico">
                            <Button variant="primary" className="float-right">
                                Novo Serviço
                            </Button>
                        </LinkRoute>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Ativo</th>
                                <th>Ações</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.offices.map((office) =>
                                <tr>
                                    <td onClick={() => this.loadOffice(office.id)}
                                        style={{ cursor: "pointer" }}>
                                        {office.id}
                                    </td>
                                    <td>{office.description}</td>
                                    <td>{office.active ? "Sim" : "Não"}</td>
                                    <td style={{ width: "10px" }}>
                                        <Button variant="danger" size="sm"
                                            onClick={() => this.onClickDeleteOffice(office.id)}>
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

export default OfficeListScreen