import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MenuBar from './components/MWMenuBar';
import './App.css';
import ClientScreen from './client/cliente.screen';
import EmployeeScreen from './employee/employee.screen';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuBar />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={ClientScreen} />
            <Route path="/clientes" component={ClientScreen} />
            <Route path="/funcionarios" component={EmployeeScreen} />

          </Switch>
        </ BrowserRouter>
      </div>
    );
  }
}

export default App;
