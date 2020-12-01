import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Button, Paper } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";

const userId = localStorage.getItem("userId");
class DeleteFormPurchases extends Component {
  handleDeleteSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://simply-budget-backend.herokuapp.com/user/${userId}/purchases/${this.props.purchaseId}`
      )
      .then(
        axios.put(
          `https://simply-budget-backend.herokuapp.com/user/${userId}/budget/category/${this.props.categoryId}`,
          {
            budget_remaining:
              parseInt(this.props.remaining) + parseInt(this.props.price),
          }
        )
      )
      .then((response) => console.log(response))
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props && (
          <Paper style={{ border: "2px solid #000" }} className="p-3">
            <Form className=" m-4 d-flex flex-column align-items-center">
              <h3>Are You Sure?</h3>
              <img
                src="https://img.icons8.com/cute-clipart/200/000000/money-box.png"
                width="100px"
                className="m-2"
                alt="Piggy"
              />
              <Form.Group className="d-flex justify-content-center">
                <Button className="m-4" variant="contained" type="submit">
                  Back
                </Button>
                <Button
                  className="m-4 text-white"
                  variant="contained"
                  style={{ backgroundColor: "red" }}
                  type="submit"
                  onClick={this.handleDeleteSubmit}
                >
                  <b>Delete</b>
                </Button>
              </Form.Group>
            </Form>
          </Paper>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    purchaseId: ownProps.purchaseId,
    categoryId: ownProps.categoryId,
    price: ownProps.price,
    remaining: ownProps.remaining,
  };
};
export default connect(mapStateToProps)(DeleteFormPurchases);
