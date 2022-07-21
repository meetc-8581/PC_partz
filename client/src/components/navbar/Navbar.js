import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [cartProductsCount, setCartProductsCount] = useState(0);

  const { isAdmin, loggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleLogout() {
    await axios.get("/login/logout", {
      withCredentials: true,
    });

    navigate("/");
  }

  useEffect(() => {
    async function getTotalProducts() {
      const totalproducts = await axios.get("/cart/totalproducts", {
        withCredentials: true,
      });
      if (loggedIn) setCartProductsCount(totalproducts.data);
    }
    getTotalProducts();
  }, [loggedIn]);

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
              {isAdmin === true && (
                <Link to="/admin">
                  <div className="dropdown-item">
                    <button className="btn btn-warning w-100">Add item</button>
                  </div>
                </Link>
              )}
            </div>

            <Link to={loggedIn ? "/cart" : "/login"}>
              <button type="button" className="btn btn-light">
                <span className="bi bi-cart3 fs-3">
                  <span className="position-absolute top-0 mt-2 right-100 badge rounded-pill bg-danger fw-lighter">
                    {cartProductsCount}
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
