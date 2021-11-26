import React from "react";
import "./Navbar.css";

function Navbar(props) {
  //   const [category, setcategory] = useState([]);

  let textInput = React.createRef();

  let handleClick = (e) => {
    console.log(textInput.current.value);
    props.setQuery(textInput.current.value);
  };

  //   async function getCategories() {
  //     const categoryRes = axios.get("http://localhost:3000/products/catrgory");
  //     setcategory(categoryRes.data);
  //   }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <b>PC partz Store</b>
          </a>
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="search">
                  <i className="bi bi-search"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    ref={textInput}
                  />
                  <button className="btn btn-primary" onClick={handleClick}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <a href="/">
            <button type="button" className="btn btn-light">
              <h3>
                <i className="bi bi-cart3"></i>
              </h3>
            </button>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
