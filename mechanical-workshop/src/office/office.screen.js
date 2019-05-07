import React, { Component } from 'react';
import { Form, Button, Col, Row, Alert, Container } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import OfficeService from '../service/office/officeService'
import If from '../components/If'

class OfficeScreen extends BaseScreen {
    constructor(props) {
        super(props)
        this.state = {
            office: {
                description: "",
                active: true,
            },
            isFormValid: false
        }
    }

    componentDidMount() {
        if (this.props.match.params.id)
            this.loadOffice()
    }

    loadOffice() {
        let obj = OfficeService.findOne(this.props.match.params.id)
        if (obj) this.setState({ office: obj })
    }

    handleChangeClient = (event) => {
        var obj = Object.assign(this.state.office, { [event.target.name]: event.target.value })
        this.setState({ office: obj })
    }

    onClickSaveForm = (event) => {
        event.preventDefault()
        OfficeService.save(this.state.office)
        this.setState({ isFormValid: true }, this.redirectToList())
    }

    redirectToList() {
        setTimeout(() => this.props.history.push("/servicos"), 1500)
    }

    render() {
        return (
            <div style={{ marginTop: "15px" }}>
                <Col>
                    <h2>Cadastro de Serviços</h2>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicDescription">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        name="description"
                                        defaultValue={this.state.office.description}
                                        onChange={this.handleChangeClient}
                                        type="text" placeholder="Digite uma descrição" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <If test={this.state.isFormValid}>
                            <Alert key="alert-success" variant="success">
                                Serviço salvo com sucesso!
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

export default OfficeScreen;