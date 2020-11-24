import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import Logo from "../images/simply-logo-white.png";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { Button } from "@material-ui/core";

// Todo: Login/Logout Button
// Navigation Links
// // User account control
// Logo

// categories budgets purchases user_settings

class HeaderCarousel extends Component {
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
      <div
        style={{
          backgroundColor: "#47753e",
          position: "relative",
          zIndex: "100",
        }}
      >
        <Navbar
          style={{
            fontSize: "25px",
            backgroundColor: "#47753e",
            position: "static",
          }}
          collapseOnSelect
          expand="lg"
          className="d-flex justify-content-between "
        >
          <Navbar.Brand>
            <Image width="150px" className="align-top" src={Logo} />
          </Navbar.Brand>
          {localStorage.getItem("userId") ? (
            <Button
              variant="outlined"
              className="text-white"
              style={{ border: "solid 1px white" }}
              type="submit"
              href="/dashboard"
            >
              <h3
                className="my-auto"
                style={{ fontSize: "clamp(16px, 5vw, 30px)" }}
              >
                <b>Dashboard</b>
              </h3>
            </Button>
          ) : (
            <Button
              variant="outlined"
              className="text-white"
              style={{ border: "solid 1px white" }}
              type="submit"
              href="/login"
            >
              <h3
                className="my-auto"
                style={{ fontSize: "clamp(16px, 5vw, 30px)" }}
              >
                <b>Login</b>
              </h3>
            </Button>
          )}
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

export default connect(mapStateToProps, { fetchUser })(HeaderCarousel);
