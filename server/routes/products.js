var express = require("express");
var router = express.Router();
const { Products } = require("../models/productsModel");

// get all the products
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
  const total = await Products.countDocuments();

  try {
    const products = await Products.find()
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

router.get("/page/search", async (req, res) => {
  var brand = req.query.brand ? req.query.brand : ".*";
  var model = req.query.model ? req.query.model : ".*";

  const page = parseInt(req.query.page || "0");
  const producstPerPage = parseInt(req.query.productsperpage || "10");
  const total = await Products.countDocuments({
    $or: [
      { brand: { $regex: brand, $options: "$i" } },
      { model: { $regex: model, $options: "$i" } },
    ],
  });

  try {
    const products = await Products.find({
      $or: [
        { brand: { $regex: brand, $options: "$i" } },
        { model: { $regex: model, $options: "$i" } },
      ],
    })
      .limit(producstPerPage)
      .skip(producstPerPage * page);

    // const total = products.length;
    // console.log(products.length);
    res.json({
      totalpages: Math.ceil(total / producstPerPage),
      products,
    });
  } catch (err) {
    console.error("error", err);
    return res.status(500).send("Something went Wrong sorry!");
  }
});

// //get all the product categories
router.get("/category", async (req, res) => {
  try {
    const categories = await Products.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("error", err);
    return res.status(500).send("Something went Wrong sorry!");
  }
});

///get by id
router.get("/:id", async (req, res) => {
  try {
    const products = await Products.find({ _id: req.params.id });
    res.json(products);
  } catch (err) {
    console.error("error", err);
    return res.status(500).send("Something went Wrong sorry!");
  }
});

router.post("/", async (req, res) => {
  res.status(200).send();
});

module.exports = router;
