import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MenuBar from './components/MWMenuBar';
import './App.css';
import ClientScreen from './client/cliente.screen';
import EmployeeScreen from './employee/employee.screen';
import OfficeScreen from './office/office.screen';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <MenuBar/>
          <Switch>
            <Route path="/" exact={true} component={ClientScreen} />
            <Route path="/clientes" component={ClientScreen} />
            <Route path="/funcionarios" component={EmployeeScreen} />
            <Route path="/servicos" component={OfficeScreen} />
          </Switch>
        </ BrowserRouter>
    );
  }
}

export default App;
