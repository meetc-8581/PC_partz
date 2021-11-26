import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState([]);

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

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

        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pages={pages}
          totalpages={totalPages}
        />
      </div>
    </div>
  );
}

export default Products;
