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
                date: "",
                client: "",
                office: "",
                employee: "",
                active: true,
            },
            hours: [],
            clients: [],
            employees: [],
            offices: [],
            isFormValid: undefined
        }
    }

    async componentWillMount() {
        if (this.props.match.params.id)
            this.loadOffice()

        await this.loadClients()
        await this.loadEmployees()
        await this.loadOffices()
    }

    componentDidMount() {
        this.loadHours()
    }

    loadOffice() {
        let obj = ScheduleService.findOne(this.props.match.params.id)
        if (obj) this.setState({ schedule: obj })
    }

    handleChangeSchedule = async (event) => {
        if (event.target.name === "employee") {
            this.loadHours();
        }
        var obj = Object.assign(this.state.schedule, { [event.target.name]: event.target.value })
        this.setState({ schedule: obj })
    }

    onClickSaveForm = (event) => {
        let schedule = this.state.schedule;
        event.preventDefault()
        if (this.validate()) {
            this.updateSchedulesEmployee(schedule)
            ScheduleService.save(schedule)
            this.setState({ isFormValid: true }, this.redirectToList())
        }
    }

    updateSchedulesEmployee(schedule) {
        console.log("updateSchedulesEmployee", schedule)
        let employee = EmployeeService.findOne(schedule.office)
        let schedules = employee["schedules"] = employee.schedules ? employee.schedules : []
        console.log("Schedules employee", schedules);
        schedules.push(schedule)
        EmployeeService.save(employee)
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

    async loadHours() {
        let employee = EmployeeService.findOne(this.state.schedule.employee)
        let result = ScheduleService.getListHoursByEmployee(employee)
        await this.setState({ hours: result })
    }

    validate() {
        let isFormValid = true
        let valuesForm = Object.values(this.state.schedule)
        if (valuesForm.some(v => !v)) {
            isFormValid = false
        }
        this.setState({ isFormValid })
        return isFormValid
    }

    redirectToList() {
        setTimeout(() => this.props.history.push("/agendamentos"), 1500)
    }

    formatHour(hour) {
        return `${hour}:00`
    }

    render() {
        return (
            <div style={{ marginTop: "15px" }}>
                <Col>
                    <h2>Agendar horário</h2>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicEmployee">
                                    <Form.Label>Funcionário</Form.Label>
                                    <Form.Control as="select"
                                        name="employee"
                                        defaultValue={1}
                                        onChange={this.handleChangeSchedule}>
                                            <option value={null}>Selecione..</option>
                                        {this.state.employees.map((employee) =>
                                            <option value={employee.id}>{employee.name}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicDate">
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control
                                        name="date"
                                        defaultValue={this.state.schedule.date}
                                        onChange={this.handleChangeSchedule}
                                        type="date" />
                                </Form.Group>

                                <Form.Group controlId="formBasicHour">
                                    <Form.Label>Horário</Form.Label>
                                    <Form.Control as="select"
                                        name="hour"
                                        defaultValue={this.state.hours[0]}
                                        onChange={this.handleChangeSchedule}>
                                            <option value={null}>Selecione..</option>
                                        {this.state.hours.map((hour) =>
                                            <option value={hour}>{this.formatHour(hour)}</option>
                                            )}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicClient">
                                    <Form.Label>Cliente</Form.Label>
                                    <Form.Control as="select"
                                        name="client"
                                        onChange={this.handleChangeSchedule}>
                                            <option value={null}>Selecione..</option>
                                        {this.state.clients.map((client) =>
                                            <option value={client.id}>{client.name}</option>
                                            )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicOffice">
                                    <Form.Label>Serviço</Form.Label>
                                    <Form.Control as="select"
                                        name="office"
                                        onChange={this.handleChangeSchedule}>
                                            <option value={null}>Selecione..</option>
                                        {this.state.offices.map((office) =>
                                            <option value={office.id}>{office.description}</option>
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

export default ScheduleScreen;