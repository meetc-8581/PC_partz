import "./App.css";
// import Navbar from "./components/navbar/Navbar";
// import Products from "./components/products/Products";
import Router from "./Router";

import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import axios from "axios";

function App() {
  console.log(process.env.NODE_ENV);

  axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3000/api/";

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
