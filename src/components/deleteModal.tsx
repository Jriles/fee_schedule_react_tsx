import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type Callback = (id:string) => any;
interface Props {
    header: string,
    message: string,
    resourceId: string,
    callback: Callback,
}

export default function ModalComp(props:Props) {  
    const [visible, setVisible] = React.useState(false);
    const handleOpen = () => (setVisible(true));
    const handleClose = () => (setVisible(false));

    async function handleContinue() {
      handleClose();
      await props.callback(props.resourceId);
      refreshPage();
    }

    function refreshPage() {
      window.location.reload();
    }
  
    return (
      <>
        <Button
          className="float-end btn-danger"
          onClick={handleOpen}>
              Delete
        </Button>
        <Modal show={visible} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {handleContinue()}}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}