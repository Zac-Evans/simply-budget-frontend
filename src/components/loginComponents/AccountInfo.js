import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class AccountInfo extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.fetchUser(userId);
  }

  render() {
    return (
      <div className="p-3 w-100">
        <Row>
          <Col style={{ borderBottom: "1px solid black" }}>
            <h5>Personal Information</h5>
          </Col>
        </Row>
        <Row className="mt-3 mx-auto ">
          <Col>
            <h4>First Name</h4>
            {this.props.user[0] && <p>{this.props.user[0].first_name}</p>}
          </Col>
          <Col>
            <h4>Last Name</h4>
            {this.props.user[0] && <p>{this.props.user[0].last_name}</p>}
          </Col>
        </Row>
        <Row className="mx-auto">
          <Col>
            <h4>Email</h4>
            {this.props.user[0] && <p>{this.props.user[0].email}</p>}
          </Col>
          <Col>
            <h4>Income</h4>
            {this.props.user[0] && <p>${this.props.user[0].income}/month</p>}
          </Col>
          <Col>
            <h4>Password</h4>
            <p>*******</p>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { fetchUser })(AccountInfo);
