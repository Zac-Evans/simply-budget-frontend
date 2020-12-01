import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import TextInput from "./Text-Input";
import NumberInput from "./Number-Input";
import FailModal from "../loginComponents/Fail-Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Logo from "../../images/simply-logo-white.png";
import ReactSnackBar from "react-js-snackbar";

export default class CategorySetup extends Component {
  constructor() {
    super();
    this.state = {
      category_name: "",
      category_budget: "",
      next: false,
      back: false,
      show: false,
      open: false,
      Showing: false,
      ShowSnack: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
        `https://simply-budget-backend.herokuapp.com/user/${localStorage.getItem(
          "userId"
        )}/budget/create`,
        {
          category_name: this.state.category_name,
          category_budget: this.state.category_budget,
          budget_remaining: this.state.category_budget,
        }
      )
      .then(() => {
        if (this.state.Showing) return;
        e.preventDefault();
        this.setState({ ShowSnack: true, Showing: true });
        setTimeout(() => {
          this.setState({
            ShowSnack: false,
            Showing: false,
          });
        }, 2000);
        setTimeout(() => {
          console.log("timeout");
          this.setState({
            category_name: "",
            category_budget: "",
          });
        }, 3500);
      })

      .catch((err) => {
        console.log(err);
      });
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
    const renderSnackBar = () => {
      return (
        <ReactSnackBar
          Icon={<span>🦄</span>}
          value="Show"
          Show={this.state.ShowSnack}
        >
          <b>Budget added!</b>
        </ReactSnackBar>
      );
    };

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
            <Link to="/income-setup">
              <h5 className="text-white p-0 m-0">← Back</h5>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center m-0 p-0">
            <img width="200px" className="mb-4 ml-0 mr-0 p-0" src={Logo} />
          </Col>
          <Col class />
        </div>
        <div style={divStyle}>
          <div className="text-center">
            <h4 className="mb-4">Now for the fun part!</h4>

            <h6 style={{ fontSize: "20px", marginBottom: "40px" }}>
              Let's set some personlized budgets
              <p style={{ color: "grey" }}>
                (i.e. groceries, coffee, rent, etc.)
              </p>
            </h6>
          </div>

          <Form
            className="mx-auto"
            style={{ maxWidth: "500px" }}
            // onSubmit={this.handleSubmit}
          >
            <Form.Group>
              {/* These are the inputs */}
              <Col className="mb-4">
                <InputGroup className="mb-2">
                  <Form.Control
                    placeholder="Enter budget name"
                    value={this.state.category_name}
                    id="category_name"
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </Col>

              <Col className="mb-4">
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    placeholder="Enter monthly budget amount"
                    id="category_budget"
                    value={this.state.category_budget}
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </Col>
            </Form.Group>

            {/* These are the back and next buttons */}
            <Row className="d-flex justify-content-center">
              <Button
                style={{
                  border: "1px solid rgb(173, 173, 173)",
                  backgroundColor: "rgb(71, 117, 62)",
                  width: "60%",
                }}
                type="button"
                className="mb-4"
                onClick={this.handleSubmit}
              >
                <b>Create Budget</b>
              </Button>
            </Row>

            {/* Back button */}

            {/* Submit Button */}
            <Row className="d-flex justify-content-center">
              <Button
                style={{
                  border: "1px solid rgb(173, 173, 173)",
                  backgroundColor: "rgb(60, 60, 60)",
                  width: "60%",
                }}
                onClick={this.next}
              >
                <b>Next ➜</b>
              </Button>
            </Row>
            {renderSnackBar()}
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
