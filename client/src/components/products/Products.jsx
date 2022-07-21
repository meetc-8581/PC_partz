import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import "./Products.css";

function Products() {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [searchCategory, setSearchCategory] = useState([]);
  const [price, setPrice] = useState([0, 1000000000]);
  const [query, setQuery] = useState("");

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  useEffect(() => {
    async function getProductList() {
      setLoading(true);
      const url = `/products/search/trial?page=${currentPage}&productsperpage10=&search=${query}&minprice=${price[0]}&maxprice=${price[1]}&category=${searchCategory}`;

      const productRes = await axios.get(url);
      setProducts(productRes.data.products);
      setTotalPages(productRes.data.totalpages);
      setLoading(false);
    }

    getProductList();
  }, [currentPage, query, price, searchCategory]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar
            query={query}
            setQuery={setQuery}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            price={price}
            setPrice={setPrice}
          />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="row">
              {loading && (
                <div className="d-flex justify-content-center m-5">
                  <div
                    className="spinner-border text-warning loading"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              {!loading &&
                products.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}

              <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pages={pages}
                totalpages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
