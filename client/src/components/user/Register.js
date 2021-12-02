import React from "react";

const Register = () => {
  return (
    // <div className="container"
    <div className="container mt-5 m-auto text-center">
      <div className="">
        <h2>Join PC partz Store</h2>
        <h4>A world of better Computing.</h4>
      </div>
      <form className="w-25 m-auto mt-4 fs-5">
        <div className="form text-start">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="email"
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Confirm
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Contact Number
            </label>
            <input
              type="number"
              name="number"
              className="form-control"
              placeholder="number"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
};

export default Register;
