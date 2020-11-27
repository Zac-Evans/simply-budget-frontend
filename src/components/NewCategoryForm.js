import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ReactSnackBar from "react-js-snackbar";
const userId = localStorage.getItem("userId");

class NewCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      category_budget: "",
      Show: false,
      Showing: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCategorySubmit = (e) => {
    if (!this.state.category_name || !this.state.category_budget) {
      e.preventDefault();
      if (this.state.Showing) return;

      this.setState({ Show: true, Showing: true });
      setTimeout(() => {
        this.setState({ Show: false, Showing: false });
      }, 2000);
    }
    e.preventDefault();
    console.log(this.state);
    axios
      .post(
        `https://simply-budget-backend.herokuapp.com/user/${userId}/budget/create`,
        {
          category_name: this.state.category_name,
          category_budget: this.state.category_budget,
          budget_remaining: this.state.category_budget,
        }
      )
      .then(() => {
        if (this.state.Showing) return;

        e.preventDefault();
        this.setState({ Show: true, Showing: true });
        setTimeout(() => {
          this.setState({
            Show: false,
            Showing: false,
          });
        }, 2000);
        setTimeout(() => {
          this.setState({
            category_name: "",
            category_id: "",
            budget_remaining: "",
            purchase_name: "",
            price: "",
            purchase_notes: "",
          });
        }, 3500);
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const renderSnackBar = () => {
      if (!this.state.category_name || !this.state.category_budget) {
        return (
          <ReactSnackBar
            Icon={<span>🦄</span>}
            value="Show"
            Show={this.state.Show}
          >
            Please fill out required fields
          </ReactSnackBar>
        );
      } else {
        return (
          <ReactSnackBar
            Icon={<span>🦄</span>}
            value="Show"
            Show={this.state.Show}
          >
            Budget added!
          </ReactSnackBar>
        );
      }
    };
    return (
      <div>
        <Form className=" m-4 d-flex flex-column align-items-center">
          <h3>Create New Budget</h3>
          <img
            src="https://img.icons8.com/cute-clipart/200/000000/money-box.png"
            width="100px"
            className="m-2"
          />
          <Form.Row className="d-flex justify-content-center">
            {/* <Form.Group
              className="text-center"
              as={Col}
              controlId="formGridCategoryName"
            >
              <Form.Label>
                <b>*Category Name</b>
              </Form.Label>
              <Form.Control
                as="select"
                name="category_name"
                value={this.state.category_name}
                onChange={this.handleChange}
              >
                <option>Choose...</option>
                <option>Rent</option>
                <option>Mortgage</option>
              </Form.Control>
            </Form.Group>
            <h6 className="d-flex align-self-center m-2">
              <b>OR</b>
            </h6> */}
            <Form.Group
              className="text-center"
              as={Col}
              controlId="formGridCustomCategory"
            >
              <Form.Label>
                <b>*Budget Name</b>
              </Form.Label>
              <Form.Control
                value={this.state.category_name}
                onChange={this.handleChange}
                type="text"
                name="category_name"
                placeholder="Coffee"
              />
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row className="d-flex justify-content-center">
            <Form.Group>
              <FontAwesomeIcon
                className="text-center mr-2 mt-3"
                style={{ fontSize: "60px" }}
                icon={faCoffee}
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>
                <b>*Monthly Allowance</b>
              </Form.Label>
              <Form.Control
                placeholder="$100"
                name="category_budget"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Row className="d-flex justify-content-center">
            <Button
              className="m-4"
              variant="contained"
              type="submit"
              onClick={this.handleCategorySubmit}
            >
              Add
            </Button>
            <Button
              className="m-4"
              variant="contained"
              type="submit"
              color="secondary"
            >
              Cancel
            </Button>
          </Row>
          <p className="mt-3 mb-0">* required</p>
          {renderSnackBar()}
        </Form>
      </div>
    );
  }
}

export default NewCategoryForm;
