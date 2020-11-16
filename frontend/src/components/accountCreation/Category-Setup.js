import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import TextInput from "./Text-Input";
import NumberInput from "./Number-Input";
import FailModal from "../loginComponents/Fail-Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default class CategorySetup extends Component {
  constructor() {
    super();
    this.state = {
      category_name: "",
      category_budget: 0,
      next: false,
      back: false,
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
    if (isNaN(this.state.category_budget) || !this.state.category_budget) {
      return this.setState({ show: true });
    }
    if (!this.state.category_name) {
      return this.setState({ show: true });
    }
    axios
      .post(
        `http://localhost:8000/budget/add/${localStorage.getItem("userId")}`,
        {
          category_name: this.state.category_name,
          category_budget: this.state.category_budget,
        }
      )
      .then(() => window.location.reload())
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
      return <Redirect push to="/dashboard" />;
    }
    if (this.state.back) {
      return <Redirect push to="/bill-setup" />;
    }
    // This is for the fail modal
    if (this.state.show) {
      return (
        <FailModal
          errText="Please enter a Category Budget"
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
        <div style={divStyle} className="w-50 mx-auto">
          <div className="text-center">
            <h4 className="mb-4">Now for the fun part!</h4>

            <p style={{ fontSize: "20px", marginBottom: "40px" }}>
              Let's set some personlized budgets <br /> such as Groceries, Food,
              and Dates.
            </p>
          </div>

          <Form
            className="mx-auto"
            style={{ maxWidth: "400px" }}
            onSubmit={this.handleSubmit}
          >
            {/* These are the inputs */}
            <TextInput
              placeholder="Enter budget name"
              id="category_name"
              handleChange={this.handleChange}
            />
            <NumberInput
              placeholder="Enter monthly budget amount"
              id="category_budget"
              handleChange={this.handleChange}
            />

            {/* These are the back and next buttons */}
            <Button
              style={{
                border: "1px solid rgb(173, 173, 173)",
                backgroundColor: "rgb(71, 117, 62)",
                width: "100%",
              }}
              type="submit"
              className="mb-4"
            >
              Add this category
            </Button>
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
              {/* Submit Button */}
              <Col md={{span: 4, offset: 4}}>
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
      </div>
    );
  }
}

const divStyle = {
  boxShadow: "1px 1px 20px",
  borderRadius: "10px",
  padding: "30px",
  backgroundColor: "white",
};
