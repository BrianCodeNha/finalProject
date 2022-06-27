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
      <button onClick={handleShow} className="btn btn-danger my-2 px-2">
        Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {signal === 'veso' && (`bạn có chắc chắn xoá dự liệu Vé Số: Đài: ${staff.producer} - số: ${staff.number}`)} 
          {signal === 'vedo' && (`bạn có chắc chắn xoá dự liệu Vé Dò: Đài: ${staff.producer} - xổ số ngày: ${staff.date}`)} 
          {(signal === 'user' && role === 'admin') && (`bạn có chắc chắn xoá dự liệu: username: ${staff.userName} - email: ${staff.email}`)} 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {              
              return deleteEmployee(staff._id , signal === 'veso' ? staff.number : signal === 'vedo' ? staff.date : staff.userName, signal === 'veso' ? staff.producer : signal === 'vedo' ? staff.producer: staff.email);
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
