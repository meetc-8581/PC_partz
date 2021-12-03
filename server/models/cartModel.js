const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  totalProducts: {
    type: Number,
    required: true,
  },

  products: {
    type: [
      {
        productId: String,
        quantity: Number,
      },
    ],
  },
});

const Cart = mongoose.model("Cart", cartSchema);

function validateCart(user) {
  const schema = Joi.object({
    usedId: Joi.string().required(),
    totalPrice: Joi.string().required(),
    totalProducts: Joi.Array(),
    category: Joi.string(),
  });
  return schema.validate(user);
}

async function createCart(userId) {
  cart = new Cart({
    userId: userId,
    totalPrice: 0,
    totalProducts: 0,
  });

  await cart.save();
}

module.exports.Cart = Cart;
module.exports.validateCart = validateCart;
module.exports.createCart = createCart;
