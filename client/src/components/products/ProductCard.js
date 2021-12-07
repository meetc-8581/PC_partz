import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import AuthContext from "../../context/AuthContext";

function ProductCard(props) {
  var image = `http://localhost:3000/images/no-thumbnail-medium`;
  // if (props.product.images[0] !== undefined) {
  //   image = `http://localhost:3000/images/${props.product.images[0]}`;

  // }

  const { getLoggedIn, isAdmin } = useContext(AuthContext);

  async function handleAddtocart() {
    const cartRes = await axios.post(
      `http://localhost:3000/cart/add/${props.product._id}`,
      { hello: "hello" },
      {
        withCredentials: true,
      }
    );
    console.log(cartRes.data);
  }

  const inventorytxt = (invt) => {
    if (invt === 0) {
      return `Out of Stock`;
    } else if (invt <= 5) {
      return `Only ${invt} left in Stock!`;
    } else {
      return "In Stock";
    }
  };
  var { product } = props;

  var { brand, model, category, _id, inventory } = product;

  return (
    <div className="row border-bottom border-1 mb-2 p-3">
      <div className="col-md-4 ">
        <Link to={`/product/${_id}`}>
          <div className="card-image">
            <img src={image} alt="hello" className="max-vw-5"></img>
          </div>
        </Link>
      </div>
      <div className="col-md-5">
        <Link to={`/product/${_id}`} className="text-decoration-none text-dark">
          <div className="card border-0">
            <div className="card-body">
              <h5 className="card-title">{model}</h5>
              <div className="card-text">
                <h6>{brand}</h6>
                <h6>{category.toUpperCase()}</h6>
              </div>
              <div className="card-text">
                <span className={inventory > 5 ? "" : "text-danger"}>
                  {inventorytxt(inventory)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-3 card border-0">
        <div className="card-body">
          <div className="card-title fw-bolder">
            <h5>$ {props.product.price}</h5>
          </div>
          <div className="card-text my-1">
            <button className="btn btn-primary" onClick={handleAddtocart}>
              Add to Cart
            </button>
          </div>
          <div className="card-text my-1">
            <a href="/products" className="btn btn-warning">
              Buy Now
            </a>
          </div>
          {isAdmin && (
            <div className="card-text my-1">
              <Link to={`/admin/update/${_id}`} className="btn btn-warning">
                Update
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

//reactstrap
//checkboxtree
//momnt.js
//
