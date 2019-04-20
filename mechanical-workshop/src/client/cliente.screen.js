import React, { Component } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';

class ClientScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            client: {
                name: "",
                cpf: "",
                dateBirth: new Date(),
                genre: "MAS",
                civilStatus: "SOL",
                email: "",
                address: "",
                phone: "",
                active: true,
            }
        }
    }

    handleChangeClient = (event) => {
        var obj = Object.assign(this.state.client, { [event.target.name]: event.target.value })
        this.setState({client: obj})
    }

    onClickSaveForm = (event) => {
        event.preventDefault()
        console.log(this.state.client)
    }

    render() {
        return (
            <div style={{ marginTop: "15px" }}>
                <Col>
                    <h2>Cadastro de Cliente</h2>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        name="name"
                                        defaultValue={this.state.client.name}
                                        onChange={this.handleChangeClient}
                                        type="text" placeholder="Digite seu nome" />
                                </Form.Group>

                                <Form.Group controlId="formBasicCpf">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control
                                        name="cpf"
                                        defaultValue={this.state.client.cpf}
                                        onChange={this.handleChangeClient}
                                        type="text" placeholder="Digite seu CPF" />
                                </Form.Group>

                                <Form.Group controlId="formBasicDateBirth">
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control
                                        name="dateBirth"
                                        defaultValue={this.state.client.dateBirth}
                                        onChange={this.handleChangeClient}
                                        type="date" placeholder="Digite sua data de nascimento" />
                                </Form.Group>

                                <Form.Group controlId="formBasicGenre">
                                    <Form.Label>Genêro</Form.Label>
                                    <Form.Control as="select"
                                        name="genre"
                                        defaultValue={this.state.client.genre}
                                        onChange={this.handleChangeClient}>
                                        <option value="MAS">Masculino</option>
                                        <option value="FEM">Feminino</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicCivilStatus">
                                    <Form.Label>Estado Civil</Form.Label>
                                    <Form.Control as="select"
                                        name="civilStatus"
                                        defaultValue={this.state.client.civilStatus}
                                        onChange={this.handleChangeClient}>
                                        <option value="SOL">Solteiro</option>
                                        <option value="CAS">Casado</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check disabled="true" 
                                        name="active"
                                        value={this.state.client.active}
                                        onChange={this.handleChangeClient}
                                        type="checkbox" 
                                        label="Ativo" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        defaultValue={this.state.client.email}
                                        onChange={this.handleChangeClient}
                                        type="email" placeholder="Seu email" />
                                </Form.Group>
                                <Form.Group controlId="formBasicAddress">
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control
                                        name="address"
                                        defaultValue={this.state.client.address}
                                        onChange={this.handleChangeClient}
                                        type="text" placeholder="Digite seu Endereço" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPhone">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        name="phone"
                                        defaultValue={this.state.client.phone}
                                        onChange={this.handleChangeClient}
                                        type="number" placeholder="Digite seu número de telefone" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" onClick={this.onClickSaveForm} type="submit">
                            Salvar
                        </Button>
                    </Form>
                </Col>

            </div >
        );
    }
}

export default ClientScreen;