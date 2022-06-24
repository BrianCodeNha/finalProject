import React from "react";
import { backEndURL } from "../shared/baseUrl.js";
import { useState } from "react";
import axios from "axios";

function SignUp(props) {
  const [user, setUser] = useState({
    username: '',
    email: "",
    password: "",
    cfpassword: "",
    phone: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (value) => {
    if (value.username.length === 0) {
      setErrors({ ...errors, username: "Yêu cầu nhập username!!" });
      setIsSubmit(false);
    }
    
    if (!value.email.length === 0) {
      setErrors({ ...errors, email: "Yêu cầu nhập email!!" });
      return setIsSubmit(false);
    }

    if (!value.cfpassword.length === 0) {
      setErrors({ ...errors, cfpassword: "Yêu cầu nhập confirm password!!" });
      return setIsSubmit(false);
    }
    
    if (!value.password.length === 0) {
      setErrors({ ...errors, password: "Yêu cầu nhập password!!" });
      return setIsSubmit(false);
    }
    
    console.log("🚀 ~ file: SignUp.js ~ line 35 ~ validate ~ value", value)
    return setIsSubmit(true);
  };

  const handleSubmit = (e) => {
    console.log("signup user");
    e.preventDefault();
    validate(user);
    if (isSubmit && !errors) {
    axios
      .post(backEndURL + "authen/login", user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <div>
    <h3 className="d-flex justify-content-center my-3">Đăng Ký</h3>
      <form onSubmit={handleSubmit} className="mx-auto w-25">      
    <label htmlFor="username" className="row container">
      Username:
      <input
        type="text"
        name="username"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </label>
    {errors.username && <div className="text-danger px-3">{errors.username}</div>}
    <label htmlFor="email" className="row container">
      Email:
      <input
        type="text"
        name="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </label>
    {errors.email && <div className="text-danger px-3">{errors.email}</div>}
    <label htmlFor="password" className="row container">
      Password:
      <input
        type="password"
        name="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
    </label>
    {errors.password && <div className="text-danger px-3">{errors.password}</div>}
    <label htmlFor="cfpassword" className="row container">
      Confirm Password:
      <input
        type="password"
        name="cfpassword"        
      />
    </label>
    {errors.cfpassword && <div className="text-danger px-3">{errors.cfpassword}</div>}
    <button className="btn my-3 ms-2"type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
