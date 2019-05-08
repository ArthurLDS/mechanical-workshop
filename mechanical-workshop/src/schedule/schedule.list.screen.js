import React, { Component } from 'react';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { BaseScreen } from '../base/base.screen';
import { Link as LinkRoute } from 'react-router-dom'
import ScheduleService from '../service/schedule/scheduleService'

class ScheduleListScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            schedules: [],
            isInactives: true,
        }
    }

    componentDidMount() {
        this.loadSchedules()
    }

    handleChange = async (event) => {
        await this.setState({ isInactives: event.target.value == "INA" })
        await this.loadSchedules(this.state.isInactives)
    }

    loadSchedules(isInactives) {
        let schedules = ScheduleService.findByInactive(isInactives)
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

    render() {
        return (
            <div>
                <Col>
                    <div style={{ marginTop: "20px" }}>
                        <h2 className="">Agendamentos</h2>
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
                        <LinkRoute to="/agendamento">
                            <Button variant="primary" className="float-right">
                                Novo agendamento
                            </Button>
                        </LinkRoute>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data</th>
                                <th>Horário</th>
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
                                    <td>{schedule.hour}</td>
                                    <td>{schedule.date}</td>
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