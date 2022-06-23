import React from "react";
import { backEndURL } from "../shared/baseUrl.js";
import { useState } from "react";
import axios from "axios";

function Login(props) {
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
    <label htmlFor="producer" className="row container">
      Email:
      <input
        type="text"
        name="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </label>
    <label htmlFor="date" className="row container">
      Password:
      <input
        type="password"
        name="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
    </label>
    <button className="btn my-3 ms-2"type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
