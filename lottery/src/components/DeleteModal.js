import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteModal({ staff, deleteEmployee, signal, role }) {
  //modal xac nhan delete
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <button onClick={handleShow} className="btn-danger my-1">
        Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {signal === 'veso' && (`bạn có chắc chắn xoá dự liệu: Đài: ${staff.producer} - số: ${staff.number}`)} 
          {(signal === 'user' && role === 'admin') && (`bạn có chắc chắn xoá dự liệu: username: ${staff.userName} - email: ${staff.email}`)} 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {              
              return deleteEmployee(staff._id , signal === 'veso' ? staff.number : staff.userName, signal === 'veso' ? staff.producer : staff.email);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteModal;
