import axios from "axios";
import React, { useEffect, useState } from "react";

function CartProductCard(props) {
  const [product, setProduct] = useState({});
  const [changed, setchanged] = useState(true);

  useEffect(() => {
    async function getproduct() {
      const cartRes = await axios.get(
        `http://localhost:3000/products/${props.productId}`,
        {
          withCredentials: true,
        }
      );
      console.log(cartRes.data);
      setProduct(cartRes.data[0]);
    }
    getproduct();
  }, [changed]);

  async function handleAddtocart() {
    const cartRes = await axios.post(
      `http://localhost:3000/cart/add/${props.productId}`,
      { hello: "hello" },
      {
        withCredentials: true,
      }
    );
    console.log(cartRes.data);
    props.setCart(cartRes.data);
    props.setchanged(!props.changed);
  }
  async function handleReducefromcart() {
    const cartRes = await axios.post(
      `http://localhost:3000/cart/reduce/${props.productId}`,
      { hello: "hello" },
      {
        withCredentials: true,
      }
    );
    console.log(cartRes.data);
    props.setCart(cartRes.data);
    props.setchanged(!props.changed);
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

  console.log(props);
  var image = `http://localhost:3000/images/no-thumbnail-medium`;
  return (
    <div className="row border-bottom border-1 mb-2 p-3">
      <div className="col-md-4 ">
        <a href="/product">
          <div className="card-image">
            <img src={image} alt="hello" className="max-vw-5"></img>
          </div>
        </a>
      </div>
      <div className="col-md-5">
        <a href="/product" className="text-decoration-none text-dark">
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
        </a>
      </div>

      <div className="col-md-3 card border-0">
        <div className="card-body">
          <div className="card-title fw-bolder">
            <h5>$ {product.price}</h5>
          </div>
          <div className="card-text my-1">
            <div class="btn-group mr-2" role="group" aria-label="First group">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={handleAddtocart}
              >
                +
              </button>
              <button type="button" class="btn btn-secondary">
                {props.quantity}
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={handleReducefromcart}
              >
                -
              </button>
            </div>
          </div>
          <div className="card-text my-1">
            <a remove className="btn btn-danger">
              Remove
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
