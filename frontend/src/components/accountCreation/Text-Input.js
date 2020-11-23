import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";

export default class TextIncome extends Component {
  render() {
    return (
      <Col className="mb-4">
        <InputGroup className="mb-2">
          <Form.Control
            placeholder={this.props.placeholder}
            style={inputStyle}
            onChange={this.props.handleChange}
            id={this.props.id}
          />
        </InputGroup>
      </Col>
    );
  }
}

const inputStyle = {
  border: "none",
  borderRadius: "0px",
  borderBottom: "1.5px solid rgb(173, 173, 173)",
  color: "black",
  backgroundColor: "rgba(0, 0, 0, 0)",
};
