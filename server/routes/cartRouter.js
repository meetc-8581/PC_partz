var express = require("express");
const { Mongoose } = require("mongoose");
var router = express.Router();
const auth = require("../middleware/auth");
const { Cart } = require("../models/cartModel");
const { Products } = require("../models/productsModel");

router.post("/add", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ user_id: req.user._id });

    // console.log()

    const product = await Products.findOne({ _id: req.body.productId });

    console.log("cart", cart);

    // cart = addtocart(cart, product._id);
    console.log(product._id);

    // cart.totalPrice = cart.totalPrice + product.price;

    console.log("cart after", cart);

    // const saved = await cart.save();
    // console.log(saved);

    res.send(req.user);
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

function addtocart(cart, id) {
  console.log(cart.products);

  // for (var i = 0; i <= cart.products.lenght; i++) {
  //   console.log("for", cart.products[i].productId);
  //   if ((cart.products[i].productId = id)) {
  //     cart.products[i].quantity++;
  //     return cart;
  //   }
  // }

  cart.products.push({ productId: id, quantity: 1 });
  return cart;
}

module.exports = router;
