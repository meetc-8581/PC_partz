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
  const minprice = parseFloat(req.query.minprice || "50");
  const maxprice = parseFloat(req.query.maxprice || "1000000000");
  const categoriesArr = req.query.category ? req.query.category.split(",") : "";

  console.log("categoriesArr", categoriesArr);
  const categoryQuery =
    req.query.category === "" ? { $regex: ".*" } : { $in: categoriesArr };
  console.log("categoryQuery", categoryQuery);

  try {
    var total = 0;
    var products = [];
    if (req.query.search) {
      console.log(req.query.search);
      var query = [
        { $match: { $text: { $search: req.query.search } } },
        { $match: { isDeleted: { $ne: true } } },
        { $match: { category: categoryQuery } },
        { $match: { price: { $gt: minprice } } },
        { $match: { price: { $lt: maxprice } } },
        { $sort: { score: { $meta: "textScore" } } },
      ];

      products = await Products.aggregate(query);
    } else {
      const query = [
        { $match: { brand: { $regex: ".*" } } },
        { $match: { isDeleted: { $ne: true } } },
        { $match: { category: categoryQuery } },
        { $match: { price: { $gt: minprice } } },
        { $match: { price: { $lt: maxprice } } },
      ];

      products = await Products.aggregate(query);
    }

    total = products.length;
    // total number of dcument returned
    products = products.slice(
      producstPerPage * page,
      producstPerPage * page + producstPerPage
    );

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
    console.log(req.body);
    res.status(200).send();
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
