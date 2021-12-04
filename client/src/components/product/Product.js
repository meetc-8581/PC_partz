import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Products from "../products/Products";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      specs: {},
    };
  }
  async componentDidMount() {
    const productRes = await axios.get(
      "http://localhost:3000/products/61a3e55d767b6acc37bc5f75"
    );

    this.setState({
      product: productRes.data[0],
      specs: productRes.data[0].specs,
    });
  }

  render() {
    const inventory = (invt) => {
      if (invt === 0) {
        return `Out of Stock`;
      } else if (invt <= 5) {
        return `Only ${invt} left in Stock!`;
      } else {
        return "In Stock";
      }
    };

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
                <h2>{this.state.product.model}</h2>
              </div>
              <div>
                <h4>{this.state.product.brand}</h4>
              </div>

              <div className="container mt-2 p-0">
                <div className="row">
                  <h5>Specifications</h5>
                  {Object.keys(this.state.specs).map(function (key, value) {
                    return (
                      <div className="col-sm-6 p-3 ">
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
            <div class="card col-md-2">
              <div class="card-body">
                <h5 class="card-title">
                  <span className="w-100 fs-3">
                    $ {this.state.product.price}
                  </span>
                </h5>
                <span
                  className={
                    this.state.product.inventory > 5
                      ? "fw-bolder fs-5 card-text"
                      : "text-danger fs-5 fw-bolder card-text"
                  }
                >
                  {inventory(this.state.product.inventory)}
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
}

export default Product;
