import React from "react";
import { Button, Modal } from "react-bootstrap";

type Callback = () => void;
interface Props {
  component: any,
  header: string,
  btnName: string,
  btnClasses: string,
  callback: Callback
}

export default function ModalWComponent(props:Props) {  
    const [visible, setVisible] = React.useState(false);
    const handleOpen = () => (setVisible(true));
    const handleClose = () => (setVisible(false));
  
    return (
      <>
        <Button
          className={props.btnClasses}
          onClick={handleOpen}>
          {props.btnName}
        </Button>
        <Modal show={visible} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.header}</Modal.Title>
          </Modal.Header>
          {
            React.cloneElement(
              props.component,
              {callback: () => {
                props.callback();
                handleClose();
              }}
            )
          }
        </Modal>
      </>
    );
}