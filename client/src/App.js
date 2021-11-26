import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import React, { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  return (
    <div>
      <Navbar query={query} setQuery={setQuery}></Navbar>
      <Products
        query={query}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Products>
    </div>
  );
}

export default App;
