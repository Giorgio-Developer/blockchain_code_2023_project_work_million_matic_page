import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function InfoModal(props: any) {

  const handleClose = () => {props.clickCloseButton()} ; 

  return (
    <div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
       <Modal show={props.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Info Modal</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="imageUrlForm">
                <Form.Label>Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="image.png"
                  name="imageUrlControl"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>

        </Modal>
      </div>
    </div>
  );
}
