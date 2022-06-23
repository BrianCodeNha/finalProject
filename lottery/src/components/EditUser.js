import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { Loading } from "./Loading";
import "./Employee.css";
import {  updateEmployee, updateUser } from "../Redux/ActionCreator";
import { connect } from "react-redux";
import { backEndURL } from "../shared/baseUrl";

const mapDispatchToProps = (dispatch) => ({
  updateUser: (editId, Editedemployee) =>
    dispatch(updateUser(editId, Editedemployee)),
});

export function EditUser(props) {
  //truyền data fetch từ server truyền vào props

  const EmployeeDetail = () => {

    const [updateUser, setUpdateUser] = useState({
      username: props.staff.username,
      email: props.staff.email,
      password: props.staff.password,
      phone: props.staff.phone,
      role: props.staff.role,
      id: props.staff._id,
    });
    console.log("🚀 ~ file: EditUser.js ~ line 28 ~ EmployeeDetail ~ updateUser", updateUser)


    if (props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (props.errorMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{props.errorMess}</h4>
          </div>
        </div>
      );
    } else if (props.staff != null) {
           

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log( 'update user',updateUser);
        console.log('function',props.updateUser)
        props.updateUser(updateUser.id, updateUser);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        return setUpdateUser({ ...updateUser, [name]: value });
      };

      return (
        <div className="staff row container">
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <Link to="/admin/user">Quản Lý Users</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>{props.staff.username}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <div className="col-12 col-md-4 col-lg-3"></div>
          <div className="col-12 col-md-8 col-lg-9">
            <h3>Username: {props.staff.username}</h3>
            <p>
              Email: {props.staff.email}
              <br />
              Phone: {props.staff.phone}
              <br />
              Role: {props.staff.role}
              <br />
              Passwords: <input type="password" value={props.staff.password} editable='false' readOnly={true} />
            </p>
            
            <hr />
            <h3>Cập nhật thông tin USER</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="number" className="row container">
                Username:
                <input
                  type="text"
                  name="username"
                  value={updateUser.username}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label htmlFor="producer" className="row container">
                Email:
                <input
                  type="text"
                  name="email"
                  value={updateUser.email}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label htmlFor="date" className="row container">
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={updateUser.phone}
                  onChange={(e) => handleChange(e)}
                />
              </label>             
              <button type="submit">update</button>
            </form>
          </div>
        </div>
      );
    } else return <div></div>;
  };
  return <EmployeeDetail />;
}

export default connect(null, mapDispatchToProps)(EditUser);
