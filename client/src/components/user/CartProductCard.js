import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CartProductCard(props) {
  const [product, setProduct] = useState({});

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    async function getproduct() {
      const cartRes = await axios.get(`/products/${props.productId}`, {
        withCredentials: true,
      });

      setProduct(cartRes.data[0]);
    }
    getproduct();
  }, [props.productId]);

  async function handleAddtocart() {
    const cartRes = await axios.post(
      `/cart/add/${props.productId}`,
      { hello: "hello" },
      {
        withCredentials: true,
      }
    );

    props.setCart(cartRes.data);
    // await getLoggedIn();
    history("/cart");
  }

  async function handleReducefromcart() {
    const cartRes = await axios.post(
      `/cart/reduce/${props.productId}`,
      { hello: "hello" },
      {
        withCredentials: true,
      }
    );

    props.setCart(cartRes.data);
    // await getLoggedIn();
    history("/cart");
  }

  const inventory = (invt) => {
    if (invt === 0) {
      return `Out of Stock`;
    } else if (invt <= 5) {
      return `Only ${invt} left in Stock!`;
    } else {
      return "In Stock";
    }
  };

  var image = `/no-thumbnail-medium.jpg`;
  return (
    <div className="row border-bottom border-1 mb-2 p-3">
      <div className="col-md-4 ">
        <Link
          to={`/product/${props.productId}`}
          className="text-decoration-none text-dark"
        >
          <div className="card-image">
            <img src={image} alt="hello" className="max-vw-5"></img>
          </div>
        </Link>
      </div>
      <div className="col-md-5">
        <Link
          to={`/product/${props.productId}`}
          className="text-decoration-none text-dark"
        >
          <div className="card border-0">
            <div className="card-body">
              <h5 className="card-title">
                {product.brand} - {product.model}
              </h5>
              <div className="card-text">
                <h6>{product.category}</h6>
              </div>
              <div className="card-text">
                <span className={product.inventory > 5 ? "" : "text-danger"}>
                  {inventory(product.inventory)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="col-md-3 card border-0">
        <div className="card-body">
          <div className="card-title fw-bolder">
            <h5>$ {product.price}</h5>
          </div>
          <div className="card-text my-1">
            <div
              className="btn-group mr-2"
              role="group"
              aria-label="First group"
            >
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddtocart}
              >
                +
              </button>
              <button type="button" className="btn btn-secondary">
                {props.quantity}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReducefromcart}
              >
                -
              </button>
            </div>
          </div>
          <div className="card-text my-1">
            <button
              className="btn btn-danger"
              onClick={() => {
                props.handleRemove(props.productId);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
