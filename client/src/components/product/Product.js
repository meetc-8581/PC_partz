import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "../products/Products";
import { useParams } from "react-router";

function Product(props) {
  const [product, setProduct] = useState({});
  const [specs, setSpecs] = useState({});

  const params = useParams();

  useEffect(() => {
    async function getproducts() {
      const productRes = await axios.get(
        `http://localhost:3000/products/${params.id}`
      );

      const data = productRes.data[0];
      // newArr.push(productRes.data);
      // console.log(productRes.data);
      setProduct(data);
      setSpecs(data);
    }

    getproducts();
  }, [params.id]);

  const inventorytxt = (invt) => {
    if (invt === 0) {
      return `Out of Stock`;
    } else if (invt <= 5) {
      return `Only ${invt} left in Stock!`;
    } else {
      return "In Stock";
    }
  };

  var { brand, model, inventory } = product;

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="http://localhost:3000/images/no-thumbnail-medium"
              alt="hello"
              className="w-100 "
            ></img>
          </div>
          <div className="col-md-4">
            <div>
              <h2>{model}</h2>
            </div>
            <div>
              <h4>{brand}</h4>
            </div>

            <div className="container mt-2 p-0">
              <div className="row">
                <h5>Specifications</h5>
                {Object.keys(specs).map(function (key, value) {
                  return (
                    <div className="col-sm-6 p-3 " key={key}>
                      <p className="border-bottom fw-normal fs-6 text-wrap">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </p>
                      <p>{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card col-md-2">
            <div className="card-body">
              <h5 className="card-title">
                <span className="w-100 fs-3">$ {product.price}</span>
              </h5>
              <span
                className={
                  inventory > 5
                    ? "fw-bolder fs-5 card-text"
                    : "text-danger fs-5 fw-bolder card-text"
                }
              >
                {inventorytxt(inventory)}
              </span>
              <div className="card-text my-3 text-center">
                <Link to="/cart" className="btn btn-primary w-100">
                  Add to Cart
                </Link>
              </div>
              <div className="card-text my-1 text-center">
                <Link to="/checkout" className="btn btn-warning w-100">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
}

export default Product;
