import React, { Component } from 'react';
import { Form, Button, Col, Row, Alert, Container } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import ClientService from '../service/client/clientService'
import OfficeService from '../service/office/officeService'
import EmployeeService from '../service/employee/employeeService'
import ScheduleService from '../service/schedule/scheduleService'
import If from '../components/If'

class ScheduleScreen extends BaseScreen {
    constructor(props) {
        super(props)
        this.state = {
            schedule: {
                hour: "",
                date: new Date(),
                profissional: {},
                client: {},
                office: {},
                active: true,
            },
            clients: [],
            employees: [],
            offices: [],
            isFormValid: false
        }
    }

    async componentDidMount() {
        if (this.props.match.params.id)
            this.loadOffice()

        await this.loadClients()
        await this.loadEmployees()
        await this.loadOffices()
    }

    loadOffice() {
        let obj = ScheduleService.findOne(this.props.match.params.id)
        if (obj) this.setState({ schedule: obj })
    }

    handleChangeSchedule = (event) => {
        console.log("VALUE: ", event.target.value);
        var obj = Object.assign(this.state.schedule, { [event.target.name]: event.target.value })
        this.setState({ office: obj })
    }

    onClickSaveForm = (event) => {
        event.preventDefault()
        ScheduleService.save(this.state.schedule)
        this.setState({ isFormValid: true }, this.redirectToList())
    }

    async loadClients() {
        await this.setState({ clients: ClientService.findAll() })
    }

    async loadEmployees() {
        await this.setState({ employees: EmployeeService.findAll() })
    }

    async loadOffices() {
        await this.setState({ offices: OfficeService.findAll() })
    }

    redirectToList() {
        setTimeout(() => this.props.history.push("/agendamentos"), 1500)
    }

    render() {
        return (
            <div style={{ marginTop: "15px" }}>
                <Col>
                    <h2>Agendar horário</h2>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicHour">
                                    <Form.Label>Horário</Form.Label>
                                    <Form.Control
                                        name="hour"
                                        defaultValue={this.state.schedule.hour}
                                        onChange={this.handleChangeSchedule}
                                        type="text"
                                        placeholder="Digite uma horário" />
                                </Form.Group>
                                <Form.Group controlId="formBasicDate">
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control
                                        name="date"
                                        defaultValue={this.state.schedule.date}
                                        onChange={this.handleChangeSchedule}
                                        type="date" />
                                </Form.Group>
                                <Form.Group controlId="formBasicClient">
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control as="select"
                                        name="client"
                                        defaultValue={this.state.clients[0]}
                                        onChange={this.handleChangeSchedule}>
                                        {this.state.clients.map((client) =>
                                            <option value={client.id}>{client.name}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicOffice">
                                    <Form.Label>Serviço</Form.Label>
                                    <Form.Control as="select"
                                        name="office"
                                        defaultValue={this.state.offices[0]}
                                        onChange={this.handleChangeSchedule}>
                                        {this.state.offices.map((office) =>
                                            <option value={office.id}>{office.description}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmployee">
                                    <Form.Label>Funcionário</Form.Label>
                                    <Form.Control as="select"
                                        name="employee"
                                        defaultValue={this.state.employees[0]}
                                        onChange={this.handleChangeSchedule}>
                                        {this.state.employees.map((employee) =>
                                            <option value={employee.id}>{employee.name}</option>
                                        )}
                                    </Form.Control>
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

export default ScheduleScreen;