const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { User } = require("../models/userModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(404).send(error.message);

//   let user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send("Invalid email or password");

//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) return res.status(400).send("Invalid email or password");

//   const token = user.generateAuthToken();
//   res
//     .cookie("token", token, { httpOnly: true })
//     .send(_.pick(user, ["id", "name", "email"]));
// });

router.get("/isadmin", auth, admin, (req, res) => {
  res.send(true);
});

router.post("/product", auth, admin, (req, res) => {
  res.send("hello admin");
});

router.put("/product", auth, admin, (req, res) => {
  res.send("wanna update");
});

router.delete("/product", auth, admin, (req, res) => {
  res.send("wanna delete");
});

module.exports = router;
