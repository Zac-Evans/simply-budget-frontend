import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const userId = localStorage.getItem("userId");

class NewCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { category_name: "", category_budget: "" };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCategorySubmit = (e) => {
    axios
      .post(`http://localhost:8000/user/${userId}/budget/create`, {
        category_name: this.state.category_name,
        category_budget: this.state.category_budget,
        budget_remaining: this.state.category_budget,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Form className=" m-4 d-flex flex-column align-items-center">
          <h3>Create New Category</h3>
          <img
            src="https://img.icons8.com/cute-clipart/200/000000/money-box.png"
            width="100px"
            className="m-2"
          />
          <Form.Row>
            <Form.Group
              className="text-center"
              as={Col}
              controlId="formGridCategoryName"
            >
              <Form.Label>
                <b>Category Name</b>
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
            </h6>
            <Form.Group
              className="text-center"
              as={Col}
              controlId="formGridCustomCategory"
            >
              <Form.Label>
                <b>Custom Category</b>
              </Form.Label>
              <Form.Control
                value={this.state.category_name}
                onChange={this.handleChange}
                type="text"
                name="category_name"
                placeholder="Clothes"
              />
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row className="d-flex justify-content-start">
            <Form.Group>
              <FontAwesomeIcon
                className="text-center m-4"
                style={{ fontSize: "60px" }}
                icon={faCoffee}
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>
                <b>Monthly Budget</b>
              </Form.Label>
              <Form.Control
                placeholder="$100"
                name="category_budget"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Button
            variant="contained"
            type="submit"
            onClick={this.handleCategorySubmit}
          >
            Create Category
          </Button>
        </Form>
      </div>
    );
  }
}

export default NewCategoryForm;
