import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../images/simply-logo-white.png";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

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
      <div>
        {this.props.user && (
          <Navbar
            style={{
              fontSize: "25px",
              backgroundColor: "#264653 ",
            }}
            collapseOnSelect
            expand="lg"
            bg="dark"
          >
            <Navbar.Brand href="/dashboard">
              <img
                height="140"
                className="d-inline-block align-top"
                src={Logo}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto ">
                <Nav.Link className="text-light" href="/dashboard/categories">
                  Categories
                </Nav.Link>
                <Nav.Link className="text-light" href="budgets">
                  Budgets
                </Nav.Link>
                <Nav.Link className="text-light" href="transactions">
                  Transactions
                </Nav.Link>
              </Nav>
              <NavDropdown
                title={
                  <p style={{ color: "white", float: "left" }}>
                    Hello, {this.props.user.first_name}
                  </p>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#logout" onClick={this.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              <Nav></Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
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
