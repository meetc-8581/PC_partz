import React from "react";
import "./Navbar.css";

function Navbar(props) {
  let textInput = React.createRef();

  let handleClick = (e) => {
    console.log(textInput.current.value);
    props.setQuery(textInput.current.value);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fw-bolder fs-2" href="/">
            <b>PC partz Store</b>
          </a>
          {/* <div>
            <Dropdown category={category} />
          </div> */}
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="search">
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search pc parts"
                    ref={textInput}
                  />
                  <button className="btn btn-primary p-1" onClick={handleClick}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <a href="/">
            <button type="button" className="btn btn-light">
              <span className="bi bi-cart3 fs-3">
                <span className="position-absolute top-0 mt-2 right-100 badge rounded-pill bg-danger fw-lighter">
                  0
                </span>
              </span>
            </button>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
