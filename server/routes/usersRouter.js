const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validateUser } = require("../models/userModel");
const auth = require("../middleware/auth");
const { createCart } = require("../models/cartModel");

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(404).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password", "address"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  await createCart(user.id);

  const token = user.generateAuthToken();
  res
    .cookie("token", token, { httpOnly: true })
    .send(_.pick(user, ["id", "name", "email"]));
});

router.get("/", function (req, res, next) {
  res.send();
});

module.exports = router;
