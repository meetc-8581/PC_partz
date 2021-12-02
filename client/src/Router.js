import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Products from "./components/products/Products";

import Navbar from "./components/navbar/Navbar";
import AuthContext from "./context/AuthContext";
import { Cart } from "./components/user/Cart";
import { Product } from "./components/product/Product";

function Router() {
  const { loggedIn, isAdmin } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Products />}></Route>
        <Route path="/product" element={<Product />}></Route>

        {loggedIn === false && (
          <>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/cart" element={<Cart />}></Route>
          </>
        )}
        {isAdmin === true && (
          <>{/* <Route path="/admin" element={<Cart />}></Route> */}</>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
