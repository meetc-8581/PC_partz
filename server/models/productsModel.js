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
  inventory: {
    type: Number,
    required: true,
  },
  specs: {
    type: Object,
    required: false,
  },

  isDeleted: Boolean,
});

const Products = mongoose.model("Products", productsSchema);

function validateProducts(product) {
  console.log("entred");
  const schema = Joi.object().keys({
    _id: Joi.string(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    category_id: Joi.number().required(),
    inventory: Joi.number().required(),
    specs: Joi.object(),
  });
  console.log("validation of product");
  return schema.validate(product);
}

module.exports.Products = Products;
module.exports.validateProducts = validateProducts;
