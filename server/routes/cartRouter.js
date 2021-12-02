var express = require("express");
const { Mongoose } = require("mongoose");
var router = express.Router();
const auth = require("../middleware/auth");
const { Cart } = require("../models/cartModel");
const { Products } = require("../models/productsModel");

router.post("/add", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ userId: req.user._id });

    const product = await Products.findOne({ _id: req.body.productId });

    cart = addtocart(cart, req.body.productId);

    cart.totalPrice = cart.totalPrice + product.price;

    cart.totalProducts++;

    const saved = await cart.save();
    console.log(saved);

    res.send(req.user);
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ userId: req.user._id });

    const product = await Products.findOne({ _id: req.body.productId });

    cart = removefromcart(cart, req.body.productId);

    cart.totalPrice = cart.totalPrice - product.price;

    cart.totalProducts--;

    const saved = await cart.save();
    console.log(saved);

    res.send(req.user);
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

function addtocart(cart, id) {
  console.log(cart.products.length);

  for (var i = 0; i < cart.products.length; i++) {
    console.log("for", cart.products[i].productId);
    if (cart.products[i].productId === id) {
      console.log("inside if");
      cart.products[i].quantity++;
      return cart;
    }
  }

  cart.products.push({ productId: id, quantity: 1 });
  return cart;
}

function removefromcart(cart, id) {
  console.log(cart.products.length);

  for (var i = 0; i < cart.products.length; i++) {
    console.log("for", cart.products[i].productId);
    if (cart.products[i].productId === id) {
      console.log("inside if");
      cart.products[i].quantity++;
      return cart;
    }
  }

  cart.products.push({ productId: id, quantity: 1 });
  return cart;
}

module.exports = router;
