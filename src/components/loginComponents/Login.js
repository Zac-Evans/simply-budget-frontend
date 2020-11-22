import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import FailModal from "./Fail-Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
    if (this.state.loggedIn) {
      return <Redirect push to="/dashboard" />;
    }
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
        className="vw-100 vh-100"
        style={{ paddingTop: "150px", backgroundColor: "rgb(71, 117, 62)" }}
      >
        <div style={divStyle} className="mx-auto">
          <Form
            className="mx-auto"
            style={{ maxWidth: "400px" }}
            onSubmit={this.handleSubmit}
          >
            <img
              className="mb-2"
              style={{ width: "75px", height: "75px", marginLeft: "38%" }}
              src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/000/433/original/signin1.png?width=75"
              alt="icon"
            />
            <p className="mb-4 text-center" style={{ fontSize: "30px" }}>
              Login to your{" "}
              <strong style={{ color: "rgb(71, 117, 62)" }}>
                Simply Budget
              </strong>{" "}
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
                className="mb-4"
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
  maxWidth: "400px",
  backgroundColor: "white",
};
