import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  useEffect(() => {
    async function getProductList() {
      const productRes = await axios.get(
        `http://localhost:3000/products/search?page=${props.currentPage}&productsperpage=10&search=${props.query}`
      );
      setProducts(productRes.data.products);
      setTotalPages(productRes.data.totalpages);
    }

    getProductList();
  }, [props.currentPage, props.query]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="row container">
              {products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                  ></ProductCard>
                );
              })}

              <Pagination
                setCurrentPage={props.setCurrentPage}
                currentPage={props.currentPage}
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
