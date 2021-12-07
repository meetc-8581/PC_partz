const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { validateProducts, Products } = require("../models/productsModel");

router.get("/isadmin", auth, admin, (req, res) => {
  res.send(true);
});

router.post("/product", auth, admin, async (req, res) => {
  console.log("request", req.body);

  // const { error } = validateProducts(req.body);
  // if (error) return res.status(404).send(error.message);

  // console.log(req.body);

  var product = new Products(req.body);

  var saved = await product.save();
  console.log(saved);

  res.send("done");
});

router.put("/product", auth, admin, async (req, res) => {
  console.log(req);

  // const { error } = validateProducts(req.body);
  // if (error) return res.status(404).send(error.message);

  try {
    var product = await Products.updateOne(
      { _id: req.body._id },
      {
        $set: {
          brand: req.body.brand,
          model: req.body.model,
          price: req.body.price,
          category: req.body.category,
          category_id: req.body.category_id,
          inventory: req.body.inventory,
          specs: req.body.specs,
        },
      }
    );
    if (!product) return res.status(400).send("product does not exist");

    console.log(product);
    res.send("Updated");
  } catch (err) {
    console.log(err);
    res.status(400).send("Product id not specified correctly");
  }
});

router.delete("/product/:id", auth, admin, async (req, res) => {
  console.log(req.params);

  try {
    var product = await Products.findOne({ _id: req.params.id });
    if (!product) return res.status(400).send("product does not exist");

    product.isDeleted = true;

    product = await product.save();
    console.log(product);
    res.send("deleted");
  } catch (err) {
    console.log(err);
    res.status(400).send("Product id not specified correctly");
  }

  console.log(product);
  // res.send("Deleted");
});

module.exports = router;
