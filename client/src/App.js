import "./App.css";
// import Navbar from "./components/navbar/Navbar";
// import Products from "./components/products/Products";
import Router from "./Router";

import React from "react";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
