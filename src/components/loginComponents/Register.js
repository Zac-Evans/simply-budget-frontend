import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FailModal from "./Fail-Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Logo from "../../images/simply-logo-white.png";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      loggedIn: false,
      show: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password } = this.state;
    if (!first_name || !last_name || !email || !password) {
      return this.setState({ show: true });
    }
    axios
      .post("https://simply-budget-backend.herokuapp.com/register", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      })
      .then((res) => {
        this.setState({ loggedIn: true });
        localStorage.setItem("userId", res.data.id);
      })
      .catch(() => {
        this.setState({ show: true });
      });
  };

  // This closes the modal
  close = () => {
    this.setState({ show: false });
  };

  render() {
    if (this.state.show) {
      return (
        <FailModal
          errText="Please fill out all fields"
          close={this.close}
          show={this.state.show}
        />
      );
    }

    if (this.state.loggedIn) {
      window.location.href = "/income-setup";
    }

    return (
      <div
        style={{
          backgroundColor: "rgb(71, 117, 62)",
          minHeight: "100vh",
        }}
        className="d-flex flex-column justify-content-center align-items-stretch"
      >
        <div className="d-flex justify-content-center">
          <Col className="d-flex justify-content-end align-items-center">
            <Link to="/login">
              <h5 className="text-white p-0 m-0">← Back</h5>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center m-0 p-0">
            <img width="200px" className="mb-4 ml-0 mr-0 p-0" src={Logo} />
          </Col>
          <Col />
        </div>
        <div style={divStyle} className="mx-auto">
          <Form
            className=" mx-auto"
            style={{ maxWidth: "500px" }}
            onSubmit={this.handleSubmit}
          >
            <div className="d-flex justify-content-center">
              <img
                className="m-2"
                style={{ height: "10vh", maxHeight: "50px" }}
                src="https://cdn0.iconfinder.com/data/icons/cosmetic-store/25/Register-512.png"
                alt="icon"
              />
            </div>
            <p
              className="mb-4 text-center"
              style={{ fontSize: "clamp(16px,2.5vh,24px)" }}
            >
              Create a<b style={{ color: "rgb(71, 117, 62)" }}>Simply Budget</b>{" "}
              account
            </p>
            <Form.Group>
              <Form.Control
                id="first_name"
                placeholder="Enter first name"
                onChange={this.handleChange}
                style={inputStyle}
                className="mb-4"
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                id="last_name"
                placeholder="Enter last name"
                onChange={this.handleChange}
                className="mb-4"
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                className="mb-4"
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={this.handleChange}
                className="mb-4"
                style={inputStyle}
              />
            </Form.Group>
            <Row>
              <Col>
                <Button
                  style={{
                    border: "1px solid rgb(173, 173, 173)",
                    backgroundColor: "rgb(71, 117, 62)",
                    width: "100%",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

/////Styles//////
const inputStyle = {
  border: "none",
  borderRadius: "0px",
  borderBottom: "1.5px solid rgb(173, 173, 173)",
  color: "black",
  backgroundColor: "rgba(0, 0, 0, 0)",
};

const divStyle = {
  boxShadow: "1px 1px 20px",
  borderRadius: "10px",
  padding: "30px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  maxWidth: "400px",
  minHeight: "300px",
  backgroundColor: "white",
};
