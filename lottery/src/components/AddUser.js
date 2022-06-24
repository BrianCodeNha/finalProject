import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { Label, Input } from "reactstrap";


export default function AddUser({ postUser }) {
  // on off modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };
  

  // user object
  const initialState = {   
    username: "",
    email: "",
    password: "",
    phone: "",
    role: 'user',
    active: true,
  };

  const [newUser, setNewUser] = useState(initialState);

  const [isSubmit, SetIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({ });

  //add form data to state

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });
    console.log(newUser);
  };

  // validate form

  const validate = (values) => {
    const errors = {};
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!values.username) {
      errors.username = "Yêu cầu nhập";
    } else if (values.username.length < 3) {
      errors.username = "Yêu cầu tối thiểu 2 ký tự";
    }

    if (!values.email) {
      errors.email = "Yêu cầu nhập";
    } else if (!values.email.match(mailformat)){
      errors.email = 'email không hợp lệ'
    }   

    if (!values.phone) {
      errors.phone = "Yêu cầu nhập";
    }  
    
    if (!values.password) {
      errors.password = "Yêu cầu nhập";
    }  

    return errors;
  };

  // submit new Employee function

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(newUser));
    SetIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      
      handleClose();           
      postUser(newUser);
      console.log("🚀 ~ file: AddUser.js ~ line 78 ~ handleSubmit ~ newUser", newUser)
      setNewUser(initialState);
      
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa fa-plus" /> Thêm User mới
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row">
              <Label htmlFor="username" md={4}>
                Username
              </Label>
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  value={newUser.username}
                />
                <div style={{ color: "#dc3545" }}>{formErrors.username}</div>
              </Col>
            </div>

            <div className="row">
              <Label htmlFor="email" md={4}>
                Email
              </Label>
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  value={newUser.email}
                />                
                <div style={{ color: "#dc3545" }}>{formErrors.email}</div>
              </Col>
            </div>           
           
            <div className="row">
              <Label htmlFor="phone" md={4}>
                Phone
              </Label>             
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="phone"
                  value={newUser.phone}
                />
                <div style={{ color: "#dc3545" }}>{formErrors.phone}</div>              
                </Col>             
            </div>                       
                                  
            <div className="row">
              <Label htmlFor="password" md={4}>
                Password
              </Label>             
              <Col md={7}>
                <Input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={newUser.password}
                />
                <div style={{ color: "#dc3545" }}>{formErrors.password}</div>              
                </Col>             
            </div>
            
            <div className="row">
              <Label htmlFor="role" md={4}>
                Role
              </Label>             
              <Col md={7}>
                <select
                  onChange={handleChange}                  
                  id="role"
                  name="role"
                  className="w-100"              
                  value={newUser.role}  
                >
                <option>user</option>
                <option>admin</option>
                </select>
                <div style={{ color: "#dc3545" }}>{formErrors.role}</div>              
                </Col>             
            </div> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => setNewUser(initialState)}>
              Reset
            </Button>
            <Button variant="primary" type="submit">
              Thêm User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
