import React, { Component } from 'react';
import {Form, Button, Col, Row, Alert, Container} from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import EmployeeService from '../service/employee/employeeService'
import If from '../components/If'

class EmployeeScreen extends BaseScreen {
    constructor(props) {
        super(props)
        this.state = {
            employee: {
                name: "",
                cpf: "",
                email: "",
                phone: "",
                active: true,
            },
            isFormValid: false
        }
    }
    
    componentDidMount(){
        if (this.props.match.params.id)
            this.loadClient()
    }

    loadClient(){
        let obj = EmployeeService.findOne(this.props.match.params.id)
        if(obj) this.setState({obj})
    }

    handleChangeClient = (event) => {
        var obj = Object.assign(this.state.employee, { [event.target.name]: event.target.value })
        this.setState({ employee: obj })
    }

    onClickSaveForm = (event) => {
        event.preventDefault()
        EmployeeService.save(this.state.employee)
        this.setState({ isFormValid: true }, this.redirectToList())
    }

    redirectToList() {
        setTimeout(() => this.props.history.push("/funcionarios"), 1500)
    }


    render() {
        return (
            <div style={{ marginTop: "15px" }}>
                <Col>
                    <h2>Cadastro de Funcionários</h2>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        name="name"
                                        defaultValue={this.state.employee.name}
                                        onChange={this.handleChangeClient}
                                        type="text" placeholder="Digite seu nome" />
                                </Form.Group>

                                <Form.Group controlId="formBasicCpf">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control
                                        name="cpf"
                                        defaultValue={this.state.employee.cpf}
                                        onChange={this.handleChangeClient}
                                        type="text" placeholder="Digite seu CPF" />
                                </Form.Group>

                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check disabled="true"
                                        name="active"
                                        value={this.state.employee.active}
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
                                        defaultValue={this.state.employee.email}
                                        onChange={this.handleChangeClient}
                                        type="email" placeholder="Seu email" />
                                </Form.Group>
                                 <Form.Group controlId="formBasicPhone">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        name="phone"
                                        defaultValue={this.state.employee.phone}
                                        onChange={this.handleChangeClient}
                                        type="number" placeholder="Digite seu número de telefone" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <If test={this.state.isFormValid}>
                            <Alert key="alert-success" variant="success">
                                Funcionário salvo com sucesso!
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

export default EmployeeScreen;