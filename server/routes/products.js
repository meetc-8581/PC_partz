var express = require("express");
var router = express.Router();
const { Products } = require("../models/productsModel");

router.get("/", async (req, res) => {
  try {
    const products = await Products.find({});

    res.json(products);
  } catch (err) {
    console.error("error", err);
    return res.status(404).send("Something went Wrong sorry!");
  }
});

router.post("/", async (req, res) => {
  res.status(200).send();
});

module.exports = router;
