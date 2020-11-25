import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import FailModal from "./Fail-Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Logo from "../../images/simply-logo-white.png";
import { clamp } from "lodash";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      show: false,
    };
  }

  // This handles the input change
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  // This handles the form submit
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post("https://simply-budget-backend.herokuapp.com/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        this.setState({ loggedIn: true });
        localStorage.setItem("userId", res.data[0].id);
        window.location.href = "/dashboard";
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
          errText="Username or Password did not match"
          close={this.close}
          show={this.state.show}
        />
      );
    }
    return (
      <div
        style={{
          paddingTop: "2%",
          backgroundColor: "rgb(71, 117, 62)",
          minHeight: "100vh",
        }}
      >
        <div className="d-flex justify-content-around">
          <Col>
            <Link to="/">
              <h5 className="text-white p-3">← Back</h5>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center">
            <img height="80vh" className="mb-4" src={Logo} />
          </Col>
          <Col />
        </div>

        <div style={divStyle} className="mx-auto pb-4">
          <Form className="mx-auto " onSubmit={this.handleSubmit}>
            <div className="d-flex justify-content-center">
              <img
                style={{ height: "10vh", maxHeight: "70px" }}
                src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/000/433/original/signin1.png?width=75"
                alt="icon"
              />
            </div>
            <p
              className="mb-4 text-center"
              style={{ fontSize: "clamp(16px,5vh,30px)" }}
            >
              Login to your
              <b style={{ color: "rgb(71, 117, 62)" }}> Simply Budget </b>
              account
            </p>
            <Form.Group>
              <Form.Control
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={this.handleChange}
                className=""
                style={inputStyle}
              />
            </Form.Group>
            <Row>
              <Col>
                <Link to="/register">
                  <Button
                    style={{
                      border: "1px solid rgb(173, 173, 173)",
                      backgroundColor: "rgb(71, 117, 62)",
                      width: "100%",
                    }}
                  >
                    Create account
                  </Button>
                </Link>
              </Col>
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
  height: "60vh",
  maxHeight: "400px",
  maxWidth: "600px",
  minHeight: "300px",
  backgroundColor: "white",
};
