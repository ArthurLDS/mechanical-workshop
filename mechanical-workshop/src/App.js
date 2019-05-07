import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MenuBar from './components/MWMenuBar';
import './App.css';
import ClientScreen from './client/cliente.screen';
import ClientListScreen from './client/client.list.screen';
import EmployeeScreen from './employee/employee.screen';
import EmployeeListScreen from './employee/employee.list.screen';
import OfficeScreen from './office/office.screen';
import OfficeListScreen from './office/office.list.screen';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MenuBar />
        <Switch>
          <Route path="/" exact={true} component={ClientScreen} />
          <Route path="/cliente/:id?" component={ClientScreen} />
          <Route path="/clientes/:id?" component={ClientListScreen} />
          <Route path="/funcionario/:id?" component={EmployeeScreen} />
          <Route path="/funcionarios/:id?" component={EmployeeListScreen} />          
          <Route path="/servico/:id?" component={OfficeScreen} />
          <Route path="/servicos/:id?" component={OfficeListScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
