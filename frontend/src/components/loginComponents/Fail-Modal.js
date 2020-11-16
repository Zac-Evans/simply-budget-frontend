import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class FailModal extends Component {
  componentWillUnmount = () => {
    window.location.reload();
  }

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="text-center" style={{ fontSize: "20px" }}>
            {this.props.errText}
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ backgroundColor: "rgb(71, 117, 62)" }} onClick={this.props.close}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
