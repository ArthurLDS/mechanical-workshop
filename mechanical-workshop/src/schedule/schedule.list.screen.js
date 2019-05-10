import React, { Component } from 'react';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import { Link as LinkRoute } from 'react-router-dom'
import ScheduleService from '../service/schedule/scheduleService'
import EmployeeService from '../service/employee/employeeService'
import ClientService from '../service/client/clientService'

class ScheduleListScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            schedules: [],
            isInactives: true,
            filterDate: "",
            filterClient: "",
            clients: [{name: ""}],
        }
    }

    async componentWillMount(){
        await this.loadClients()
    }

    componentDidMount() {
        this.loadSchedules()
    }

    handleChange = async (event) => {
        await this.setState({ [event.target.name]: event.target.value })
        await this.loadSchedules(this.state.filterDate, this.state.filterClient)
    }

    loadSchedules(filterDate, filterClient) {
        let schedules = ScheduleService.findByDateAndClient(filterDate, filterClient)
        console.log("agendamentos: ", schedules);
        this.setState({ schedules: schedules })
    }

    loadSchedule(id) {
        this.props.history.push(`/agendamento/${id}`)
    }

    onClickDeleteSchedule(id) {
        ScheduleService.delete(id)
        this.loadSchedules()
    }

    formatHour(hour) {
        return `${hour}:00`
    }

    formatDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    }

    loadEmployee(id) {
        return EmployeeService.findOne(id)
    }

    loadClient(id) {
        return ClientService.findOne(id)
    }

    async loadClients() {
        let clients = ClientService.findAll();
        console.log(clients)
        await this.setState({ clients: clients })
    }

    render() {
        return (
            <div>
                <Col>
                    <div style={{ marginTop: "20px" }}>
                        <h2 className="">Agendamentos</h2>

                        <Row>
                            <Form.Group controlId="formFilterDate" className="col-md-4">
                                <Form.Label>Data do agendamento</Form.Label>
                                <Form.Control
                                    name="filterDate"
                                    id="filterDate"
                                    value={this.state.filterDate}
                                    onChange={this.handleChange}
                                    type="date" />
                            </Form.Group>

                            <Form.Group controlId="formFilterClient" className="col-md-4">
                                <Form.Label>Cliente</Form.Label>
                                <Form.Control as="select"
                                    name="filterClient"
                                    defaultValue={this.state.filterClient}
                                    onChange={this.handleChange}>
                                    <option value={""}>Selecione...</option>
                                    {this.state.clients.map((client) =>
                                        <option value={client.id}>{client.name}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <LinkRoute to="/agendamento">
                            <Button variant="primary" className="float-right" style={{marginBottom: "15px"}}>
                                Novo agendamento
                            </Button>
                        </LinkRoute>

                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Horário</th>
                                <th>Data</th>
                                <th>Cliente</th>
                                <th>Funcionário</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.schedules.map((schedule) =>
                                <tr>
                                    <td onClick={() => this.loadSchedule(schedule.id)}
                                        style={{ cursor: "pointer" }}>
                                        {schedule.id}
                                    </td>
                                    <td>{this.formatHour(schedule.hour)}</td>
                                    <td>{this.formatDate(schedule.date)}</td>
                                    <td>{this.loadClient(schedule.client).name}</td>
                                    <td>{this.loadEmployee(schedule.employee).name}</td>
                                    <td style={{ width: "10px" }}>
                                        <Button variant="danger" size="sm"
                                            onClick={() => this.onClickDeleteSchedule(schedule.id)}>
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

export default ScheduleListScreen