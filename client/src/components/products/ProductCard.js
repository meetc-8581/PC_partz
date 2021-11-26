import React from "react";

function ProductCard(props) {
  var image = `http://localhost:3000/images/61a0369d0595d155a81c9499_1`;
  // if (props.product.images[0] !== undefined) {
  //   image = `http://localhost:3000/images/${props.product.images[0]}`;
  // }
  return (
    <div className="card col-md-5 my-1">
      <img src={image} className="card-img-top img-thumbnail" alt="hello"></img>
      <div className="card-body">
        <h5 className="card-title">{props.product.brand}</h5>
        <span className="card-text">
          {props.product.model}
          {props.product.category}

          <div>
            Price:
            {props.product.price[0]}
            {props.product.price[1]}
          </div>
          <div> In Stock : {props.product.inventory}</div>
        </span>
        <div className="my-2">
          <a href="/products" className="btn btn-primary mx-2">
            Add to cart
          </a>
          <a href="/products" className="btn btn-warning mx-2">
            Buy
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
