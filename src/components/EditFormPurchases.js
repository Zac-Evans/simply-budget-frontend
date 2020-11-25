import React, { Component } from "react";
import { Form, Col } from "react-bootstrap";
import { Button, Paper } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import { fetchPurchase } from "../actions/";
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
    this.props.fetchPurchase(userId, this.props.purchaseId);
    console.log(this.props.category);
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
    if (!this.props.purchase[0]) {
      return "Loading...";
    } else {
      return (
        <div>
          <Paper style={{ border: "2px solid #000" }} className="p-3">
            <Form className=" m-4 d-flex flex-column align-items-center">
              <h3>Edit Purchase</h3>
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
                    <b>Update Purchase Name</b>
                    <br />
                    <small>(optional)</small>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="category_name"
                    placeholder={this.props.purchase[0].category_name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formGridAddress1" className="text-center">
                <Form.Label>
                  <b>Update Purchase Amount</b>
                </Form.Label>
                <Form.Control
                  name="category_budget"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="contained"
                type="submit"
                onClick={this.handleCategorySubmit}
              >
                Save
              </Button>
            </Form>
          </Paper>
        </div>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    purchase: state.purchase,
    purchaseId: ownProps.purchaseId,
  };
};
export default connect(mapStateToProps, { fetchPurchase })(NewCategoryForm);
