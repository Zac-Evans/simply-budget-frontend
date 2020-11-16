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

export default class BillSetup extends Component {
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

  close = () => {
    this.setState({ show: false });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(this.state.bill_amount)) {
      return this.setState({ show: true });
    }
    if (!this.state.bill_amount && this.state.bill_name) {
      return this.setState({ show: true });
    }
    if (this.state.bill_amount && !this.state.bill_name) {
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
      .then(() => window.location.reload());
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
    //This is for the fail modal
    if (this.state.show) {
      return (
        <FailModal
          errText="Please try again"
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
            <TextInput
              placeholder="Ex. Car Payment"
              id="bill_name"
              handleChange={this.handleChange}
            />
            <NumberInput
              placeholder="Ex. 200"
              id="bill_amount"
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
              Add this bill
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
              <Col md={{ span: 4, offset: 4 }}>
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
