import React from "react";

function ProductCard(props) {
  return (
    <div className="card text-center col-sm-3 m-2">
      <img
        src="http://localhost:3000/images/619a9cd8c2b84485164a6c92_3"
        className="card-img-top img-thumbnail w-100"
        alt="hello"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.product.brand}</h5>
        <p className="card-text">{props.product.model}</p>
        <p className="card-text">{props.product.price}</p>
        <a href="/products" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
