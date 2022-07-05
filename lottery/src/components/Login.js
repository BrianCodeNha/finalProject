import React from "react";
import { backEndURL } from "../shared/baseUrl.js";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login({ userStatus, loadUserStatus }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const [isSubmit, setIsSubmit] = useState(false);
  console.log("🚀 ~ file: Login.js ~ line 14 ~ Login ~ isSubmit", isSubmit);
  const [errors, setErrors] = useState({});
  console.log("🚀 ~ file: Login.js ~ line 16 ~ Login ~ errors", errors);

  const validate = (value) => {
    if (value.email.length === 0) {
      return setErrors({ ...errors, email: "Yêu cầu nhập email!!" });
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.email)) {
      return setErrors({ ...errors, email: "Email bạn nhập không hợp lệ" });
    }

    if (value.password.length === 0) {
      return setErrors({ ...errors, password: "Yêu cầu nhập password!!" });
    }
    setErrors({})
    return setIsSubmit(true);
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {    

    console.log("submit");
    e.preventDefault();
    validate(user);
    if (isSubmit) {      
      console.log("logging");     
      axios
        .post(backEndURL + "authen/login", user)
        .then((response) => {
        console.log("🚀 ~ file: Login.js ~ line 65 ~ .then ~ response", response.data)
          
          loadUserStatus(response.data);
          setTimeout(() => history.push("/"), 700);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h3 className="d-flex justify-content-center my-3">Đăng Nhập</h3>
      {userStatus.errorMess && (
        <div className="text-danger d-flex justify-content-center">
          {userStatus.errorMess}
        </div>
      )}
      {userStatus.infoMess && (
        <div className="text-success d-flex justify-content-center">
          {userStatus.infoMess}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto w-25">
        <label htmlFor="producer" className="row container">
          Email:
          <input
            type="text"
            name="email"
            onChange={(e) =>
              setUser((preData) => ({ ...preData, email: e.target.value }))
            }
          />
        </label>
        {errors.email && <div className="text-danger px-3">{errors.email}</div>}
        <label className="row container" htmlFor="date">
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) =>
              setUser((preData) => ({ ...preData, password: e.target.value }))
            }
          />
        </label>
        {errors.password && (
          <div className="text-danger px-3">{errors.password}</div>
        )}
        <button className="btn my-3 ms-2" type="submit">
          Login
        </button>
      </form>
      <div className='d-flex justify-content-center'>
      admin: bluedrago999@gmail.com - pass: Chi09# 
      
      </div>
      <div className='d-flex justify-content-center'>
      user: lazytoeic@gmail.com - Pass: cHI09#

      
      </div>
    </div>
  );
}

export default Login;
