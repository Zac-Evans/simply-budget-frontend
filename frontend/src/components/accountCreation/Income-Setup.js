import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TextInput from "./Text-Input";
import FailModal from "../loginComponents/Fail-Modal";

export default class IncomeSetup extends Component {
  constructor() {
    super();
    this.state = {
      income: "",
      next: false,
      show: false
    };
  }

  close = () => { this.setState({ show: false }) };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(isNaN(this.state.income) || !this.state.income) {
      return this.setState({show: true})
    }
    axios
      .put(`http://localhost:8000/user/${localStorage.getItem("userId")}`, {
        income: this.state.income,
      })
      .then(() => this.setState({ next: true }))
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.next) {
      return <Redirect push to="/bill-setup" />;
    }
    if (this.state.show) {
      return (
        <FailModal
          errText="Please enter a number"
          close={this.close}
          show={this.state.show}
        />
      );
    }
    return (
      <div style={{ marginTop: "100px" }} className="w-50 mx-auto">
        <div className="text-center">
          <h4 className="mb-4">
            Now that we've created an account
            <br /> let's setup your{" "}
            <strong style={{ color: "rgb(71, 117, 62)" }}>Simply Budget</strong>
          </h4>

          <p style={{ fontSize: "20px", marginBottom: "40px" }}>
            Begin by entering in your monthly income
          </p>
        </div>

        <Form
          className="mx-auto"
          style={{ maxWidth: "400px" }}
          onSubmit={this.handleSubmit}
        >
          <TextInput
            placeholder="Enter monthly income"
            id="income"
            handleChange={this.handleChange}
          />
          <Button
            style={{
              border: "1px solid rgb(173, 173, 173)",
              backgroundColor: "rgb(71, 117, 62)",
              width: "100%",
            }}
            type="submit"
          >
            Next
          </Button>
        </Form>
      </div>
    );
  }
}
