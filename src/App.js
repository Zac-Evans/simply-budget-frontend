import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/loginComponents/Login";
import Register from "./components/loginComponents/Register";
import Income_Setup from "./components/accountCreation/Income-Setup";
import Bill_Setup from "./components/accountCreation/Bill-Setup";
import Category_Setup from "./components/accountCreation/Category-Setup";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import "./css/App.css";
import TransactionList from "./components/TransactionList";
import CarouselApp from "./components/CarouselApp";
import Account from "./components/loginComponents/Account";
import Categories from "./components/Categories";
import SiteFooter from "./components/SiteFooter";
import Attributions from "./components/Attributions";

export default class App extends Component {
  render() {
    if (!localStorage.getItem("userId")) {
      return (
        <div style={{ minHeight: "100vh", position: "relative" }}>
          {window.location.pathname !== "/" &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/register" &&
            window.location.pathname !== "/income-setup" &&
            window.location.pathname !== "/bill-setup" &&
            window.location.pathname !== "/category-setup" && <Header />}

          <Router>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={CarouselApp} />
              <Route exact path="/attributions" component={Attributions} />
            </Switch>
          </Router>
          <SiteFooter />
        </div>
      );
    }
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        {window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/income-setup" &&
          window.location.pathname !== "/bill-setup" &&
          window.location.pathname !== "/category-setup" && <Header />}

        <Router>
          <Switch>
            <Route exact path="/" component={CarouselApp} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/income-setup" component={Income_Setup} />
            <Route path="/bill-setup" component={Bill_Setup} />
            <Route path="/category-setup" component={Category_Setup} />
            <Route exact path="/dashboard/account" component={Account} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/dashboard/transactions"
              component={TransactionList}
            />
            <Route exact path="/attributions" component={Attributions} />
            <Route exact path="/dashboard/categories" component={Categories} />
          </Switch>
        </Router>
        <SiteFooter />
      </div>
    );
  }
}
