import React from "react";
import { backEndURL } from "../shared/baseUrl.js";
import { useState } from "react";
import axios from "axios";

function SignUp(props) {
  const [user, setUser] = useState({
    email: "",
    passwords: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    axios
      .post(backEndURL + "authen/login", user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto w-25">      
    <label htmlFor="username" className="row container">
      Username:
      <input
        type="text"
        name="username"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </label>
    <label htmlFor="email" className="row container">
      Email:
      <input
        type="text"
        name="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </label>
    <label htmlFor="password" className="row container">
      Password:
      <input
        type="password"
        name="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
    </label>
    <label htmlFor="cfpassword" className="row container">
      Confirm Password:
      <input
        type="password"
        name="cfpassword"        
      />
    </label>
    <button className="btn my-3 ms-2"type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
