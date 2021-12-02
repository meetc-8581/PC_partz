import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function login(e) {
    e.preventDefault();
    console.log("login exec");
    try {
      const loginData = {
        email,
        password,
      };

      const res = await axios.post("http://localhost:3000/login", loginData);
      console.log(res.headers);
      await getLoggedIn();
      // history("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="base-container mt-5 position-relative">
      <form onSubmit={login}>
        <div className="header">Login</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn1">
            Login
          </button>
        </div>
      </form>
      <div className="page-title">
        Forgot password?
        <a style={{ textDecoration: "underline", color: "blue" }} href="/login">
          Reset
        </a>
        <br></br>
        Don't have an account?
        <a
          style={{ textDecoration: "underline", color: "blue" }}
          href="/register"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Login;
