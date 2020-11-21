import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/loginComponents/Login";
import Register from "./components/loginComponents/Register";
import Income_Setup from "./components/accountCreation/Income-Setup";
import Bill_Setup from "./components/accountCreation/Bill-Setup";
import Category_Setup from "./components/accountCreation/Category-Setup";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Categories from "./components/Categories";
import "./css/App.css";

export default class App extends Component {
  render() {
    if (!localStorage.getItem("userId")) {
      return (
        <div>
          <Header />
          <Router>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
            <Redirect push to="/login" />
          </Router>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/income-setup" component={Income_Setup} />
            <Route path="/bill-setup" component={Bill_Setup} />
            <Route path="/category-setup" component={Category_Setup} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/categories" component={Categories} />
          </Switch>
        </Router>
      </div>
    );
  }
}
