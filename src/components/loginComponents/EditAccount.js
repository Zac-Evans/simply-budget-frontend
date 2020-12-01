import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

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
      <Form style={{ width: "700px", margin: "auto" }}>
        <Row>
          <Col style={{ borderBottom: "1px solid black" }}>
            <h5>Personal Information</h5>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h4>First Name</h4>
            {this.props.user[0] && (
              <FormControl
                id="first_name"
                placeholder={this.props.user[0].first_name}
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
          <Col>
            <h4>Last Name</h4>
            {this.props.user[0] && (
              <FormControl
                id="last_name"
                placeholder={this.props.user[0].last_name}
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Email</h4>
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
            <h4>Income</h4>
            {this.props.user[0] && (
              <FormControl
                id="income"
                placeholder={this.props.user[0].income}
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
          <Col>
            <h4>Password</h4>
            {this.props.user[0] && (
              <FormControl
                id="password"
                type="password"
                placeholder="*******"
                onChange={this.handleChange}
                style={inputStyle}
              />
            )}
          </Col>
        </Row>
        <Button className="mb-3" onClick={this.handleSubmit}>
          Save
        </Button>
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
