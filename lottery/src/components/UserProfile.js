import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { Loading } from "./Loading";
import "./Employee.css";
import { updateEmployee } from "../Redux/ActionCreator";
import { connect } from "react-redux";
import { backEndURL } from "../shared/baseUrl";
import axios from "axios";
// import bcrypt from "bcrypt";

const mapDispatchToProps = (dispatch) => ({
  // updateEmployee: (editId, Editedemployee) =>
  //   dispatch(updateEmployee(editId, Editedemployee)),
});

export function UserProfile({ isLoading, errorMess, updateUser }) {
  //truyền data fetch từ server truyền vào props
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await axios.get(backEndURL + "user", {
        withCredentials: true,
      });
      console.log(
        "🚀 ~ file: UserProfile.js ~ line 25 ~ fetchUserData ~ userData",
        userData
      );
      setUser(userData.data);
    };
    fetchUserData();
  }, []);

  const EmployeeDetail = () => {
    const [updatedUser, setUpdatedUser] = useState(user);
    const [isMedium, setIsMedium] = useState(false);

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [cfPassword, setCfPassword] = useState('')

    const [infoMessage, setInfoMessage] = useState(null)

    const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    const checkPassword = (password) => {
      if(mediumPassword.test(password)) {
        return setIsMedium(true)
      }
      return setIsMedium(false)
    };

    if (isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (errorMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{errorMess}</h4>
          </div>
        </div>
      );
    } else if (user != null) {
      console.log(
        "🚀 ~ file: UserProfile.js ~ line 52 ~ EmployeeDetail ~ user",
        user
      );     
      
      const handleChangePassword = (e) => {
        e.preventDefault();
        if(newPassword === cfPassword){
          //check old passwod
          axios.post(backEndURL + 'user/password', {oldPassword: oldPassword, newPassword: newPassword}, {withCredentials: true}).then((response) => {
            setInfoMessage(response.data.infoMess)
            setOldPassword('');
            setNewPassword('');
            setCfPassword('');
            console.log("🚀 ~ file: UserProfile.js ~ line 84 ~ axios.post ~ response.data", response.data)
          }).then(() => {
            
           
          })
        }
      };

      

      return (
        <div className="staff row container">
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <Link to="/veso">User Profile</Link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>{user.username}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          <div className="col-12 col-md-4 col-lg-3"></div>
          <div className="col-12 col-md-8 col-lg-9">
            <h3>Thông Tin User</h3>            
            <p>
              <b>Username</b>: {user.username} <br />
              <b>Email</b>: {user.email} <br />
              <b>Phone</b>: {user.phone} <br />
            </p>
            <hr />
           { /*<h3>Cập nhật thông tin user</h3>
            <form onSubmit={handleSubmitUser}>
              <label htmlFor="username" className="row container">
                Username:
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label htmlFor="email" className="row container">
                Email:
                <input
                  type="text"
                  name="email"
                  value={updatedUser.email}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label htmlFor="phone" className="row container">
                Phone:
                <input
                  type="number"
                  name="phone"
                  value={updatedUser.phone}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <button type="submit">update</button>
      </form>*/}

            <h4 className="my-3">Thay đổi Mật Khẩu</h4>
            {infoMessage && <div className="text-warning">{infoMessage}</div>}
            <form onSubmit={handleChangePassword}>
              <label htmlFor="password" className="row container">
                Password hiện tại:
                <input
                  type="password"
                  name="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </label>
              <label htmlFor="newPassword" className="row container">
                Password mới:
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => {
                    checkPassword(e.target.value)
                    setNewPassword(e.target.value)}}
                />
              </label>
              {newPassword.length > 0 && (isMedium ? <div className="text-success ">Độ Mạnh Trung Bình</div> : <div className="text-danger">Độ Mạnh Yếu</div>) }
              <label htmlFor="cfPassword" className="row container">
                Xác nhận Password:
                <input
                  type="password"
                  name="cfPassword"
                  value={cfPassword}
                  onChange={(e) => setCfPassword(e.target.value)}
                />
              </label>
              {cfPassword.length !== 0 && (newPassword === cfPassword ? <div className="text-success">Trùng khớp</div> : <div className="text-danger">Chưa trùng khớp</div>)}
              <button className='my-3 btn btn-warning' type="submit">Change Password</button>
            </form>
            <h4>Độ mạnh của mật khẩu</h4>
            <ul>
            <li>ít nhất 8 ký tự</li>
            <li>Có chứa ký tự viết hoa</li>
            <li>Có chứa ký tự viết thường</li>
            <li>Có chứa ký tự chữ số</li>
            <li>Có chứa ký tự đặc biệt</li>
            </ul>
          </div>
        </div>
      );
    } else return <div></div>;
  };
  return <EmployeeDetail />;
}

export default connect(null, mapDispatchToProps)(UserProfile);
