import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Text_Input from "./Text-Input";
import Number_Input from "./Number-Input";
import Fail_Modal from "../loginComponents/Fail-Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class Bill_Setup extends Component {
  constructor() {
    super();
    this.state = {
      bill_name: "",
      bill_amount: 0,
      next: false,
      back: false,
      show: false,
    };
  }

  close = () => { this.setState({ show: false }) };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(this.state.bill_amount) || !this.state.bill_amount) {
      return this.setState({ show: true });
    }
    axios
      .post(
        `http://localhost:8000/bills/create/${localStorage.getItem("userId")}`,
        {
          bill_name: this.state.bill_name,
          bill_amount: this.state.bill_amount,
        }
      )
      .then(() => {
        this.setState({ next: true });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  back = () => {
    this.setState({ back: true });
  };
  next = () => {
    this.setState({ next: true });
  };

  render() {
    if (this.state.next) {
      return <Redirect push to="/category-setup" />;
    }
    if (this.state.back) {
      return <Redirect push to="/income-setup" />;
    }
    // This is for the fail modal
    if (this.state.show) {
      return (
        <Fail_Modal
          errText="Please enter a Bill Amount"
          close={this.close}
          show={this.state.show}
        />
      );
    }
    return (
      <div style={{ marginTop: "100px" }} className="w-50 mx-auto">
        <div className="text-center">
          <h4 className="mb-4">Great, time to do your bills</h4>

          <p style={{ fontSize: "20px", marginBottom: "40px" }}>
            Enter in the name and amount of your monthly bills
          </p>
        </div>

        <Form
          className="mx-auto"
          style={{ maxWidth: "400px" }}
          onSubmit={this.handleSubmit}
        >
          {/* These are the inputs */}
          <Text_Input
            placeholder="Ex. Car Payment"
            id="bill_name"
            handleChange={this.handleChange}
          />
          <Number_Input
            placeholder="Ex. 200"
            id="bill_amount"
            handleChange={this.handleChange}
          />

          {/* These are the back and next buttons */}
          <Row className="mx-auto">
            {/* Back button */}
            <Col md={4}>
              <Button
                style={{
                  border: "1px solid rgb(173, 173, 173)",
                  backgroundColor: "rgb(71, 117, 62)",
                  width: "100%",
                }}
                onClick={this.back}
              >
                Back
              </Button>
            </Col>
            {/* Add another button */}
            <Col md={4}>
              <Button
                style={{
                  border: "1px solid rgb(173, 173, 173)",
                  backgroundColor: "gray",
                  width: "100%",
                }}
                type="submit"
              >
                <img
                  style={{ width: "25px", height: "25px" }}
                  src="https://www.flaticon.com/svg/static/icons/svg/54/54443.svg"
                  alt="Icon"
                />
              </Button>
            </Col>
            {/* Submit Button */}
            <Col md={4}>
              <Button
                style={{
                  border: "1px solid rgb(173, 173, 173)",
                  backgroundColor: "rgb(71, 117, 62)",
                  width: "100%",
                }}
                onClick={this.next}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
