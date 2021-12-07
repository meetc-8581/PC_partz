import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import CartProductCard from "./CartProductCard";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState({});
  const [changed, setchanged] = useState(true);

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  const [products, setProducts] = useState([]);

  const [enableCheckout, setEnableCheckout] = useState(true);

  useEffect(() => {
    async function getCart() {
      const cartRes = await axios.get("http://localhost:3000/cart", {
        withCredentials: true,
      });
      // console.log(cartRes.data[0]);
      setCart(cartRes.data);
      console.log("useeffect", cartRes.data.products[1]);
      setProducts(cartRes.data.products);
    }

    getCart();
  }, []);

  function checkProducts() {
    products.map(function (product, i) {
      console.log(product.productId);
      return <div>hello</div>;
      // <CartProductCard
      //   productId={product.productId}
      //   quantity={cart.products[i].quantity}
      // ></CartProductCard>
    });
  }

  async function handlecheckout() {
    try {
      const res = await axios.post(
        "http://localhost:3000/cart/checkout",
        { hello: "hello" },
        {
          withCredentials: true,
        }
      );

      await getLoggedIn();
      history("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container px-5">
      <div className="row">
        <div className="col-md-8 px-2">
          {products.map(function (product, i) {
            return (
              <CartProductCard
                productId={product.productId}
                quantity={product.quantity}
                setCart={setCart}
                setchanged={setchanged}
                changed={changed}
              ></CartProductCard>
            );
          })}
        </div>
        {/* <CartProductCard productId={products[0].productId} /> */}
        <div className="col-md-1 px-2"></div>
        <div className="col-md-3 px-2">
          {/* Here you get checkout and Price */}
          <div className="card-body">
            <div className="card-title fw-bolder">
              <h5>$ {cart.totalPrice}</h5>
            </div>
            <div className="card-text my-1 text-center">
              <button
                className={
                  enableCheckout
                    ? "btn btn-warning w-100"
                    : "btn btn-warning w-100 disabled"
                }
                role="button"
                onClick={handlecheckout}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
