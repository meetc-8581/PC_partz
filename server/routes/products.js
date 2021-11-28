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

// search with pagination
router.get("/search", async (req, res) => {
  // if query for search present then $text search other wise every thing...
  var query = req.query.search
    ? {
        $text: {
          $search: req.query.search,
        },
      }
    : { $regex: ".*" };

  console.log(query);

  const page = parseInt(req.query.page || "0"); // page number
  const producstPerPage = parseInt(req.query.productsperpage || "10"); // number of products per page
  const total = await Products.countDocuments(query); // total number of dcument returned

  try {
    const products = await Products.find(query)
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

// /trial search

router.get("/search/trial", async (req, res) => {
  // if query for search present then $text search other wise every thing...
  const page = parseInt(req.query.page || "0"); // page number
  const producstPerPage = parseInt(req.query.productsperpage || "10"); // number of products per page

  try {
    var total = [];
    var products = [];
    if (req.query.search) {
      var query = [
        { $match: { $text: { $search: req.query.search } } },
        // { $match: { price: { $gt: req.query.minprice } } },
        { $sort: { score: { $meta: "textScore" } } },

        { $limit: producstPerPage },
        { $skip: producstPerPage * page },
      ];
      // total number of dcument returned
      total = await Products.countDocuments({
        $text: { $search: req.query.search },
      });
      products = await Products.aggregate(query);
    } else {
      query = { regex: ".*" };
      total = await Products.countDocuments(query);
      products = await Products.find(query)
        .limit(producstPerPage)
        .skip(producstPerPage * page);
    }
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
//
router.get("/drop", async (req, res) => {
  try {
    // change find to deleteMany to remove 0.0 price products
    const prods = await Products.find({ price: 0.0 });
    console.log(prods);
    res.json(prods).send();
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
