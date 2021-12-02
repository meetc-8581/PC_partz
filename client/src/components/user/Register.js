import React from "react";

const Register = () => {
  return (
    // <div className="container"
    <div className="base-container mt-5">
      <div className="header">Register</div>
      <div className="content">
        <div className="form">
          {/* <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" name="name" placeholder="name" />
          </div> */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="password" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Contact Number</label>
            <input
              type="number"
              name="number"
              placeholder="number"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" name="address" placeholder="address" />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="submit" className="btn1">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
