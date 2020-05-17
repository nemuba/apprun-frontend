import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {hideModalConfirmation} from './../../../store/ducks/ModalConfirmation'

const ModalConfirmation = ({handleDelete}) => {

  const {show, title, message, id} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const handleClose = () =>{
    dispatch(hideModalConfirmation());
  }

  const handleConfirmation = () =>{
    handleDelete(id);
    dispatch(hideModalConfirmation());
  }

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handleClose()}>
          Cancelar
        </Button>
        <Button variant="success" onClick={() => handleConfirmation()}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmation;
