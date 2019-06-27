import React, { Component } from 'react';
import { Form, Button, Col, Row, Alert, Container } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import ClientService from '../service/client/clientService'
import If from '../components/If'

class ClientScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            client: {
                name: "",
                cpf: "",
                dateBirth: "",
                genre: "MAS",
                civilStatus: "SOL",
                email: "",
                address: "",
                phone: "",
                active: true,
            },
            isFormValid: undefined
        }
    }

    componentDidMount() {
        if (this.props.match.params.id)
            this.loadClient()
    }

    loadClient() {
        let client = ClientService.findOne(this.props.match.params.id)
        if (client) this.setState({ client })
    }

    handleChangeClient = (event) => {
        var obj = Object.assign(this.state.client, { [event.target.name]: event.target.value })
        this.setState({ client: obj })
    }

    onClickSaveForm = (event) => {
        event.preventDefault()
        if (this.validate()) {
            ClientService.save(this.state.client)
            this.setState({ isFormValid: true }, this.redirectToList())
        }
    }

    validate() {
        let isFormValid = true
        let valuesForm = Object.values(this.state.client)
        if (valuesForm.some(v => !v)) {
            isFormValid = false
        }
        this.setState({ isFormValid })
        return isFormValid
    }

    redirectToList() {
        setTimeout(() => this.props.history.push("/clientes"), 1500)
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
                        <If test={this.state.isFormValid}>
                            <Alert key="alert-success" variant="success">
                                Cliente salvo com sucesso!
                            </Alert>
                        </If>
                        <If test={this.state.isFormValid === false}>
                            <Alert key="alert-danger" variant="danger">
                                Atenção! Preecha todos os campos corretamente antes de prosseguir
                            </Alert>
                        </If>
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