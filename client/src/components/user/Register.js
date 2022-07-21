import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [address, setAddress] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function register(e) {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords should match");
      return;
    }
    if (password.length <= 8) {
      alert("Passwords too short");
      return;
    }
    try {
      const registerData = {
        name,
        email,
        password,
        address,
      };

      // const res =
      await axios.post("/signin", registerData, {
        withCredentials: true,
      });

      await getLoggedIn();
      history("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mt-5 m-auto text-center">
      <div className="">
        <h2>Join PC partz Store</h2>
        <h4>A world of better Computing.</h4>
      </div>
      <form onSubmit={register} className="w-25 m-auto mt-4 fs-5">
        <div className="form d-block text-start">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="emailAddress"
              className="form-control"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              className="form-control"
              placeholder="password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              type="textarea"
              name="address"
              className="form-control"
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="">
          <button type="submit" className="btn btn-primary btn-lg">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
