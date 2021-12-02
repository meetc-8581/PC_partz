import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css";

export function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fw-bolder fs-2" href="/">
            <b>PC partz Store</b>
          </a>
          <div>
            <Link to={loggedIn ? "/" : "/login"}>
              <button type="button" className="btn btn-light">
                <span className="bi bi-person-circle fs-3"></span>
              </button>
            </Link>
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
