import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [dropdownActive, setDropdownActive] = useState(false);

  const { getLoggedIn, loggedIn } = useContext(AuthContext);

  const history = useNavigate();

  async function handleLogout() {
    const res = await axios.post("http://localhost:3000/login/logout", {
      withCredentials: true,
    });
    console.log(res.headers);
    await getLoggedIn();
    history("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fw-bolder fs-2" href="/">
            <b>PC partz Store</b>
          </a>
          <div>
            {loggedIn === true && (
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setDropdownActive(!dropdownActive);
                }}
              >
                <span className="bi bi-person-circle fs-3"></span>
              </button>
            )}
            {loggedIn === false && (
              <Link to={loggedIn ? "/" : "/login"}>
                <button type="button" className="btn btn-light">
                  <span className="bi bi-person-circle fs-3"></span>
                </button>
              </Link>
            )}

            <div
              className={
                dropdownActive ? "dropdown-menu d-block" : "dropdown-menu"
              }
            >
              <div className="dropdown-item">
                <button className="btn btn-danger w-100" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>

            <Link to={loggedIn ? "/cart" : "/login"}>
              <button type="button" className="btn btn-light">
                <span className="bi bi-cart3 fs-3">
                  <span className="position-absolute top-0 mt-2 right-100 badge rounded-pill bg-danger fw-lighter">
                    0
                  </span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
