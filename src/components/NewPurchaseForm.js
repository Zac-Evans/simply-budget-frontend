import React, { Component } from "react";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import { Button } from "@material-ui/core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { connect } from "react-redux";
import { fetchCategories } from "../actions";
import ReactSnackBar from "react-js-snackbar";
const userId = localStorage.getItem("userId");

class NewPurchaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      category_id: "",
      budget_remaining: "",
      purchase_name: "",
      price: "",
      purchase_notes: "",
      Show: false,
      Showing: false,
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchCategories(userId);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCategoryChange = (e) => {
    let categoryIndex = e.target.options.selectedIndex;
    let budgetRemaining = e.target.options[categoryIndex].getAttribute(
      "budget_remaining"
    );
    let categoryId = e.target.options[categoryIndex].getAttribute(
      "category_id"
    );
    this.setState({
      category_name: e.target.value,
      category_id: categoryId,
      budget_remaining: budgetRemaining,
    });
  };

  handlePurchaseSubmit = (e) => {
    if (
      !this.state.category_name ||
      !this.state.category_id ||
      !this.state.price ||
      !this.state.budget_remaining ||
      !this.state.purchase_name
    ) {
      e.preventDefault();
      if (this.state.Showing) return;

      this.setState({ Show: true, Showing: true });
      setTimeout(() => {
        this.setState({ Show: false, Showing: false });
      }, 2000);
    }

    axios
      .post(
        `https://simply-budget-backend.herokuapp.com/user/${userId}/purchases/create`,
        {
          category_id: this.state.category_id,
          purchase_name: this.state.purchase_name,
          purchase_notes: this.state.purchase_notes,
          price: parseInt(this.state.price),
        }
      )
      .then(
        axios.put(
          `https://simply-budget-backend.herokuapp.com/user/${userId}/budget/category/${this.state.category_id}`,
          {
            budget_remaining: this.state.budget_remaining - this.state.price,
          }
        )
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
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const categoryList = this.props.categories
      .map((category) => {
        return {
          category_name: category.category_name,
          category_id: category.id,
          budget_remaining: category.budget_remaining,
        };
      })
      .sort((a, b) => (a.category_name > b.category_name ? 1 : -1));

    const renderSnackBar = () => {
      if (
        !this.state.category_name ||
        !this.state.category_id ||
        !this.state.price ||
        !this.state.budget_remaining ||
        !this.state.purchase_name
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
        <Form className="purchaseForm m-3 d-flex flex-column align-items-center">
          <h3>Add a New Transaction</h3>
          <img
            src="https://img.icons8.com/cute-clipart/200/000000/money.png"
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
                onChange={this.handleCategoryChange}
              >
                <option>Choose...</option>
                {categoryList.map((category) => {
                  return (
                    <option
                      key={category.category_id}
                      category_id={category.category_id}
                      budget_remaining={category.budget_remaining}
                    >
                      {category.category_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group
              className="text-center"
              as={Col}
              controlId="formGridCustomCategory"
            >
              <Form.Label>
                <b>*Purchase</b>
              </Form.Label>
              <Form.Control
                value={this.state.purchase_name}
                onChange={this.handleChange}
                type="text"
                name="purchase_name"
                placeholder="Cup O' Joe"
              />
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Group>
            <Row className="d-flex justify-content-center">
              {/* <Form.Group>
              <FontAwesomeIcon
                className="text-center m-4"
                style={{ fontSize: "60px" }}
                icon={faCoffee}
              />
            </Form.Group> */}

              <Col className="col-4 text-center">
                <h5 style={{ marginTop: "5px" }}>
                  <b>*Amount:</b>
                </h5>
              </Col>

              <Col className="col-6">
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    placeholder="20.00"
                    name="price"
                    className="text-left"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group
            style={{ width: "300px" }}
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>
              <b>Notes</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="purchase_notes"
              value={this.state.purchase_notes}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-start">
            <Button className="m-4" variant="contained" type="submit">
              Back
            </Button>
            <Button
              variant="contained"
              type="button"
              className="m-4 text-white"
              style={{ backgroundColor: "rgb(71, 117, 62)" }}
              onClick={this.handlePurchaseSubmit}
            >
              <b>Add</b>
            </Button>
          </Form.Group>

          <p className="mt-3 mb-0">* required</p>
          {renderSnackBar()}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

export default connect(mapStateToProps, { fetchCategories })(NewPurchaseForm);
