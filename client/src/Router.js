import React, { useContext } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Products from "./components/products/Products";

import Navbar from "./components/navbar/Navbar";
import AuthContext from "./context/AuthContext";
import Cart from "./components/user/Cart";
import Product from "./components/product/Product";
import AdminCreate from "./components/admin/adminCreate";
import AdminUpdate from "./components/admin/adminUpdate";
import Checkout from "./components/user/Checkout";

function Router() {
  const { loggedIn, isAdmin } = useContext(AuthContext);

  return (
    <MemoryRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Products />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>

        {loggedIn === false && (
          <>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </>
        )}
        {isAdmin === true && (
          <>
            <Route path="/admin/update/:id" element={<AdminUpdate />}></Route>
            <Route path="/admin" element={<AdminCreate />}></Route>
          </>
        )}
      </Routes>
    </MemoryRouter>
  );
}

export default Router;
