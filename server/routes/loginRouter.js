const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { User } = require("../models/userModel");
const auth = require("../middleware/auth");
require("dotenv").config();

router.get("/loggedin", async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(200).json(false);
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    res.send(true);
  } catch (err) {
    res.status(200).json(false);
    console.log(err);
  }
});

router.get("/logout", async (req, res) => {
  const token = "";
  res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(0),
    })
    .send("cookie Sent");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.message);

  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  // res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header(
  //   "Access-Control-Allow-Methods",
  //   "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  // );
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  // );
  res
    .cookie("token", token, { httpOnly: true })
    .send(_.pick(user, ["id", "name", "email"]));
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  try {
    schema.validate(req, schema);
    return;
  } catch (err) {
    return err;
  }
}

module.exports = router;
