import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FailModal from "./FailModal";

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
    axios
      .post("http://localhost:8000/register", {
        first_name: first_name,
        last_name: last_name,
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
          errText="Please fill out all fields"
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
            src="https://cdn0.iconfinder.com/data/icons/cosmetic-store/25/Register-512.png"
            alt="icon"
          />
          <p className="mb-4 text-center" style={{ fontSize: "30px" }}>
            Create a{" "}
            <strong style={{ color: "rgb(71, 117, 62)" }}>Simply Budget</strong>{" "}
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
