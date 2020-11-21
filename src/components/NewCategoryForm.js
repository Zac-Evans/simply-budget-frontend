import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
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
    axios
      .post(
        `https://simply-budget-backend.herokuapp.com/user/${userId}/budget/create`,
        {
          category_name: this.state.category_name,
          category_budget: this.state.category_budget,
          budget_remaining: this.state.category_budget,
        }
      )
      .then((response) => {
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
        }, 3100).catch((error) => {
          console.log(error);
        });
      });
  };

  render() {
    const renderSnackBar = () => {
      if (
        !this.state.category_name ||
        !this.state.category_budget ||
        !this.state.budget_remaining
      ) {
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
            Transaction added!
          </ReactSnackBar>
        );
      }
    };
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
            </h6>
            <Form.Group
              className="text-center"
              as={Col}
              controlId="formGridCustomCategory"
            >
              <Form.Label>
                <b>*Custom Category</b>
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
                <b>*Monthly Budget</b>
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
          <p className="mt-3 mb-0">* required</p>
          {renderSnackBar()}
        </Form>
      </div>
    );
  }
}

export default NewCategoryForm;
