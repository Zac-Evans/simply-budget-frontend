import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "@material-ui/core";

class EditAccount extends Component {
  constructor() {
    super();
    if (this.props) {
      this.state = {
        first_name: this.props.user[0].first_name,
        last_name: this.props.user[0].last_name,
        email: this.props.user[0].email,
        password: this.props.user[0].password,
        income: this.props.user[0].income,
      };
    }
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchUser(userId);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state) {
      window.location.href = "/dashboard/account";
    }
    axios
      .put(
        `https://simply-budget-backend.herokuapp.com/user/${localStorage.getItem(
          "userId"
        )}`,
        {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          // password: this.state.password,
          income: this.state.income,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.href = "/dashboard/account";
      })
      .catch(() => console.log("Fail"));
  };

  render() {
    return (
      <Form className="w-100 p-3">
        <Row>
          <Col style={{ borderBottom: "1px solid black" }}>
            <h5>Personal Information</h5>
          </Col>
        </Row>
        <Row className="mt-3 mx-auto">
          <Col>
            <h4 className="m-0 p-0">First Name</h4>
            {this.props.user[0] && (
              <FormControl
                id="first_name"
                className="m-0 p-0"
                placeholder={this.props.user[0].first_name}
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
          <Col>
            <h4 className="m-0 p-0">Last Name</h4>
            {this.props.user[0] && (
              <FormControl
                className="m-0 p-0"
                id="last_name"
                placeholder={this.props.user[0].last_name}
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
        </Row>
        <Row className="mx-auto pt-2 m-0">
          <Col>
            <h4 className="m-0 p-0">Email</h4>
            {this.props.user[0] && (
              <FormControl
                id="email"
                type="email"
                placeholder={this.props.user[0].email}
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
          <Col>
            <h4 className="m-0 p-0">Income</h4>
            {this.props.user[0] && (
              <FormControl
                id="income"
                className="m-0 p-0"
                placeholder={this.props.user[0].income}
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
          <Col>
            <h4 className="m-0 p-0">Password</h4>
            {this.props.user[0] && (
              <FormControl
                className="m-0 p-0"
                id="password"
                type="password"
                placeholder="*******"
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
        </Row>
        <Form.Group className="d-flex justify-content-center">
          <Button className="m-4" variant="contained" type="submit">
            Back
          </Button>
          <Button
            className="m-4 text-white"
            variant="contained"
            type="submit"
            style={{ backgroundColor: "rgb(71, 117, 62)" }}
            onClick={this.handleSubmit}
          >
            <b>Save</b>
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const inputStyle = {
  border: "none",
  borderRadius: "0px",
  borderBottom: "1.5px solid rgb(173, 173, 173)",
  color: "black",
  backgroundColor: "rgba(0, 0, 0, 0)",
  marginBottom: "20px",
};

export default connect(mapStateToProps, { fetchUser })(EditAccount);
