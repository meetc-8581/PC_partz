import React from "react";
import "./ProductCard.css";

function ProductCard(props) {
  var image = `http://localhost:3000/images/no-thumbnail-medium`;
  // if (props.product.images[0] !== undefined) {
  //   image = `http://localhost:3000/images/${props.product.images[0]}`;
  // }
  return (
    <div className="row border-bottom border-1 mb-2 p-3">
      <div className="col-md-4 ">
        <div className="card-image">
          <img src={image} alt="hello" className="max-vw-5"></img>
        </div>
      </div>
      <div className="col-md-5">
        <div className="card border-0">
          <div className="card-body">
            <h5 className="card-title">
              {props.product.brand} - {props.product.model}
            </h5>
            <div className="card-text">
              <h6>{props.product.category}</h6>
            </div>
            <div className="card-text">
              <span
                className={props.product.inventory > 5 ? "" : "text-danger"}
              >
                {props.product.inventory > 5
                  ? "In Stock"
                  : `Only ${props.product.inventory} left in stock!`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3 card border-0">
        <div className="card-body">
          <div className="card-title fw-bolder">
            <h5>$ {props.product.price[0]}</h5>
          </div>
          <div className="card-text my-1">
            <a href="/products" className="btn btn-primary">
              Add to Cart
            </a>
          </div>
          <div className="card-text my-1">
            <a href="/products" className="btn btn-warning">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
