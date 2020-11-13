import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";

export default class App extends Component {
  render() {
    return (
      <Router>
        <ul>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </ul>

        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}
