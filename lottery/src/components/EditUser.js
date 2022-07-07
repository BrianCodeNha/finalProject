import React, { useEffect, useState } from "react";
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

const mapStateToProps = (state) => ({
  users: state.users,
});

export function EditUser(props) {
  //truyền data fetch từ server truyền vào props
  console.log("🚀 ~ file: EditUser.js ~ line 17 ~ users", props.users)

  const EmployeeDetail = () => {

    const data = window.sessionStorage.getItem('userData')
    const [userData, setUserData] = useState(props.staff ? props.staff : JSON.parse(data));
    

    useEffect(() => {
      props.staff !== undefined &&  window.sessionStorage.setItem('userData', JSON.stringify(props.staff)); 
      console.log('create localStorage')
      setUserData(JSON.parse(data));      
                   
    },[])
    const [updateUser, setUpdateUser] = useState({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      role: userData.role,
      id: userData._id,
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
              <b>Email:</b> {props.staff.email}
              <br />
              <b>Phone:</b> {props.staff.phone}
              <br />
              <b>Role:</b> {props.staff.role}              
            </p>
            
            <hr />
            <h3>Cập nhật thông tin USER</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="number" className="row container fw-bold">
                Username:
                <input
                  type="text"
                  name="username"
                  value={updateUser.username}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label htmlFor="producer" className="row container fw-bold">
                Email:
                <input
                  type="text"
                  name="email"
                  value={updateUser.email}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label htmlFor="phone" className="row container fw-bold">
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={updateUser.phone}
                  onChange={(e) => handleChange(e)}
                />
              </label>             
              {(props.staff.role === 'user') && <label htmlFor="role" className="row container">
                Role:
                <select name='role' onChange={(e) => handleChange(e)}>
                  <option>user</option>
                  <option>admin</option>
                </select>
              </label>}             
              <button className='btn btn-warning my-3' type="submit">update</button>
            </form>
          </div>
        </div>
      );
    } else return <div></div>;
  };
  return <EmployeeDetail />;
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
