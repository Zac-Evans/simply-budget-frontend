import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import { fetchCategory } from "../actions/";

const userId = localStorage.getItem("userId");

class NewCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: this.props.category_name,
      category_budget: "",
    };
  }

  componentDidMount = () => {
    this.props.fetchCategory(userId, this.props.categoryId);
    console.log(this.props.category);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCategorySubmit = () => {
    axios
      .put(
        `http://localhost:8000/user/${userId}/budget/category/${this.props.categoryId}`,
        {
          category_name: this.state.category_name,
          category_budget: this.state.category_budget,
          budget_remaining: this.state.category_budget,
        }
      )
      .then(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  };

  render() {
    if(!this.props.category[0]) {
      return ("Loading...")
    }
    else {
    return (
      <div>
        <Form className=" m-4 d-flex flex-column align-items-center">
          <h3>Edit Category</h3>
          <img
            src="https://img.icons8.com/cute-clipart/200/000000/money-box.png"
            width="100px"
            className="m-2"
            alt="Piggy"
          />
          <Form.Row>
            <Form.Group
              className="text-center"
              as={Col}
              controlId="formGridCategoryName"
            >
              <Form.Label>
                <b>Update Category Name</b>
                <br />
                <small>(optional)</small>
              </Form.Label>
              <Form.Control
                type="text"
                name="category_name"
                value={this.props.category[0].category_name}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1" className="text-center">
            <Form.Label>
              <b>Update Monthly Budget</b>
            </Form.Label>
            <Form.Control name="category_budget" onChange={this.handleChange} />
          </Form.Group>

          <Button
            variant="contained"
            type="submit"
            onClick={this.handleCategorySubmit}
          >
            Save
          </Button>
        </Form>
      </div>
    )}
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    category: state.category, 
    categoryId: ownProps.categoryId
  };
};

export default connect(mapStateToProps, { fetchCategory })(NewCategoryForm);
