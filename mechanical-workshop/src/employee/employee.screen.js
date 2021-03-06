import React, { Component } from 'react';
import {Form, Button, Col, Row, Alert, Container} from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import EmployeeService from '../service/employee/employeeService'
import If from '../components/If'
import MasksService from '../utils/masks'

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
            isFormValid: undefined
        }
    }
    
    componentDidMount(){
        if (this.props.match.params.id)
            this.loadClient()
    }

    loadClient(){
        let obj = EmployeeService.findOne(this.props.match.params.id)
        if(obj) this.setState({employee: obj})
    }

    handleChangeClient = (event) => {
        var obj = Object.assign(this.state.employee, { [event.target.name]: event.target.value })
        this.setState({ employee: obj })
    }

    onClickSaveForm = (event) => {
        event.preventDefault()
        if(this.validate()){
            EmployeeService.save(this.state.employee)
            this.setState({ isFormValid: true }, this.redirectToList())
        }
    }

    validate() {
        let isFormValid = true
        let valuesForm = Object.values(this.state.employee)
        if (valuesForm.some(v => !v)) {
            isFormValid = false
        }
        this.setState({ isFormValid })
        return isFormValid
    }

    formatPhone = (event) => {
        event.target.value = MasksService.formatPhone(event.target.value)
    }

    formatCpf = (event) => {
        event.target.value = MasksService.formatCPF(event.target.value)
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
                                        onKeyPress={this.formatCpf}
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
                                        onKeyPress={this.formatPhone}
                                        defaultValue={this.state.employee.phone}
                                        onChange={this.handleChangeClient}
                                        type="text" placeholder="Digite seu número de telefone" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <If test={this.state.isFormValid}>
                            <Alert key="alert-success" variant="success">
                                Funcionário salvo com sucesso!
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

export default EmployeeScreen;