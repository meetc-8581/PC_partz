import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import CartProductCard from "./CartProductCard";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState({ totalPrice: 0 });
  const [changed, setchanged] = useState(true);

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getCart() {
      const cartRes = await axios.get("/cart", {
        withCredentials: true,
      });

      setCart(cartRes.data);
      setProducts(cartRes.data.products);
    }

    getCart();
  }, [changed]);

  async function handlecheckout() {
    if (cart.totalPrice === 0) {
      alert("Not items in cart");
      return;
    }
    try {
      await axios.post(
        "/cart/checkout",
        { hello: "hello" },
        {
          withCredentials: true,
        }
      );

      await getLoggedIn();
      history("/checkout");
    } catch (err) {
      console.error(err);
      alert("Something's wrong");
    }
  }

  async function handleRemove(productId) {
    const cartRes = await axios.post(
      `/cart/remove/${productId}`,
      { hello: "hello" },
      {
        withCredentials: true,
      }
    );

    setCart(cartRes.data);
    setchanged(!changed);
  }

  // async function handleAddtocart(productId) {
  //   const cartRes = await axios.post(
  //     `/cart/add/${productId}`,
  //     { hello: "hello" },
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   setCart(cartRes.data);
  //   await getLoggedIn();
  //   history("/cart");
  // }

  return (
    <div className="container px-5">
      <div className="row">
        <div className="col-md-8 px-2">
          {products.length === 0 && (
            <div className="text-center m-5">
              <h3>Cart Empty</h3>
            </div>
          )}
          {products.map(function (product, i) {
            return (
              <CartProductCard
                productId={product.productId}
                quantity={product.quantity}
                setCart={setCart}
                setchanged={setchanged}
                changed={changed}
                key={i}
                handleRemove={handleRemove}
                // handleAddtocart={handleAddtocart}
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
                className="btn btn-warning w-100"
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
