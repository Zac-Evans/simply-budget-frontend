import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function FailModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-center" style={{fontSize: "20px"}}>{props.errText}</Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: "rgb(71, 117, 62)"}} onClick={props.close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
