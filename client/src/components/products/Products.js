import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totlPages, setTotalPages] = useState([]);

  const pages = new Array(totlPages).fill(null).map((v, i) => i);

  useEffect(() => {
    async function getProductList() {
      // setLoading(true);
      const productRes = await axios.get(
        `http://localhost:3000/products/page?page=${currentPage}&productsperpage=6`
      );
      setProducts(productRes.data.products);
      setTotalPages(productRes.data.totalpages);
      // setLoading(false);
    }

    getProductList();
  }, [currentPage]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        {products.map((product) => {
          return (
            <ProductCard key={product._id} product={product}></ProductCard>
          );
        })}

        <div>
          <nav aria-label="...">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <span className="page-link">
                  <button
                    className="btn btn-link"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  >
                    Previous
                  </button>
                </span>
              </li>
              {pages.slice(0, 5).map((pageIndex) => (
                <li key={pageIndex} className="page-item">
                  <span className="page-link">
                    <button
                      className="btn btn-link"
                      onClick={() => setCurrentPage(pageIndex)}
                    >
                      {pageIndex + 1}
                    </button>
                  </span>
                </li>
              ))}
              <li className="page-item">
                <span className="page-link">
                  <button
                    className="btn btn-link"
                    onClick={() =>
                      setCurrentPage(Math.min(totlPages - 1, currentPage + 1))
                    }
                  >
                    Next
                  </button>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Products;
