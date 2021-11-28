const mongoose = require("mongoose");
const Joi = require("joi");

const productsSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  category_id: {
    type: Number,
    required: true,
  },
  specs: {
    type: Object,
    required: true,
  },
});

const Products = mongoose.model("Products", productsSchema);

function validateProducts(user) {
  const schema = {
    brand: Joi.string().required(),
    model: Joi.string(),
    prince: Joi.Array(),
    category: Joi.string(),
  };
  return Joi.validate(user, schema);
}

module.exports.Products = Products;
module.exports.validateProducts = validateProducts;
