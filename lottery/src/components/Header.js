import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//style
import "./Header.css";
import axios from "axios";

export default function Header({ userStatus, loadUserStatus }) {

  const history = useHistory();
 
  const logout = () => {
    console.log('logout');
   axios.get("http://localhost:5000/authen/logout").then(async (response) => {
     await loadUserStatus(response.data)
      alert('Đăng xuất thành công');
     return history.push('/');
    });
  };
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#D9D9D9", paddingLeft: "10px" }}
    >
      <Navbar.Toggle className="me-auto" aria-controls="basic-navbar-nav">
        <i className="fa fa-bars" />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink
            to="/"
            style={{
              borderRadius: 25,
              backgroundColor: "#FEFEFE",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <i className="fa fa-home"></i> Dò vé số
          </NavLink>
          {userStatus.isLoggedIn && (
            <>
              <NavLink
                to="/veso"
                style={{
                  borderRadius: 25,
                  backgroundColor: "#FEFEFE",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <i className="fa fa-money-check"></i> Quản Lý Vé Số
              </NavLink>

              {userStatus.role === "admin" && (
                <NavLink
                  to="/admin/user"
                  style={{
                    borderRadius: 25,
                    backgroundColor: "#FEFEFE",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <i className="fa fa-users "></i> Quản Lý User
                </NavLink>
              )}
            </>
          )}
        </Nav>
        <Nav style={{ paddingRight: "20px" }}>
          {userStatus.isLoggedIn && (
            <NavLink
              onClick={logout}
              to="#"
              style={{
                borderRadius: 25,
                backgroundColor: "#FEFEFE",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <i class="far fa-user"></i> Logout
            </NavLink>
          )}
          {!userStatus.isLoggedIn && (
            <>
              <NavLink
                to="/signup"
                style={{
                  borderRadius: 25,
                  backgroundColor: "#FEFEFE",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <i className="fa fa-user-plus"></i> Sign Up
              </NavLink>

              <NavLink
                to="/login"
                style={{
                  borderRadius: 25,
                  backgroundColor: "#FEFEFE",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <i className="fa fa-user"></i> Login
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
