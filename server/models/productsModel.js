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
    type: Array,
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

productsSchema.index({ brand: "text" });

const Products = mongoose.model("Products", productsSchema);

Products.create(
  {
    brand: "ABKONCORE",
    model: "Cronos 350M",
    price: ["0.00", "USD"],
    category: "case",
    category_id: 1,
    inventory: 11,
    specs: {
      form_factor: "MicroATX Mini Tower",
      color: "Black",
      psu_wattage: null,
      side_panel: null,
      external_bays: 0,
      internal_bays: 1,
    },
  },
  function (err) {
    if (err) return console.log(err);
  }
);

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
