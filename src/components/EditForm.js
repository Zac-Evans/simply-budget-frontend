import React, { Component } from "react";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
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
      category_budget: this.props.category_budget,
    };
  }
  componentDidMount = () => {
    this.props.fetchCategory(userId, this.props.categoryId);
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCategorySubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://simply-budget-backend.herokuapp.com/user/${userId}/budget/category/${this.props.categoryId}`,
        {
          category_name: this.state.category_name,
          category_budget: this.state.category_budget,
          budget_remaining: this.state.category_budget,
        }
      )
      .then((response) => console.log(response))
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };
  render() {
    if (!this.props.category[0]) {
      return "Loading...";
    } else {
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
                  placeholder={this.props.category[0].category_name}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridAddress1" className="text-center">
              <Form.Label>
                <b>Update Monthly Budget</b>
              </Form.Label>
              <InputGroup className="mb-2 w-75 mx-auto">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="category_budget"
                  placeholder={this.props.category[0].category_budget.toFixed(
                    2
                  )}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Row className="d-flex justify-content-center">
              <Button className="m-4" variant="contained" type="submit">
                Back
              </Button>
              <Button
                variant="contained"
                className="m-4 text-white"
                type="submit"
                style={{ backgroundColor: "rgb(71, 117, 62)" }}
                onClick={this.handleCategorySubmit}
              >
                <b>Save</b>
              </Button>
            </Row>
          </Form>
        </div>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category,
    categoryId: ownProps.categoryId,
  };
};
export default connect(mapStateToProps, { fetchCategory })(NewCategoryForm);
