const mongoose = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");

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

  isDeleted: Boolean,
});

const Products = mongoose.model("Products", productsSchema);

function validateProducts(user) {
  const schema = Joi.object({
    brand: Joi.string().required(),
    model: Joi.string(),
    price: Joi.Array(),
    category: Joi.string(),
    category_id: Joi.number(),
  });
  return schema.validate(user);
}

module.exports.Products = Products;
module.exports.validateProducts = validateProducts;
