import React from "react";
import { backEndURL } from "../shared/baseUrl.js";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUp({ userStatus, loadUserStatus }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const history = useHistory();
  console.log("🚀 ~ file: SignUp.js ~ line 12 ~ SignUp ~ user", user);

  const [isSubmit, setIsSubmit] = useState(false);
  console.log("🚀 ~ file: SignUp.js ~ line 15 ~ SignUp ~ isSubmit", isSubmit);
  const [errors, setErrors] = useState({});
  console.log("🚀 ~ file: SignUp.js ~ line 15 ~ SignUp ~ errors", errors);

  const validate = (value) => {
    if (value.username.length === 0) {
      setErrors({ ...errors, username: "Yêu cầu nhập username!!" });
      return setIsSubmit(false);
    }

    if (value.email.length === 0) {
      setErrors({ ...errors, email: "Yêu cầu nhập email!!" });
      return setIsSubmit(false);
    }

    if (value.phone.length === 0) {
      setErrors({ ...errors, phone: "Yêu cầu nhập phone!!" });
      return setIsSubmit(false);
    }

    setErrors({});
    console.log("🚀 ~ file: SignUp.js ~ line 35 ~ validate ~ value", value);
    return setIsSubmit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(user);
    if (isSubmit) {
      console.log("signup user");
      axios
        .post(backEndURL + "authen/signup", user)
        .then((response) => {
          console.log(
            "🚀 ~ file: Login.js ~ line 65 ~ .then ~ response",
            response.data
          );
          setUser({
            username: "",
            email: "",
            phone: "",
          });

          if (!userStatus.errorMess) {
            loadUserStatus(response.data);
            setTimeout(() => {
              userStatus.infoMess = '';  
             return history.push("/login")
            }, 700);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h3 className="d-flex justify-content-center my-3">Đăng Ký</h3>
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
        <label htmlFor="username" className="row container">
          Username:
          <input
            type="text"
            name="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        {errors.username && (
          <div className="text-danger px-3">{errors.username}</div>
        )}
        <label htmlFor="email" className="row container">
          Email:
          <input
            type="text"
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        {errors.email && <div className="text-danger px-3">{errors.email}</div>}
        <label htmlFor="phone" className="row container">
          Phone:
          <input
            type="number"
            name="phone"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </label>
        {errors.phone && <div className="text-danger px-3">{errors.phone}</div>}

        <button className="btn my-3 ms-2" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
