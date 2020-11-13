import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FailModal from "./FailModal";

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
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        this.setState({ loggedIn: true });
      })
      .catch(() => {
        this.setState({ show: true });
      });
  };

  // This closes the modal
  close = () => { this.setState({ show: false }) };

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
      <div>
        <Form
          className="w-50 mx-auto"
          style={{ maxWidth: "400px", marginTop: "200px" }}
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
            <strong style={{ color: "rgb(71, 117, 62)" }}>Simply Budget</strong>{" "}
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
          <Button
            style={{ backgroundColor: "rgb(71, 117, 62)", width: "100%" }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

/////Styles//////
const inputStyle = {
  border: "none",
  borderRadius: "0px",
  borderBottom: "1.5px solid black",
  color: "black",
  backgroundColor: "rgba(0, 0, 0, 0)",
};
