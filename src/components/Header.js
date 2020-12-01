import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../images/simply-logo-white.png";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { Button } from "@material-ui/core";

// Todo: Login/Logout Button
// Navigation Links
// // User account control
// Logo

// categories budgets purchases user_settings

class PageHeader extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");

    this.props.fetchUser(userId);
  }
  logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  render() {
    return (
      <div className="w-100">
        <Navbar
          style={{
            fontSize: "25px",
            backgroundColor: "#264653 ",
            position: "relative",
          }}
          collapseOnSelect
          expand="lg"
          bg="dark"
        >
          {localStorage.getItem("userId") ? (
            <Navbar.Brand href="/dashboard">
              <img
                height="120"
                className="d-inline-block align-top"
                src={Logo}
              />
            </Navbar.Brand>
          ) : (
            <Navbar.Brand href="/">
              <img
                height="120"
                className="d-inline-block align-top"
                src={Logo}
              />
            </Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="mr-auto ml-3">
              <Nav.Link className="my-auto" href="/dashboard">
                <Button
                  style={{
                    color: "white",
                    border: "2px solid #47753e",
                    backgroundColor: "rgb(71, 117, 62, .5)",
                    textTransform: "capitalize",
                  }}
                  variant="outlined"
                >
                  <h4 className="my-auto">Dashboard</h4>
                </Button>
              </Nav.Link>
              <Nav.Link className="text-light" href="/dashboard/categories">
                Budgets
              </Nav.Link>
              <Nav.Link className="text-light" href="/dashboard/transactions">
                Transactions
              </Nav.Link>
            </Nav>

            {this.props.user && (
              <NavDropdown
                title={
                  <p style={{ color: "white", float: "left" }}>
                    <b>Hello, {this.props.user.first_name}!</b>
                  </p>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/dashboard/account">
                  Account Info
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#logout" onClick={this.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
// <div className="navbar navbar-expand-lg navbar-light bg-light ">
//   <div className="flex-row d-flex justify-content-between align-items-center">
//     <img src="https://www.freelogodesign.org/file/app/client/thumb/ffd6f41f-b835-40e8-aa8a-286a98d9f197_200x200.png?1605370896563"></img>
//     <div className="align-center">
//       <a className="navbar-brand" href="">
//         Categories{" "}
//       </a>
//       <a className="navbar-brand" href="">
//         Budgets{" "}
//       </a>
//       <a className="navbar-brand" href="">
//         Purchases{" "}
//       </a>
//       <a className="navbar-brand" href="">
//         User Settings{" "}
//       </a>
//     </div>

//     <div>
//       <a href="sign-in.html" class="btn btn-secondary sign-up-btn">
//         Sign Out
//       </a>
//     </div>
//   </div>
// </div>

const mapStateToProps = (state) => {
  return { user: state.user[0] };
};

export default connect(mapStateToProps, { fetchUser })(PageHeader);
