const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const { User } = require("../models/User");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Invalid Email or Password...!!!");

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password....");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid Email or Password....");

  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    //Validating login
    //name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema); ///??? why req??
}

module.exports = router;
