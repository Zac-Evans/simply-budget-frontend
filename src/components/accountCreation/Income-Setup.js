import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import NumberInput from "./Number-Input";
import FailModal from "../loginComponents/Fail-Modal";
import Logo from "../../images/simply-logo-white.png";

export default class IncomeSetup extends Component {
  constructor() {
    super();
    this.state = {
      income: "",
      next: false,
      show: false,
    };
  }

  close = () => {
    this.setState({ show: false });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(this.state.income) || !this.state.income) {
      return this.setState({ show: true });
    }
    axios
      .put(
        `https://simply-budget-backend.herokuapp.com/user/${localStorage.getItem(
          "userId"
        )}`,
        {
          income: this.state.income,
        }
      )
      .then(() => this.setState({ next: true }))
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.next) {
      return <Redirect push to="/category-setup" />;
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
      <div
        style={{
          backgroundColor: "rgb(71, 117, 62)",
          minHeight: "100vh",
        }}
        className="d-flex flex-column justify-content-center align-items-stretch"
      >
        <div className="d-flex justify-content-center">
          <Col className="d-flex justify-content-end align-items-center">
            <Link to="/register">
              <h5 className="text-white p-0 m-0">← Back</h5>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center m-0 p-0">
            <img width="200px" className="mb-4 ml-0 mr-0 p-0" src={Logo} />
          </Col>
          <Col />
        </div>
        <div style={divStyle} className="mx-auto">
          <div className="text-center">
            <h4 className="mb-4">
              <br /> Let's setup your{" "}
              <strong style={{ color: "rgb(71, 117, 62)" }}>
                Simply Budget
              </strong>
            </h4>

            <p style={{ fontSize: "20px", marginBottom: "40px" }}>
              Begin by entering in your monthly income
            </p>
          </div>

          <Form
            className="mx-auto"
            style={{ maxWidth: "500px" }}
            onSubmit={this.handleSubmit}
          >
            <NumberInput
              placeholder="Enter monthly income"
              id="income"
              handleChange={this.handleChange}
            />
            <Row className="d-flex justify-content-center">
              <Button
                style={{
                  border: "1px solid rgb(173, 173, 173)",
                  backgroundColor: "rgb(60, 60, 60)",
                  width: "30%",
                }}
                type="submit"
              >
                <b>Next ➜</b>
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const divStyle = {
  boxShadow: "1px 1px 20px",
  borderRadius: "10px",
  padding: "30px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  maxWidth: "600px",
  minHeight: "300px",
  backgroundColor: "white",
};
