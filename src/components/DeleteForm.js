import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Button } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
const userId = localStorage.getItem("userId");
class DeleteForm extends Component {
  handleDeleteSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://simply-budget-backend.herokuapp.com/user/${userId}/budget/category/${this.props.categoryId}`
      )
      .then((response) => console.log(response))
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div>
        <Form className=" m-4 d-flex flex-column align-items-center">
          <h3>Are You Sure?</h3>
          <img
            src="https://img.icons8.com/cute-clipart/200/000000/money-box.png"
            width="100px"
            className="m-2"
            alt="Piggy"
          />
          <Form.Group className="d-flex justify-content-center">
            <Button
              className="m-4"
              variant="contained"
              type="submit"
              onClick={this.handleDeleteSubmit}
            >
              Save
            </Button>
            <Button
              className="m-4"
              variant="contained"
              type="submit"
              color="secondary"
            >
              Back
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    categoryId: ownProps.categoryId,
  };
};
export default connect(mapStateToProps)(DeleteForm);
