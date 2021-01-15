const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  //isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      //Payload will show the info what we send from here (in this case: _id, name, email ). MY error: I
      //didn't attach _id property here, so could not get this property in the payload.
      _id: this._id,
      name: this.name,
      email: this.email,
      // isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  let schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string()
      .min(5)
      .max(255)
      //.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
