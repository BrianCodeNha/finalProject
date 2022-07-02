import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//style
import "./Header.css";
import axios from "axios";
import { backEndURL } from "../shared/baseUrl";

export default function Header({ userStatus, loadUserStatus }) {
  const history = useHistory();
  const location  = useLocation();
  const url = location.pathname

  const logout = () => {
    console.log("logout");
    axios.get(`${backEndURL}authen/logout`).then(async (response) => {
      await loadUserStatus(response.data);
      alert("Đăng xuất thành công");
      return history.push("/");
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
              backgroundColor: url === "/" ? 'ButtonHighlight' : "#FEFEFE",
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
                  backgroundColor: url === "/veso" ? 'ButtonHighlight' : "#FEFEFE",
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
                    backgroundColor: url === "/admin/user" ? 'ButtonHighlight' : "#FEFEFE",                    
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
            <>
              <NavLink
                to="/userprofile"
                style={{
                  borderRadius: 25,
                  backgroundColor: url === "/userprofile" ? 'ButtonHighlight' : "#FEFEFE",                  
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <i className="fa fa-id-card"></i> User Profile
              </NavLink>
              <NavLink
                onClick={logout}
                to="#"
                style={{
                  borderRadius: 25,
                  backgroundColor: 'ButtonShadow',
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <i className="fa fa-user"></i> Logout
              </NavLink>
            </>
          )}
          {!userStatus.isLoggedIn && (
            <>
              <NavLink
                to="/signup"
                style={{
                  borderRadius: 25,
                  backgroundColor: url === "/admin/user" ? 'ButtonHighlight' : "#FEFEFE",
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
                  backgroundColor: url === "/admin/user" ? 'ButtonHighlight' : "#FEFEFE",
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
