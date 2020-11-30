import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Button, Paper } from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import { fetchPurchase } from "../actions/";
const userId = localStorage.getItem("userId");
class NewCategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.fetchPurchase(userId, this.props.purchaseId);
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCategorySubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://simply-budget-backend.herokuapp.com/user/${userId}/purchases/${this.props.purchaseId}`,
        {
          category_id: this.state.category_id,
          purchase_name: this.state.purchase_name,
          purchase_notes: this.state.purchase_notes,
          price: this.state.price,
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
            <Form className="m-4 d-flex flex-column align-items-center">
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
                    name="purchase_name"
                    placeholder={this.props.purchase[0].purchase_name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formGridAddress1" className="text-center">
                <Form.Label>
                  <b>Update Purchase Amount</b>
                </Form.Label>
                <Row>
                  <Col
                    className="text-right p-0 col-3 float-right align-text-bottom"
                    style={{
                      marginRight: "-10px",
                      marginBottom: "-35px",
                    }}
                  >
                    $
                  </Col>
                  <Col className="col-8" style={{ marginTop: "-7px" }}>
                    <Form.Control
                      name="price"
                      onChange={this.handleChange}
                      placeholder={this.props.purchase[0].price.toFixed(2)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="d-flex justify-content-center">
                <Button
                  className="m-4"
                  variant="contained"
                  type="submit"
                  onClick={this.handleCategorySubmit}
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
