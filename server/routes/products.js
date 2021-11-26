var express = require("express");
var router = express.Router();
const { Products } = require("../models/productsModel");

// get all te products
router.get("/", async (req, res) => {
  try {
    const products = await Products.find({});

    res.json(products);
  } catch (err) {
    console.error("error", err);
    return res.status(500).send("Something went Wrong sorry!");
  }
});

//get with pagination
router.get("/page", async (req, res) => {
  const page = parseInt(req.query.page || "0");
  const producstPerPage = parseInt(req.query.productsperpage || "10");
  const total = await Products.countDocuments({});

  try {
    const products = await Products.find({})
      .limit(producstPerPage)
      .skip(producstPerPage * page);

    res.json({
      totalpages: Math.ceil(total / producstPerPage),
      products,
    });
  } catch (err) {
    console.error("error", err);
    return res.status(500).send("Something went Wrong sorry!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const products = await Products.find({ _id: req.params.id });
    res.json(products);
  } catch (err) {}
});

router.post("/", async (req, res) => {
  res.status(200).send();
});

module.exports = router;
