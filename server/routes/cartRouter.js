var express = require("express");
const { Mongoose } = require("mongoose");
var router = express.Router();
const auth = require("../middleware/auth");
const { Cart } = require("../models/cartModel");
const { Products } = require("../models/productsModel");

router.get("/", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ userId: req.user._id });
    res.send(cart);
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

router.post("/checkout", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ userId: req.user._id });

    cart.products.map(async (prod, i) => {
      const product = await Products.findOne({ _id: prod.productId });

      product.inventory =
        product.inventory !== 0 ? product.inventory - prod.quantity : 0;
      console.log(product);
      await product.save();
    });
    cart.totalPrice = 0;
    cart.totalProducts = 0;
    cart.products = [];

    saved = await cart.save();

    res.json(saved);
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

router.post("/add/:productId", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      var cart = new Cart({
        userId: req.user._id,
        totalPrice: 0,
        totalProducts: 0,
        products: [],
      });
    }

    const product = await Products.findOne({ _id: req.params.productId });
    if (!product) return res.status(400).send("product does not exist");
    cart = addtocart(cart, req.params.productId);

    cart.totalPrice = cart.totalPrice + product.price;

    cart.totalProducts++;

    const saved = await cart.save();
    console.log(saved);

    res.send(saved);
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

router.post("/reduce/:productId", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ userId: req.user._id });

    const product = await Products.findOne({ _id: req.params.productId });

    cart = reducefromcart(cart, req.params.productId, product.price);

    const saved = await cart.save();
    console.log(saved);

    res.send(req.user);
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

router.post("/remove/:productId", auth, async (req, res) => {
  try {
    console.log("insde");
    var cart = await Cart.findOne({ userId: req.user._id });
    const product = await Products.findOne({ _id: req.params.productId });

    var index = -1;
    console.log(index);
    cart.products.map((prod, i) => {
      if (prod.productId === req.params.productId) {
        index = i;
      }
    });
    console.log("before", cart);

    if (index !== -1) {
      console.log(cart.products[index].quantity);
      cart.totalProducts = cart.totalProducts - cart.products[index].quantity;
      cart.totalPrice =
        cart.totalPrice - cart.products[index].quantity * product.price;
      cart.products.splice(index, 1);
    }

    console.log("after", cart.products);

    var saved = await cart.save();

    res.send(cart);
  } catch (err) {
    console.log(err);
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

  cart.products.push({ productId: String(id), quantity: 1 });
  return cart;
}

function reducefromcart(cart, id, price) {
  // console.log(cart.products.length);

  for (var i = 0; i < cart.products.length; i++) {
    console.log("for", cart.products[i].productId);
    if (cart.products[i].productId === id) {
      console.log("inside if");
      cart.products[i].quantity =
        cart.products[i].quantity <= 0 ? 0 : cart.products[i].quantity - 1;

      cart.totalPrice = cart.totalPrice <= 0 ? 0 : cart.totalPrice - price;

      cart.totalProducts = cart.totalProducts <= 0 ? 0 : cart.totalProducts - 1;
      return cart;
    }
  }

  // cart.products.pop({ productId: id, quantity: 1 });
  return cart;
}

module.exports = router;
