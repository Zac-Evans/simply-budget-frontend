import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/loginComponents/Login";
import Register from "./components/loginComponents/Register";
import Income_Setup from "./components/accountCreation/Income-Setup";
import Bill_Setup from "./components/accountCreation/Bill-Setup";
import Category_Setup from "./components/accountCreation/Category-Setup";
import Dashboard from "./components/Dashboard";

export default class App extends Component {
  render() {
    if (!localStorage.getItem("userId")) {
      return (
        <Router>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
          <Redirect push to="/login" />
        </Router>
      );
    }
    return (
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/income-setup" component={Income_Setup} />
          <Route path="/bill-setup" component={Bill_Setup} />
          <Route path="/category-setup" component={Category_Setup} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}
