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
import ProgressCirclesContainer from "./components/ProgressCircle/ProgressCirclesContainer";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { Container } from "@material-ui/core";
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
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// class App extends Component {
//   componentDidMount() {
//     this.props.fetchCategories(localStorage.getItem("userId"));
//   }

//   renderList() {
//     console.log(this.props.categories[0]);
//     return this.props.categories.map((category, index) => {
//       return (
//         <div key={category.id}>
//           <h2>{category.category_name}</h2>
//         </div>
//       );
//     });
//   }
//   render() {
//     return <div>{this.renderList()}</div>;
//   }
// }

// const mapStateToProps = (state) => {
//   return { categories: state.categories };
// };

// export default connect(mapStateToProps, { fetchCategories })(App);
